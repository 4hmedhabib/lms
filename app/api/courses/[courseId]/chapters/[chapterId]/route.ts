import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getIsTeacher } from "@/actions/get-is-teacher";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!
});

export type TPostParams = {
  courseId: string;
  chapterId: string;
};

export type TDeleteParams = {
  courseId: string;
  chapterId: string;
};

export async function DELETE(
  req: Request,
  { params }: { params: TPostParams }
) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;

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

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId
      }
    });

    if (!chapter) {
      return new NextResponse("Not found", { status: 404 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId
        }
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id
          }
        });
      }
    }

    const deletedChapter = await db.chapter.delete({
      where: {
        id: chapterId,
        courseId
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

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[DELETE CHAPTER] something went wrong", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: TPostParams }) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;
    const { isPublished, ...values } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const courseOwner = await db.course.findUnique({
      where: { id: courseId, userId }
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId
      },
      data: values
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId
        }
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id
          }
        });
      }

      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false
      });

      await db.muxData.create({
        data: {
          chapterId: params.chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id
        }
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[PATCH CHAPTER] something went wrong", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
