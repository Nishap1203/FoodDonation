import { PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import { authenticateUser } from "../../middlewares/authMiddlware.js";
import { validateRequest } from "../../middlewares/validateGql.js";
import { createDonationSchema, updateProfileSchema } from "../../validations/userValidations.js";

const prisma = new PrismaClient();

const userResolvers = {
  Query: {
    userProfile: async (_: any, __: any, { req }: { req: any }) => {
      try {
        const user = await authenticateUser(req);
        if(!user) return {message : "Forbidden"}
        const profile=  await prisma.user.findUnique({ where: { id: user.id } });
        // console.log(profile)
        return {message : "Success", User : profile}
      } catch (error) {
        console.log(error)
      }
    },

    getAllUsers: async (_: any, __: any, { req }: { req: any }) => {
      try {
        const user = await authenticateUser(req);
        // if(!user) return {message : "UnAuthorized"}
        if (!user || user.role !== "ADMIN") return {message : "UnAuthorized"}
        const users =  await prisma.user.findMany();
        return {message : "Success", Users: users}
        } catch (error) {
          console.log(error)
        }
    },

    getUserById: async (_: any, { id }: { id: string }, { req }: { req: any }) => {
      try {
          const user = await authenticateUser(req);
          if (!user || user.role !== "ADMIN") return {message : "UnAuthorized"}
        const profile = await prisma.user.findUnique({ where: { id } });
        if(!profile) return {message : "User not found"}
        return {message : "Sucess", User : profile}
      } catch (error) {
        console.log(error)
      }
    },

    getMyDonations: async (_: any, __: any, { req }: { req: any }) => {
      try {
      const user = await authenticateUser(req);
      if(!user)  return {message : "UnAuthorized"}
      const donations =  await prisma.donation.findMany({ where: { donorId: user.id } });
      console.log(donations)
      if(!donations){
        return {message : "No donations", Donations :[]}
      }
      else{

        return {message : "Success", Donations : donations}
      }
        } catch (error) { 
          console.log(error)
        }
    },

    getDonationById: async (_: any, { id }: { id: string }) => {
      try {
        const donation = await prisma.donation.findUnique({ where: { id } });
        if (!donation) return {message : "Donation not found"}
        return {message : "Success", Donation:donation}
        
      } catch (error) {
        console.log(error)
      }
    },

    getAllDonations: async (_: any, __: any, { req }: { req: any }) => {
      try {
        const user = await authenticateUser(req);
        if (!user || user.role !== "ADMIN") return {message : "UnAuthorized"}
        const donations =  await prisma.donation.findMany();
        return {message : "Success", Donations : donations}
      } catch (error) {
        console.log(error)
      }
    },
  },

  Mutation: {
    updateProfile: async (
      _: any,
      { name, phone, address }: { name: string; phone: string; address: string },
      { req }: { req: any }
    ) => {
      try {
        const validationResult = validateRequest(updateProfileSchema, {name,phone,address});
        if (validationResult.success !== true) {
          return validationResult;
        }
        const user = await authenticateUser(req);
        if(!user) return {message : "Unauthorized"}
       const updated =  await prisma.user.update({
          where: { id: user.id },
          data: { name, phone, address },
        });
        return {message : "Updated Successfutty", User: updated}
      } catch (error) {
        console.log(error)
      }
    },

    createDonation: async (
      _: any,
      { foodType, description, expiryDate, location , quantity}: { foodType: string; description: string; expiryDate: string ;location : string;quantity : number },
      { req }: { req: any }
    ) => {
        const validationResult = validateRequest(createDonationSchema, {foodType,description,expiryDate , quantity, location});
          if (validationResult.success !== true) {
            return validationResult;
          }
      try {
        const user = await authenticateUser(req);
        if(!user) return {message : "UnAuthorized"}
        const donation=  await prisma.donation.create({
          data: { foodType, description, expiryDate, donorId: user.id, status: "available" ,quantity, location},
        });
        return {message : "Created Successfully", Donation: donation}
      } catch (error) {
        console.log(error)
      }
    },

    cancelDonation: async (_: any, { id }: { id: string }, { req }: { req: any }) => {
      try {
        const user = await authenticateUser(req);
        if(!user) return {message : "UnAuthorized"}
        const donation = await prisma.donation.findFirst({ where: { id, donorId: user.id } });
  
        if (!donation) return {message : "Donation not found"};
  
        await prisma.donation.delete({ where: { id } });
        return {message: "Donation cancelled successfully"};
        
      } catch (error) {
        console.log(error)
      }
    },

    completeDonation: async (_: any, { id }: { id: string }, { req }: { req: any }) => {
      try {
        const user = await authenticateUser(req);
        if(!user) return {message : "UnAuthorized"}
        const donation = await prisma.donation.findFirst({ where: { id, donorId: user.id } });
  
        if (!donation) return {message : "Donation not found"}
  
        const updated =  prisma.donation.update({ where: { id }, data: { status: "completed" } });
        return {message : "Donation marked as completed", Donation: updated}
        
      } catch (error) {
        console.log(error)
      }
    },
  },
};

export default userResolvers;
