// import { Request, Response } from "express";
// import prisma from "../config/db.js";
// import { calculateDistance } from "../utils/calculateDistance.js";
// import { getLatLngFromAddress } from "../utils/getLocation.js"; 
// import { string, ZodError } from "zod";



// export const registerNGOLocation = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { address, name, email, phone} = req.body;
//     const userId = req.user?.id; 

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized. Please log in first." });
//     }

//     if (!address || !name || !email || !phone) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

    
//     const existingNGO = await prisma.nGO.findUnique({ where: { userId } });

//     if (existingNGO) {
//       return res.status(400).json({ message: "User already registered an NGO." });
//     }

 
//     const ngo = await prisma.nGO.create({
//       data: {
//         name,
//         email,
//         phone,
//         address,
//         latitude: 12,
//         longitude: 12,
//         status: "pending",
//         user: { connect: { id: userId } },
//       },
//     });

//     await prisma.user.update({
//       where: { id: userId },
//       data: { role: "NGO" },
//     });

//     return res.status(201).json({ message: "NGO registered successfully", data: ngo });
//   } catch (error: any) {
//     return res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };



// export const getNearestNGO = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { lat, long, radius } = req.query;

//     if (!lat || !long || !radius) {
//       return res.status(400).json({ message: "Latitude, Longitude, and Radius are required" });
//     }

//     const userLat = parseFloat(lat as string);
//     const userLng = parseFloat(long as string);
//     const searchRadius = parseFloat(radius as string);

//     if (isNaN(userLat) || isNaN(userLng) || isNaN(searchRadius)) {
//       return res.status(400).json({ message: "Invalid Latitude, Longitude, or Radius" });
//     }
    
//     const ngos = await prisma.nGO.findMany({
//       where: { status: "verified" }
//     });

//     const ngosWithinRadius = ngos
//       .map((ngo) => {
//         if (ngo.latitude !== null && ngo.longitude !== null) {
//           //@ts-ignore
//           const distance = calculateDistance(userLat, userLng, ngo.latitude, ngo.longitude);
//           return distance <= searchRadius ? { ...ngo, distance } : null;
//         }
//         return null;
//       })
//       .filter((ngo) => ngo !== null);

//     ngosWithinRadius.sort((a, b) => a.distance - b.distance);

//     if (ngosWithinRadius.length === 0) {
//       return res.status(404).json({ message: "No NGOs found within the specified radius" });
//     }

//     return res.status(200).json(ngosWithinRadius); 
//   } catch (error: any) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };





// // export const updateNGOFoodRequired = async (req: Request, res: Response): Promise<any> => {
// //   try {
// //     const { foodRequired } = req.body;
// //     const id = String(req.params.id);
// //     console.log(id)

// //     if (!foodRequired) {
// //       return res.status(400).json({ message: "foodRequired is required" });
// //     }

// //     if (isNaN(Number(foodRequired)) && !foodRequired.match(/\d+ (kg|units)/)) {
// //       return res.status(400).json({ message: "Invalid food required format" });
// //     }

// //     const updatedNGO = await prisma.nGO.update({
// //       where: { id },
// //       data: { foodRequired },
// //     });

// //     if (!updatedNGO) {
// //       return res.status(404).json({ message: "NGO not found" });
// //     }

// //     return res.status(200).json({ message: "Food required updated successfully", data: updatedNGO });
// //   } catch (error: any) {
// //     if (error instanceof ZodError) {
// //       return res.status(400).json({
// //         errors: error.issues.map(err => err.message) 
// //       });
// //     }
// //     console.log(error)
// //     return res.status(500).json({ message : "Internal Server Error" , error: error.message });
// //   }
// // };

// export const createFoodRequest = async (req: Request, res: Response) : Promise<any> => {
//   try {
//     const userId = req.user?.id;

   
//     const ngo = await prisma.nGO.findUnique({
//       where: { userId },
//     });

//     if (!ngo) {
//       return res.status(403).json({ message: "Only NGOs can request food" });
//     }
//     if (!ngo.id) {
//       return res.status(403).json({ message: "Only NGOs can request food" });
//     }

//     const { foodName, quantity } = req.body;

//     if (!foodName || !quantity) {
//       return res.status(400).json({ message: "Food name and quantity are required" });
//     }

//     const request = await prisma.request.create({
//       data: {
//         ngoId: ngo.id,
//         foodName,
//         quantity,
//         status: "pending",
//       },
//     });

//     return res.status(201).json({ message: "Food request created", data: request });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const getAllFoodRequests = async (req: Request, res: Response) : Promise<any> => {
//   try {
//     const requests = await prisma.request.findMany({
//       where: { status: "pending" }, 
//       include: { ngo: true },
//     });

//     if (requests.length === 0) {
//       return res.status(404).json({ message: "No food requests available" });
//     }

//     return res.status(200).json(requests);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const getAllNgoReq = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const ngoId = req.query.id as string; 
//     if (!ngoId) {
//       return res.status(400).json({ message: "provide NGO id" });
//     }
//     const requests = await prisma.request.findMany({
//       where: {
//         ngoId,
//       },
//     });

//     return res.status(200).json({ requests });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal Server Error", error });
//   }
// };


// export const fulfillFoodRequest = async (req: Request, res: Response) : Promise<any>=> {
//   try {
//     const { requestId } = req.params;

//     const request = await prisma.request.findUnique({
//       where: { id: requestId },
//     });

//     if (!request) {
//       return res.status(404).json({ message: "Food request not found" });
//     }

  
//     await prisma.request.update({
//       where: { id: requestId },
//       data: { status: "fulfilled" },
//     });

//     return res.status(200).json({ message: "Food request fulfilled" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };



// // admin routes




// // export const getPendingNGOs = async (req: Request, res: Response): Promise<any> => {
// //   try {
// //     const pendingNGOs = await prisma.nGO.findMany({
// //       where: {
// //         status: 'pending',
// //       },
// //     });

// //     return res.status(200).json({ pendingNGOs });
// //   } catch (error : any) {
// //     return res.status(500).json({ error: error.message });
// //   }
// // };

// // export const approveNGO = async (req: Request, res: Response): Promise<any> => {
// //   try {
// //     const { id } = req.params;

// //     const ngo = await prisma.nGO.update({
// //       where: { id },
// //       data: { status: 'verified' },
// //     });

// //     return res.status(200).json({ message: 'NGO approved successfully', data: ngo });
// //   } catch (error : any) {
// //     return res.status(500).json({ error: error.message });
// //   }
// // };

// // export const rejectNGO = async (req: Request, res: Response): Promise<any> => {
// //   try {
// //     const { id } = req.params;

// //     const ngo = await prisma.nGO.update({
// //       where: { id },
// //       data: { status: 'rejected' },
// //     });

// //     return res.status(200).json({ message: 'NGO rejected successfully', data: ngo });
// //   } catch (error : any) {
// //     return res.status(500).json({ error: error.message });
// //   }
// // };

// // export const getNGODetails = async (req: Request, res: Response): Promise<any> => {
// //   try {
// //     const { id } = req.params;

// //     const ngo = await prisma.nGO.findUnique({
// //       where: { id },
// //     });

// //     if (!ngo) {
// //       return res.status(404).json({ message: 'NGO not found' });
// //     }

// //     return res.status(200).json({ ngo });
// //   } catch (error : any) {
// //     return res.status(500).json({ error: error.message });
// //   }
// // };
