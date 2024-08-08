import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

type Props = {
  courseId: string;
  price: number;
};

const CourseEnrollButton = ({ price }: Props) => {
  return (
    <Button className="w-full md:w-auto">
      Enroll fro {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
