import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type Props = {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
};

const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished
}: Props) => {
  return (
    <div className="flex items-center gap-x-2">
      <Button disabled={disabled} variant="outline" size="sm">
        {isPublished ? "Un Publish" : "Publish"}
      </Button>
      <Button size="sm">
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChapterActions;
