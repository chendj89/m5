import router from "../router";
import { capFirst } from "@/utils";

/**
 * 加载虚拟组件
 * @param to 
 * @returns 
 */
export default async function loadVirtual(to: any) {
  return new Promise((resolve) => {
    const routerName = to.routerName;
    router.addRoute("Dashboard", {
      path: `${capFirst(routerName, false)}`,
      name: `${capFirst(routerName)}`,
      meta: {
        title: `动态路由`,
        iconPrefix: "custom",
        icon: "menu",
        cacheable: true,
      },
      component: () =>
        import("@/virtual/index.vue").then((res) => {
          res.default.name = capFirst(routerName);
          return res;
        }),
    });
    resolve(true);
  });
}
