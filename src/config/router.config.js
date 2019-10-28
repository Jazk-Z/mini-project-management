import miniProgram from "@/assets/mini-program.svg";
const routers = [
  {
    title: "小程序",
    icon: miniProgram,
    childern: [
      {
        name: "图片管理",
        path: "/mini-program/upload"
      },
      {
        name: "标签管理",
        path: "/mini-program/tags"
      }
    ]
  }
];
export default routers;
