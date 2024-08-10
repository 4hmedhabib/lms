import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getIsTeacher } from "@/actions/get-is-teacher";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!
});

export type TPatchParams = {
  courseId: string;
};

export type TDeleteParams = {
  courseId: string;
};

export async function PATCH(
  req: Request,
  { params }: { params: TPatchParams }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();

    const isTeacher = await getIsTeacher(userId);

    if (!userId || !isTeacher) {
      return new NextResponse("Unauthorized, please login again.", {
        status: 401
      });
    }

    const course = await db.course.update({
      where: { id: courseId, userId },
      data: {
        ...values
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[Course Update] something went wrong", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: TPatchParams }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    const isTeacher = await getIsTeacher(userId);

    if (!userId || !isTeacher) {
      return new NextResponse("Unauthorized, please login again.", {
        status: 401
      });
    }
    const course = await db.course.findUnique({
      where: { id: courseId, userId },
      include: {
        chapters: {
          include: {
            muxData: true
          }
        }
      }
    });

    if (!course) return new NextResponse("Course not found!", { status: 404 });

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await video.assets.delete(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: courseId
      }
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE DELETE] something went wrong", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
