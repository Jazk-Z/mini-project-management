import appWorker from "./worker";
class ComputerWorker {
  constructor(worker, fn) {
    if (window.Worker) {
      const code = worker.toString();
      const blob = new Blob(["(" + code + ")()"]);
      this.worker = new Worker(URL.createObjectURL(blob));
      this.worker.onerror = e => {
        console.error(`web worker occur error:`, e);
      };
      this.worker.addEventListener("message", fn);
    } else {
      window.alert("请升级浏览器chrome>=47");
    }
  }
  computeData(data) {
    this.worker.postMessage(data);
  }
}
const test = new ComputerWorker(appWorker, data => console.log(data));
test.computeData({
  value: 1
});
export default test;
