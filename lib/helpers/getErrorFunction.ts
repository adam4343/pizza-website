import { ZodError } from "zod";

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  if (error instanceof ZodError) {
    return error.errors.at(0)?.message;
  }
  return "Something went wrong";
}
