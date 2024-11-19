import { getErrorMessage } from "@/lib/helpers/getErrorFunction";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "@/prisma/prisma-client";

// Define body schema for the order
const orderSchema = z.object({
  products: z.array(
    z.object({
      id: z.string(),
      quantity: z.number(),
      items: z.array(
        z.object({
          id: z.string(),
        })
      ),
      ingredients: z.array(z.string()),
    })
  ),
  address: z.string(),
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  comment: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    // Step 1: Check if the user is logged in by looking for the 'auth-token' cookie
    const token = cookies().get("auth-token");

    if (!token) {
      throw new Error("You are not logged in");
    }

    // Debugging: Log token value to check if it's correct
    console.log("Token: ", token.value);

    // Step 2: Verify the token and get the userId
    const secret = process.env.JWT_SECRET as string;
    const payload = jwt.verify(token.value, secret) as { userId: string };

    // Debugging: Log payload to ensure correct userId
    console.log("Payload: ", payload);

    // Step 3: Parse the request body
    const body = orderSchema.parse(await req.json());

    // Step 4: Create the order for the logged-in user
    const userId = payload.userId;

    // Calculate the totalAmount (adjust this based on your logic)
    const totalAmount = body.products.reduce((total, product) => {
      const productPrice = 100; // Replace with actual logic for price
      return total + product.quantity * productPrice;
    }, 0);

    const newOrder = await prisma.order.create({
      data: {
        userId: Number(userId), // Ensure userId is a number
        totalPrice: totalAmount,
        status: "PENDING",
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        comment: body.comment,
        items: JSON.parse(
          JSON.stringify(
            body.products.map((product) => ({
              productId: Number(product.id),
              quantity: product.quantity,
              items: product.items.map((item) => ({
                productItemId: Number(item.id),
              })),
              ingredients: product.ingredients.map((ingredientId) => ({
                ingredientId: Number(ingredientId),
              })),
            }))
          )
        ),
      },
    });

    return NextResponse.json({
      message: "Order placed successfully!",
      orderId: newOrder.id,
    });
  } catch (e) {
    console.error("Error: ", e);
    const errorMessage = getErrorMessage(e);
    return NextResponse.json(errorMessage, { status: 400 });
  }
}
