import slug from "slugify";

export const slugify = (value: string): string =>
  slug(value, { replacement: "_", lower: true });
