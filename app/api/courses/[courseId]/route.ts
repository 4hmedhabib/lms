import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

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
    const values = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

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
