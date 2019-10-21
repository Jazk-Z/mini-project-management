import { post } from "@/config/network-tools";
import { networWrapper } from "@/config/tools";
const createPictureInfo = async params => {
  const [result, error] = await networWrapper(() => post("/upload", params));
  if (!error) return result;
};
export { createPictureInfo };
