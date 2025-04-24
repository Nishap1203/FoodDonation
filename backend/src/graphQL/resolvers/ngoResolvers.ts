import prisma from "../../config/db.js";
import { calculateDistance } from "../../utils/calculateDistance.js";
import { authenticateUser } from "../../middlewares/authMiddlware.js";
import { validateRequest } from "../../middlewares/validateGql.js";
import { createFoodRequestSchema, getNearestNGOSchema, registerNGOLocationSchema } from "../../validations/ngoValidations.js";


export const ngoResolvers = {
  Query: {
    getNearestNGO: async (_: any, { lat, long, radius }: { lat: number; long: number; radius: number }) => {
      const validationResult = validateRequest(getNearestNGOSchema, {lat,long,radius});
      if (validationResult.success !== true) {
        return validationResult;
      }
      try {
        const ngos = await prisma.nGO.findMany({ where: { status: "verified" } });

      const ngosWithinRadius = ngos
        .map((ngo) => {
          if (ngo.latitude !== null && ngo.longitude !== null) {
            const distance = calculateDistance(lat, long, ngo.latitude, ngo.longitude);
            return distance <= radius ? { ...ngo, distance } : null;
          }
          return {message : "No Nearby NGOs"};
        })
        .filter(Boolean)
        .sort((a, b) => (a as any).distance - (b as any).distance);

      if (!ngosWithinRadius.length) {
        return {message : "No Nearby NGOs"};
      }

      return {message : "Success" , NGOs : ngosWithinRadius};
        
      } catch (error) {
        console.log(error)
      }
      
    },

    getAllFoodRequests: async () => {
      try {
        const requests = await prisma.request.findMany({
          where: { status: "pending" },
          include: { ngo: true },
        });
  
        if (!requests.length) {
          return [];
        }
  
        return requests;
        
      } catch (error) {
        console.log(error)
      }
      
    },

    getAllNgoReq: async (_: any, { ngoId }: { ngoId: string }) => {
      try {
        const requests = await prisma.request.findMany({ where: { ngoId } });
        return requests;
      } catch (error) {
        console.log(error)
      }
    },
  },

  Mutation: {
    registerNGOLocation: async (
      _: any,
      { name, email, phone, address }: { name: string; email: string; phone: string; address: string },
      { req }: { req: any }
    ) => {
      const validationResult = validateRequest(registerNGOLocationSchema, {name,email,phone,address});
      if (validationResult.success !== true) {
        return validationResult;
      }
      try {
        const user = await authenticateUser(req);
      if (!user) {
        return {message : "Unauthorized. Please log in first"};
      }

      const existingNGO = await prisma.nGO.findUnique({ where: { userId: user.id } });
      if (existingNGO) {
        return {message : "User has already registered an NGO "};
      }

      const ngo = await prisma.nGO.create({
        data: {
          name,
          email,
          phone,
          address,
          latitude: 12, 
          longitude: 12, 
          status: "pending",
          user: { connect: { id: user.id } },
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { role: "NGO" },
      });

      return {message : "Registered Successfully", NGOs : ngo};
      } catch (error) {
        console.log(error)
      }
      
    },

    createFoodRequest: async (
      _: any,
      { foodName, quantity }: { foodName: string; quantity: number },
      { req }: { req: any }
    ) => {
      const validationResult = validateRequest(createFoodRequestSchema, {foodName,quantity});
      if (validationResult.success !== true) {
        return validationResult;
      }
      try {
        const user = await authenticateUser(req);
        if (!user) {
          return {message : "Unauthorized. Please log in first"};
        }
  
        const ngo = await prisma.nGO.findUnique({ where: { userId: user.id } });
        if (!ngo) {
          return {message : "Only NGOs can request food"};
        }
  
        const request = await prisma.request.create({
          data: {
            ngoId: ngo.id,
            foodName,
            quantity,
            status: "pending",
          },
        });
  
        return {message : "Success", Requests : request};
      } catch (error) {
        console.log(error)
      }
     
    },

    fulfillFoodRequest: async (_: any, { requestId }: { requestId: string }, { req }: { req: any }) => {
      try {
        const user = await authenticateUser(req);
      if (!user) {
        return "Unauthorized";
      }

      const request = await prisma.request.findUnique({ where: { id: requestId } });
      if (!request) {
        return "Food request not found";
      }

      await prisma.request.update({
        where: { id: requestId },
        data: { status: "fulfilled" },
      });

      return "Food request fulfilled successfully.";
      } catch (error) {
        console.log(error)
      }
      
    },
  },
};

export default ngoResolvers;
