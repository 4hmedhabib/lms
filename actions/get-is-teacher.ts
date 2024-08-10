import { db } from "@/lib/db";

export const getIsTeacher = async (
  userId?: string | null
): Promise<boolean> => {
  try {
    if (!userId) return false;

    const teacherCourses = await db.course.findMany({
      where: {
        userId
      }
    });

    return teacherCourses.length > 0;
  } catch (error) {
    console.log("GET IS TEACHER ERROR: ", error);
    return false;
  }
};
