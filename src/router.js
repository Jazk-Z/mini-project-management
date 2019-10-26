import Vue from "vue";
import Router from "vue-router";
import Tags from "@/views/Tags/Tags";
Vue.use(Router);
console.log(process.env.VUE_APP_BASE_URL);
export default new Router({
  mode: "history",
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login/Login.vue")
    },
    {
      path: "/tags",
      name: "tags",
      component: Tags,
      children: [
        {
          path: "create",
          name: "create-tags",
          component: () =>
            import(
              /* webpackChunkName: "create-tags" */ "./views/Tags/CreateTags.vue"
            )
        }
      ]
    },
    {
      path: "/upload",
      name: "upload",
      component: () =>
        import(/* webpackChunkName: "upload" */ "./views/upload/Upload.vue")
    }
  ]
});
