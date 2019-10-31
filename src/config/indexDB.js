import { env } from "../utils";
class IndexDB {
  constructor(name, version, stores) {
    this.name = name;
    this.version = version;
    this.stores = stores;
    this.db = indexedDB.open(name, version);
    this.init(this.db);
  }
  init(db) {
    db.onsuccess = () => {
      env && console.log("连接数据库成功");
    };
    db.onerror = () => {
      env && console.warn("数据库连接失败");
    };
    // 创建表和索引
    db.onupgradeneeded = e => {
      const db = e.target.result;
      const existStoreNames = Array.from(db.objectStoreNames);
      let objectStore = null;
      // 判读数据库的表是否存在
      if (existStoreNames.indexOf(this.stores.name) > -1) {
        env && console.log("已存在数据库的表的名字");
        objectStore = e.target.transaction.objectStore(this.stores.name);
      } else {
        let keyPath = this.stores.isKeyValue ? "key" : this.stores.keyPath;
        let autoIncrement = this.stores.isKeyValue
          ? false
          : this.stores.autoIncrement;
        objectStore = db.createObjectStore(this.stores.name, {
          keyPath,
          autoIncrement
        });
      }
      const indexNames = objectStore.indexNames;
      if (indexNames && indexNames.length) {
        Array.from(indexNames).forEach(item => objectStore.deleteIndex(item));
      }
      if (this.stores.indexes && this.stores.indexes.length) {
        this.stores.indexes.forEach(item => {
          objectStore.createIndex(item.name, item.keyPath || item.name, {
            unique: item.unique,
            multiEntry: Array.isArray(item.keyPath)
          });
        });
      }
    };
  }
  dbs() {
    return new Promise((resolve, reject) => {
      let request = indexedDB.open(this.name, this.version);
      request.onerror = e => {
        reject(e);
      };
      request.onsuccess = e => {
        resolve(e.target.result);
      };
    });
  }
}
class DBOperation extends IndexDB {
  constructor(name, version, stores) {
    super(name, version, stores);
    this.tableName = stores.name;
  }
  transaction(writable) {
    let mode = writable ? "readwrite" : "readonly";
    return this.dbs().then(db => {
      return db.transaction([this.tableName], mode);
    });
  }
  some(count = 10, offset = 0) {
    return new Promise((resolve, reject) => {
      let results = [];
      let i = 0;
      if (offset === 0) offset += offset;
      let end = offset + count - 1;
      let start = offset === 1 ? offset - 1 : offset;
      let direction;

      if (offset < 0) {
        direction = "prev";
        count = Math.max(count, -offset);
        start = -offset - 1;
        end = count + (offset === -1 ? 0 : -(offset + 1));
      }

      const success = results => {
        if (offset < 0) {
          results.reverse();
        }
        resolve(results);
      };

      this.cursor({
        direction,
        onTouch: (cursor, tx) => {
          if (cursor) {
            if (i < start) {
              cursor.continue();
            } else if (i < end) {
              results.push(cursor.value);
              cursor.continue();
            } else {
              success(results);
              tx.abort();
            }
            i++;
          } else {
            success(results);
          }
        },
        onError: e => {
          reject(e);
        }
      });
    });
  }
  cursor({ index, range, direction, onTouch, onError, writable }) {
    return this.transaction(writable).then(tx => {
      let objectStore = tx.objectStore(this.tableName);
      let owner = index ? objectStore.index(index) : objectStore;
      let request = owner.openCursor(range, direction);

      request.onsuccess = e => {
        let result = e.target.result;
        onTouch(result, tx, owner);
      };
      request.onerror = e => {
        onError(e);
      };
    });
  }
  add(obj) {
    return this.request(objectStore => objectStore.add(obj), "readwrite");
  }
  request(prepare, writable = false) {
    let name = this.tableName;
    return this.transaction(writable).then(tx => {
      return new Promise((resolve, reject) => {
        let objectStore = tx.objectStore(name);
        let request = prepare(objectStore);
        request.onsuccess = e => {
          let result = e.target.result;
          resolve(result);
        };
        request.onerror = e => {
          reject(e);
        };
      });
    });
  }
  delete(key) {
    return this.request(objectStore => objectStore.delete(key), "readwrite");
  }
}

export default DBOperation;
