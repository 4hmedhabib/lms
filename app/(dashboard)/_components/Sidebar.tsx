import Logo from "./Logo";
import SideBarRoutes from "./SideBarRoutes";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SideBarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
