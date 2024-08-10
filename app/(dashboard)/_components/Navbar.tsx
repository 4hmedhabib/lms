import { getIsTeacher } from "@/actions/get-is-teacher";
import MobileSidebar from "./MobileSidebar";
import NavbarRoutes from "@/components/navbar-routes";
import { auth } from "@clerk/nextjs";

type Props = {};

const Navbar = async (props: Props) => {
  const { userId } = auth();
  const isTeacher = await getIsTeacher(userId);

  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes isTeacher={isTeacher} />
    </div>
  );
};

export default Navbar;
