import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET as string;

export function generateToken(userId: string) {
  const token = jwt.sign({ userId }, secret, { expiresIn: "1h" });
  return token;
}
