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
};

export async function PATCH(
  req: Request,
  { params }: { params: TPatchParams }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId
      }
    });

    if (!course) {
      return new NextResponse("Course not found!", { status: 404 });
    }

    const unpublishedCourse = await db.course.update({
      where: {
        id: courseId,
        userId
      },
      data: {
        isPublished: false
      }
    });

    return NextResponse.json(unpublishedCourse);
  } catch (error) {
    console.log("[COURSE UN PUBLISH] something went wrong", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
