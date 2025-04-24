// import { Request, Response } from "express";
// import prisma from "../config/db.js"; 

// export const getPendingNGOs = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const pendingNGOs = await prisma.nGO.findMany({
//       where: { status: "pending" },
//     });

//     return res.status(200).json({ pendingNGOs });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// export const approveNGO = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { id } = req.params;

//     const ngo = await prisma.nGO.update({
//       where: { id },
//       data: { status: "verified" },
//     });

//     return res.status(200).json({ message: "NGO approved successfully", data: ngo });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// export const rejectNGO = async (req: Request, res: Response) : Promise<any>=> {
//   try {
//     const { id } = req.params;

//     const ngo = await prisma.nGO.update({
//       where: { id },
//       data: { status: "rejected" },
//     });

//     return res.status(200).json({ message: "NGO rejected successfully", data: ngo });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// export const getNGODetails = async (req: Request, res: Response) : Promise<any>=> {
//   try {
//     const { id } = req.params;

//     const ngo = await prisma.nGO.findUnique({
//       where: { id },
//     });

//     if (!ngo) {
//       return res.status(404).json({ message: "NGO not found" });
//     }

//     return res.status(200).json({ ngo });
//   } catch (error: any) {
//     return res.status(500).json({ error: error.message });
//   }
// };

// export const getAllNGOs = async (req : Request,res : Response) : Promise<any>=>{
//     try {
//         const ngos = await prisma.nGO.findMany({});
//         return res.status(200).json({message: "successfully fetched", data: ngos})
//     } catch (error) {
//       console.log(error)
//       return res.status(400).json({message : "Internal Server Error", error})
//     }
// }

// export const totalFoodServed= async (req: Request, res : Response) : Promise<any> => {
//   try {
//     const totalFoodServed = await prisma.donation.aggregate({
//       _sum: { personsServed: true },
//     });

//     const lastMonth = new Date();
//     lastMonth.setMonth(lastMonth.getMonth() - 1);

//     const lastMonthFoodServed = await prisma.donation.aggregate({
//       _sum: { personsServed: true },
//       where: { createdAt: { gte: lastMonth } },
//     });
//     const change = lastMonthFoodServed._sum.personsServed
//     //@ts-ignore
//       ? ((totalFoodServed._sum.personsServed - lastMonthFoodServed._sum.personsServed) / lastMonthFoodServed._sum.personsServed) * 100
//       : 0;

//     res.json({
//       totalFoodServed: totalFoodServed._sum.personsServed || 0,
//       change: `${change.toFixed(1)}% from last month`,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// }