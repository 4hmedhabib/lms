import { db } from "@/lib/db";
import { redirect } from "next/navigation";

type Props = {
  params: {
    courseId: string;
  };
};

const CourseDetail = async ({ params: { courseId } }: Props) => {
  const course = await db.course.findUnique({
    where: {
      id: courseId
    },
    include: {
      chapters: {
        where: {
          isPublished: true
        },
        select: {
          id: true
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  });

  if (!course) return redirect("/");

  return redirect(`/courses/${courseId}/chapters/${course.chapters[0]?.id}`);
};

export default CourseDetail;
