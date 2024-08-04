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
    const { url } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const courseOwner = await db.course.findUnique({
      where: { id: courseId, userId }
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url?.split("/")?.pop(),
        courseId: params.courseId
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[Course Attachments] something went wrong", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
