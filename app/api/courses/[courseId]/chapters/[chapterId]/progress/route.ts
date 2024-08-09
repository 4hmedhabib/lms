import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export type TPutParams = {
  courseId: string;
  chapterId: string;
};

export async function PUT(req: Request, { params }: { params: TPutParams }) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;
    const { isCompleted } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId
        }
      },
      update: {
        isCompleted
      },
      create: {
        userId,
        chapterId,
        isCompleted
      }
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[CHAPTER PROGRESS] something went wrong", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
