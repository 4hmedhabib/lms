export const formatPrice = (price: number, currency: string = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(price);
