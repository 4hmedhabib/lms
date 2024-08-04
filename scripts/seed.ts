const { PrismaClient } = require("@prisma/client");
const slugify = require("slugify");

const db = new PrismaClient();

const categories = [
  {
    name: "Computer Science"
  },
  {
    name: "Music"
  },
  {
    name: "Fitness"
  },
  {
    name: "Photography"
  },
  {
    name: "Accounting"
  },
  {
    name: "Engineering"
  },
  {
    name: "Filming"
  }
];

async function main() {
  try {
    await db.category.createMany({
      data: categories.map((category) => ({
        name: category.name,
        slug: slugify(category.name, { lower: true, replacement: "_" })
      }))
    });
    console.log("Categories seed successfully completed!.");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  }
}

main();
