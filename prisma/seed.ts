import { Prisma } from "@prisma/client";
import { categories, ingredients, products } from "./constants";
import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User Test",
        email: "user@test.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Admin",
        email: "admin@test.ru",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Pepperoni fresh",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
      categoryId: 1,
      description:
        "Spicy pepperoni, increased portion of mozzarella, tomatoes, signature tomato sauce",
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: "Cheesy",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
      description:
        "Mozzarella, cheddar and parmesan cheeses, signature alfredo sauce",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: "Chorizo fresh",
      imageUrl:
        "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
      description:
        "Spicy chorizo ​​sausages, bell peppers, mozzarella, signature tomato sauce",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  const pizza4 = await prisma.product.create({
    data: {
      name: "Pesto",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D613B84A5DBB4C1C50FB9583B7E.avif",
      description:
        "Chicken, pesto sauce, cheese cubes, tomatoes, mozzarella, signature alfredo sauce",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  const pizza5 = await prisma.product.create({
    data: {
      name: "Meat",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D6108E3A1C9952CD3A7F39A4D02.avif",
      description:
        "Chicken, ham, spicy pepperoni, spicy chorizo ​​sausage, mozzarella, signature tomato sauce",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  const pizza6 = await prisma.product.create({
    data: {
      name: "Arriva!",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D6134BC4150BDD8E792D866AB52.avif",
      description:
        "Chicken, spicy chorizo ​​sausage, burger sauce, sweet pepper, red onion, tomatoes, mozzarella, ranch sauce, garlic",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  const pizza7 = await prisma.product.create({
    data: {
      name: "Burger-pizza",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D61698827EE9B8DB6D0AEC53410.avif",
      description:
        "Ham, pickled cucumbers, tomatoes, red onion, garlic, burger sauce, mozzarella, special tomato sauce",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  const pizza8 = await prisma.product.create({
    data: {
      name: "Dodo pizza",
      imageUrl:
        "https://media.dodostatic.com/image/r:233x233/11EE7D5E89633932A0086DFDCFFF79A0.avif",
      description:
        "Juicy meatballs, pepperoni, ham, olives, mushrooms, bell peppers, red onions, mozzarella and tomato sauce",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  const pizza9 = await prisma.product.create({
    data: {
      name: "Supermeat 🌶️ ",
      imageUrl:
        "https://media.dodostatic.com/image/r:233x233/11EE7D5EB28E81809AD1430A0A96E9B3.avif",
      description:
        "Spicy pepperoni, chicken, chorizo, bacon, meatballs, mozzarella and tomato sauce",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // pepperoni variations
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // cheesy variations
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      // chorizo variations
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      // pesto variations
      generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 40 }),

      // meat variations
      generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 40 }),

      //ariva variations
      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 40 }),

      //burger-pizza variations
      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 40 }),

      // dodo variations
      generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 40 }),

      //super-meat variations
      generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 40 }),

      // other products
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
      },
      {
        userId: 2,
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
