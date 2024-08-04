"use client";

import { BarChart, Compass, Layout, List, LucideIcon } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

type Props = {};

export type TRoute = {
  icon: LucideIcon;
  label: string;
  href: string;
};

const guestRoutes: TRoute[] = [
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

const teacherRoutes: TRoute[] = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses"
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics"
  }
];

const SideBarRoutes = (props: Props) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes: TRoute[] = isTeacherPage ? teacherRoutes : guestRoutes;

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
