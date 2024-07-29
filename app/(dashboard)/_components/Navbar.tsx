import MobileSidebar from "./MobileSidebar";
import NavbarRoutes from "./NavbarRoutes";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
