import Clipboard from "clipboard";
import { Message } from "element-ui";
function clipboardSuccess() {
  Message({
    message: "Copy successfully",
    type: "success",
    duration: 1500
  });
}

function clipboardError() {
  Message({
    message: "Copy failed",
    type: "error"
  });
}

export default (text, event) => {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  });
  clipboard.on("success", () => {
    clipboardSuccess();
    clipboard.off("error");
    clipboard.off("success");
    clipboard.destroy();
  });
  clipboard.on("error", () => {
    clipboardError();
    clipboard.off("error");
    clipboard.off("success");
    clipboard.destroy();
  });
  clipboard.onClick(event);
};
