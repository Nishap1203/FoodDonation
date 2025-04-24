import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const confirmSignupSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  code: z.string().length(6, { message: "Confirmation code must be 6 characters" }),
});
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
});

export const changePasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  code: z.string().length(6, { message: "Confirmation code must be 6 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const resendCodeSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
});
