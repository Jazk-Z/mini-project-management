const domain = {
  production: {
    manageUrl: "https://manage-api.onion-academy.com"
  },
  test: {
    manageUrl: "http://10.8.201.212:3021" // 周峰测试地址
  },
  development: {
    manageUrl: "http://10.8.8.198:3042" // 运行后台测试地址
  },
  preprod: {
    manageUrl: "https://manage-api-test.onion-academy.com"
  }
};

const env = process.env.NODE_ENV;
export default domain[env];
