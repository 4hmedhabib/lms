import { getIsTeacher } from "@/actions/get-is-teacher";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export type TPostParams = {
  courseId: string;
};

export async function PUT(req: Request, { params }: { params: TPostParams }) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const { list } = await req.json();

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

    for (let item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position }
      });
    }

    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log("[CHAPTER REORDER] something went wrong", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
