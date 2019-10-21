import { post, get } from "@/config/network-tools";
import { networWrapper } from "@/config/tools";
const createTag = async params => {
  const [result, error] = await networWrapper(() => post("/tag", params));
  if (!error) return result;
};
const getAllTags = async () => {
  const [result, error] = await networWrapper(() => get("/tag"));
  if (!error) return result;
};
export { createTag, getAllTags };
