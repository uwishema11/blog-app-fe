/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Contact,
 
  LayoutDashboard,
  Flame,
  LayoutList,
} from "lucide-react";
export const LeftSideMenuData = [
  {
    name: "Dashboard",
    link: "/",
    icons: <LayoutDashboard size={16} />,
    type: ["admin", "manager", "member"],
  },
  {
    name: "Users",
    link: "/dashboard/users",
    icons: <Contact size={16} />,
    type: ["admin", "manager"],
  },
  {
    name: "comments",
    link: "/dashboard/comments",
    icons: <Flame size={16} />,
    type: ["admin", "manager"],
  },
  {
    name: "blogs",
    link: "/dashboard/blogs",
    icons: <LayoutList size={16} />,
    type: ["admin", "manager"],
  },
];
