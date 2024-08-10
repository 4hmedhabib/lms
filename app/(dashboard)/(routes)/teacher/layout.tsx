import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const TeacherLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default TeacherLayout;
