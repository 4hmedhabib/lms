import { slugify } from "@/app/utils";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
    const courseSlug = slugify(title);

    if (!userId) {
      return new NextResponse("Unauthorized, please login again.", {
        status: 401
      });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
        slug: courseSlug
      },
      select: {
        id: true,
        title: true,
        slug: true
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
