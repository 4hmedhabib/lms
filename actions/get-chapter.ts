import { db } from "@/lib/db";
import {
  Attachment,
  Chapter,
  MuxData,
  Purchase,
  UserProgress
} from "@prisma/client";

type GetChapter = {
  chapter: Chapter | null;
  course: { price: number | null } | null;
  muxData: MuxData | null;
  attachments: Attachment[];
  nextChapter: Chapter | null;
  userProgress: UserProgress | null;
  purchase: Purchase | null;
};

type GetChapterProps = {
  userId: string;
  courseId: string;
  chapterId: string;
};

export const getChapter = async ({
  userId,
  courseId,
  chapterId
}: GetChapterProps): Promise<GetChapter> => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        courseId_userId: {
          courseId,
          userId
        }
      }
    });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId
      },
      select: {
        price: true
      }
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true
      }
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId
        }
      });
    }

    if (chapter.isFree || purchase) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId
        }
      });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter?.position
          }
        },
        orderBy: {
          position: "asc"
        }
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId
        }
      }
    });

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase
    };
  } catch (error) {
    console.error("[GET CHAPTER] error | ", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null
    };
  }
};
