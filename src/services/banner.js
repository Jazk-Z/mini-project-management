import { post, get } from "@/config/network-tools";
import { networWrapper } from "@/config/tools";
const createBanner = async params => {
  const [result, error] = await networWrapper(() => post("/banner", params));
  if (!error) return result;
};
const getAllBanners = async () => {
  const [result, error] = await networWrapper(() => get("/banner"));
  if (!error) return result;
};
export { createBanner, getAllBanners };
