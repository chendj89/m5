import { LAYOUT } from "@/store/keys";

export const asyncRoutes = [
  {
    path: "/index",
    component: LAYOUT,
    name: "Dashboard",
    meta: {
      title: "控制台",
      iconPrefix: "icon",
      icon: "dashboard",
    },
    redirect: "/index/index",
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/index/index.vue"),
        meta: {
          title: "首页",
          affix: true,
          cacheable: true,
          iconPrefix: "icon",
          icon: "menu",
        },
      },
      {
        path: "repo",
        name: "Repo",
        component: () => import("@/views/index/repo.vue"),
        meta: {
          title: "仓库",
          affix: true,
          cacheable: true,
          iconPrefix: "icon",
          icon: "menu",
        },
      },
    ],
  },
];
