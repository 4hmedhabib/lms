"use client";

import { Compass, Layout } from "lucide-react";
import SidebarItem from "./SidebarItem";

type Props = {};

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/"
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search"
  }
];

const SideBarRoutes = (props: Props) => {
  const routes = guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route, index) => (
        <SidebarItem
          key={index}
          label={route.label}
          icon={route.icon}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SideBarRoutes;
