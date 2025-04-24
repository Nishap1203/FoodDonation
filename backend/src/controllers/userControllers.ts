// import prisma from "../config/db.js";
// import { Request,  Response } from "express";

// // Get User Profile
// export const userProfile = async (req: Request, res: Response): Promise<any> => {
//     if (!req.user) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     try {
//         const user = await prisma.user.findUnique({
//             where: { id: req.user.id },
//             select: { 
//                 id: true, 
//                 email: true, 
//                 name: true, 
//                 phone: true, 
//                 address: true, 
//                 role: true, 
//                 createdAt: true 
//             }
//         });

//         if (!user) return res.status(404).json({ message: "User not found" });
//         const responseUser = {
//             id: user.id,
//             email: user.email,
//             name: user.name || undefined, 
//             address: user.address || undefined,
//             role: user.role,
//             createdAt: user.createdAt,
//             phone: user.phone || undefined  
//         };


//         res.status(200).json(responseUser);
//     } catch (error: any) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// export const updateProfile = async (req: Request, res: Response): Promise<any> => {
//     if (!req.user) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     try {
//         const { name, phone, address } = req.body;

//         const updatedUser = await prisma.user.update({
//             where: { id: req.user.id },
//             data: { name, phone, address }
//         });

//         res.json({ message: "Profile updated successfully", user: updatedUser });
//     } catch (error: any) {
//         res.status(500).json({ message: "Error updating profile", error: error.message });
//     }
// };

// // Get All Users for Admin
// export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
//     if (!req.user) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     if (req.user.role !== "ADMIN") return res.status(403).json({ message: "Access denied" });

//     try {
//         const users = await prisma.user.findMany({
//             select: { 
//                 id: true, 
//                 email: true, 
//                 name: true, 
//                 phone: true, 
//                 address: true, 
//                 role: true, 
//                 createdAt: true 
//             }
//         });

//         res.json(users);
//     } catch (error: any) {
//         res.status(500).json({ message: "Error fetching users", error: error.message });
//     }
// };

// // Get User by ID for Admin
// export const getUserById = async (req: Request, res: Response): Promise<any> => {
//     if (!req.user) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     if (req.user.role !== "ADMIN") return res.status(403).json({ message: "Access denied" });

//     try {
//         const user = await prisma.user.findUnique({
//             where: { id: req.params.id },
//             select: { 
//                 id: true, 
//                 email: true, 
//                 name: true, 
//                 phone: true, 
//                 address: true, 
//                 role: true, 
//                 createdAt: true 
//             }
//         });

//         if (!user) return res.status(404).json({ message: "User not found" });

//         res.json(user);
//     } catch (error: any) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// // implement user location data in the schema

// export const updateUserLocation = async (req: Request, res: Response): Promise<any> => {
//     if (!req.user) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     try {
//         const { latitude, longitude } = req.body;

//         if (latitude === undefined || longitude === undefined) {
//             return res.status(400).json({ message: "Latitude and longitude are required" });
//         }

//         if (typeof latitude !== "number" || typeof longitude !== "number") {
//             return res.status(400).json({ message: "Latitude and longitude must be numbers" });
//         }

//         const updatedUser = await prisma.user.update({
//             where: { id: req.user.id },
//             data: { latitude, longitude },
//         });

//         res.json({ message: "Location updated successfully", user: updatedUser });
//     } catch (error: any) {
//         res.status(500).json({ message: "Error updating location", error: error.message });
//     }
// };




// export const createDonation = async (req: Request, res: Response): Promise<any> => {
//   try {
//     let { foodType, description, expiryDate } = req.body;
//     const donorId = req.user?.id; 

//     if (!donorId) {
//       return res.status(400).json({ message: "Donor ID is required" });
//     }

//     if (!foodType || !expiryDate) {
//       return res.status(400).json({ message: "Food type and expiry date are required" });
//     }

//     const donation = await prisma.donation.create({
//       data: {
//         foodType,
//         description,
//         expiryDate,
//         donorId,
//         status: "available",
//       },
//     });

//     return res.status(201).json({ message: "Donation created successfully", donation });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// export const getAllDonations = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const donations = await prisma.donation.findMany({
//       where: { status: "available" },
//       include: { claims: true, donor: true },
//     });

//     return res.status(200).json(donations);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// export const getMyDonations = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const donorId = req.user?.id;

//     const donations = await prisma.donation.findMany({
//       where: { donorId },
//       include: { claims: true },
//     });

//     return res.status(200).json(donations);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// export const getDonationById = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { donationId } = req.query ;
//     let id = String(donationId)

//     const donation = await prisma.donation.findUnique({
//       where: { id },
//       include: { donor: true, claims: true },
//     });

//     if (!donation) {
//       return res.status(404).json({ message: "Donation not found" });
//     }

//     return res.status(200).json(donation);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// export const cancelDonation = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { donationId } = req.params;
//     const donorId = req.user?.id;

//     const donation = await prisma.donation.findFirst({
//       where: { id: donationId, donorId },
//     });

//     if (!donation) {
//       return res.status(404).json({ message: "Donation not found" });
//     }

//     if (donation.status !== "available") {
//       return res.status(400).json({ message: "Only available donations can be canceled" });
//     }

//     await prisma.donation.delete({ where: { id: donationId } });

//     return res.status(200).json({ message: "Donation canceled successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };


// export const completeDonation = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { donationId } = req.params;
//     const donorId = req.user?.id;

//     const donation = await prisma.donation.findFirst({
//       where: { id: donationId, donorId },
//     });

//     if (!donation) {
//       return res.status(404).json({ message: "Donation not found" });
//     }

//     if (donation.status !== "claimed") {
//       return res.status(400).json({ message: "Only claimed donations can be completed" });
//     }

//     await prisma.donation.update({
//       where: { id: donationId },
//       data: { status: "completed" },
//     });

//     return res.status(200).json({ message: "Donation marked as completed" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };


