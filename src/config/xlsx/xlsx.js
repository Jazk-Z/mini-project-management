import { env } from "@/utils";

class XLSXFile {
  constructor(data, fileName) {
    this.data = data;
    this.XLSX = window.XLSX;
    console.log(`-----------------------`);
    console.log(window.XLSX);
    if (!this.XLSX) {
      // eslint-disable-next-line no-unused-expressions
      env && throw new Error("获取不到XLSX CDN");
    }
    if (!fileName) {
      // eslint-disable-next-line no-unused-expressions
      env && throw new Error("文件名字没有传");
    }
    this.fileName = fileName;
    // eslint-disable-next-line camelcase
    this.cleanWorkbook = this?.XLSX?.utils?.book_new();
    // eslint-disable-next-line camelcase
    this.ws = this?.XLSX?.utils?.aoa_to_sheet(this.data);
    // eslint-disable-next-line camelcase
    this.k = this.XLSX?.utils?.book_append_sheet(
      this.cleanWorkbook,
      this.ws,
      this.fileName
    );
  }
  stringToArrayBuffer = string => {
    const buffer = new ArrayBuffer(string.length);
    const view = new Uint8Array(buffer);
    let i = 0;
    while (i !== string.length) {
      view[i] = string.charCodeAt(i) & 0xff;
      i++;
    }
    return buffer;
  };

  download() {
    const ab = this.stringToArrayBuffer(
      this.XLSX.write(this.cleanWorkbook, {
        bookType: "xlsx",
        type: "binary"
      })
    );
    const tmpDown = new Blob([ab], { type: "" });
    const a = document.createElement("a");
    // 利用URL.createObjectURL()方法为a元素生成blob URL
    a.href = URL.createObjectURL(tmpDown); // 创建对象超链接
    a.download = `${this.fileName}.xlsx`;
    a.click();
  }
}
// const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']]
// const text = new XLSXFile(data, 'a')
// text.download()
export default XLSXFile;
