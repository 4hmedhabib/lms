import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export type TPostParams = {
  courseId: string;
};

export async function POST(req: Request, { params }: { params: TPostParams }) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error: any) {
      return new NextResponse(`WEBHOOK ERROR: ${error?.message}`, {
        status: 400
      });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId;

    if (event.type === "checkout.session.completed") {
      if (!userId || !courseId) {
        return new NextResponse(`WEBHOOK ERROR: Missing metadata`, {
          status: 400
        });
      }

      await db.purchase.create({
        data: {
          courseId,
          userId
        }
      });
    } else {
      return new NextResponse(
        `WEBHOOK ERROR: Unhandled event type ${event.type}`,
        { status: 200 }
      );
    }

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.log("[COURSE CHECKOUT] something went wrong", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
