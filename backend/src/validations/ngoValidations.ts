import { z } from "zod";


export const getNearestNGOSchema = z.object({
  lat: z.number().min(-90).max(90), 
  long: z.number().min(-180).max(180), 
  radius: z.number().positive(), 
});

export const registerNGOLocationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
});

export const createFoodRequestSchema = z.object({
  foodName: z.string().min(2, "Food name must be at least 2 characters long"),
  quantity: z.number().positive("Quantity must be a positive number"),
});

export const fulfillFoodRequestSchema = z.object({
  requestId: z.string().uuid("Invalid Request ID format"), // Assuming request ID is a UUID
});
