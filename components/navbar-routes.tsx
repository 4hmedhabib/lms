"use client";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import SearchInput from "./search-input";

type Props = {
  isTeacher?: boolean;
};

const NavbarRoutes = ({ isTeacher = false }: Props) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCourses = pathname?.startsWith("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCourses ? (
          <Link href="/">
            <Button
              size="sm"
              variant="ghost"
              className="hover:bg-yellow-500 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher Mode
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </>
  );
};

export default NavbarRoutes;
