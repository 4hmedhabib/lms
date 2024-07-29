import { UserButton } from "@clerk/nextjs";

type Props = {};

const NavbarRoutes = (props: Props) => {
  return (
    <div className="flex gap-x-2 ml-auto">
      <UserButton />
    </div>
  );
};

export default NavbarRoutes;
