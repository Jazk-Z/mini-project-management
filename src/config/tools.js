const networWrapper = async fn => {
  let result, error;
  try {
    result = await fn();
  } catch (e) {
    console.log("接口访问失败", e);
  }
  return [result, error];
};
export { networWrapper };
