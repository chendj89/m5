export default [
  {
    menuUrl: "/index",
    menuName: "Dashborad",
    routeName: "dashborad",
    icon: "icon-dashboard",
    parentPath: "",
    children: [
      {
        parentPath: "/index",
        menuUrl: "/index/index",
        menuName: "首页",
        routeName: "Index",
      },
      {
        parentPath: "/index",
        menuUrl: "/index/repo",
        menuName: "仓库",
        routeName: "Repo",
      },
    ],
  },
];
