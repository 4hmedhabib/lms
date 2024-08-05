import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!
});

export type TPatchParams = {
  courseId: string;
  chapterId: string;
};

export async function PATCH(
  req: Request,
  { params }: { params: TPatchParams }
) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const courseOwner = await db.course.findUnique({
      where: { id: courseId, userId }
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const unpublishedChapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId
      },
      data: {
        isPublished: false
      }
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true
      }
    });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: courseId
        },
        data: {
          isPublished: false
        }
      });
    }

    return NextResponse.json(unpublishedChapter);
  } catch (error) {
    console.log("[CHAPTER UN PUBLISH] something went wrong", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
