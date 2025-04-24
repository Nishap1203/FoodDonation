import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be a valid 10-digit number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

export const createDonationSchema = z.object({
    foodType: z.string().min(3, "Food type must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    expiryDate: z.string().refine(
      (date) => !isNaN(Date.parse(date)) && new Date(date) > new Date(),
      "Expiry date must be a valid future date"
    ),
    quantity: z.number().min(1,"not enough quantity"),
    location: z.string().min(5,"provide valid location")
  });
  
  export const donationIdSchema = z.object({
    id: z.string().uuid("Invalid donation ID format"),
  });

  export const userIdSchema = z.object({
    id: z.string().uuid("Invalid user ID format"),
  });
  