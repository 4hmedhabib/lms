import { getIsTeacher } from "@/actions/get-is-teacher";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export type TPostParams = {
  courseId: string;
};

export async function POST(req: Request, { params }: { params: TPostParams }) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const { title } = await req.json();

    const isTeacher = await getIsTeacher(userId);

    if (!userId || !isTeacher) {
      return new NextResponse("Unauthorized, please login again.", {
        status: 401
      });
    }

    const courseOwner = await db.course.findUnique({
      where: { id: courseId, userId }
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId
      },
      orderBy: {
        position: "desc"
      }
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await db.chapter.create({
      data: {
        title,
        courseId,
        position: newPosition
      }
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[CHAPTERS] something went wrong", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
