import { getSessionUser } from "@/lib/helpers/getSessionUser";
import { prisma } from "@/prisma/prisma-client";

export async function getUser() {
  const userId = getSessionUser();

  if (!userId) {
    throw new Error("Your credentials are invalid. You will be logged out!");
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  return user;
}
