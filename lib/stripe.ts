import Stripe from "stripe";
console.log(process.env.STRIPE_API_KEY);
export const stripe = new Stripe(process.env.STRIPE_API_SECRET!, {
  apiVersion: "2024-06-20",
  typescript: true
});
