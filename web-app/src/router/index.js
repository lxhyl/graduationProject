import Router from "vue-router";
import Vue from "vue";

import Login from "../views/account/login";
import HomePage from "../views/homePage/index";
import store from "../store/index";

// hack router push callback
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("../views/homePage/dashboard/index")
      },
      {
        path: "/createTask",
        name: "CreateTask",
        component: () => import("../views/createTask/index")
      },
      {
        path: "/todo",
        name: "TodoTask",
        component: () => import("../views/task/todo/index")
      },
      {
        path: "/todo/detail",
        name: "TodoTaskDetail",
        component: () => import("../views/task/todo/todoDetail")
      },
      {
        path: "/ing",
        name: "IngTask",
        component: () => import("../views/task/ing/index")
      },
      {
        path: "/ing/detail",
        name: "IngTaskDetail",
        component: () => import("../views/task/ing/ingDetail")
      },

      {
        path: "/finished",
        name: "FinishedTask",
        component: () => import("../views/task/finished/index")
      },
      {
        path: "/finished/detail",
        name: "FinishedTaskDetail",
        component: () => import("../views/task/finished/finishedDetail")
      },
      {
        path: "/all",
        name: "AllTask",
        component: () => import("../views/task/all/index")
      },
      {
        path: "/all/detail",
        name: "AllTaskDetail",
        component: () => import("../views/task/all/allDetail")
      },
      {
        path: "/taskDetail",
        name: "TaskDetail",
        component: () => import("../views/task/detail/index")
      },
      {
        path: "accountSystem",
        name: "AccountSystem",
        component: () => import("../views/userManagement/index")
      },
      {
        path: "/log",
        name: "Log",
        component: () => import("../views/log/index.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new Router({
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    };
  }
});

router.beforeEach(async (to, from, next) => {
  const isSuccess = await store.dispatch("app/getMenus");

  if (!isSuccess && to.path !== "/login") {
    const href = location.href;
    localStorage.setItem("S_URL", href);
    next({
      path: "/login"
    });
  }
  next();
});

export default router;
