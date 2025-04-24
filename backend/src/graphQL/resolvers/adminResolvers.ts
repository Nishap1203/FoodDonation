import prisma from "../../config/db.js";
import { authenticateUser } from "../../middlewares/authMiddlware.js";

const adminResolvers = {
  Query: {
    getPendingNGOs: async (_: any, __: any, { req }: { req: any }) => {
      
      try {
        const user = await authenticateUser(req);
        if (!user || user.role !== "ADMIN") {
          return { message: "Unauthorized", NGOs: [] };
        }
        const response = await prisma.nGO.findMany({ where: { status: "pending" } });
        return { message: "Successfully fetched", NGOs: response };
      } catch (error) {
        console.error(error);
        return { message: "Error fetching NGOs", NGOs: [] };
      }
    },

    getNGODetails: async (_: any, { id }: { id: string }, { req }: { req: any }) => {
      
      try {
        const user = await authenticateUser(req);
        if (!user || user.role !== "ADMIN") {
          return { message: "Unauthorized" };
        }
        const ngo = await prisma.nGO.findUnique({ where: { id } });
        if (!ngo) return { message: "No NGO found" };
        return { message: "Successfully fetched", Ngo: ngo };
      } catch (error: any) {
        console.log(error.message);
        return { message: "Error" };
      }
    },

    getAllNGOs: async (_: any, __: any, { req }: { req: any }) => {
      
      try {
        const user = await authenticateUser(req);
        if (!user || user.role !== "ADMIN") {
          return { message: "Unauthorized", NGOs: [] };
        }
        const response = await prisma.nGO.findMany();
        return { message: "Successfully fetched", NGOs: response };
      } catch (error: any) {
        console.log(error.message);
        return { message: "Error" };
      }
    },

    totalFoodServed: async (_: any, __: any, { req }: { req: any }) => {
      
      try {
        const user = await authenticateUser(req);
        if (!user || user.role !== "ADMIN") {
          return { message: "Unauthorized" };
        }
        const totalFood = await prisma.donation.aggregate({
          _sum: { personsServed: true },
        });

        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        const lastMonthFood = await prisma.donation.aggregate({
          _sum: { personsServed: true },
          where: { createdAt: { gte: lastMonth } },
        });

        const lastMonthServed = lastMonthFood._sum.personsServed || 0;
        const totalServed = totalFood._sum.personsServed || 0;
        const change = lastMonthServed
          ? ((totalServed - lastMonthServed) / lastMonthServed) * 100
          : 0;

        return {
          totalFoodServed: totalServed,
          change: `${change.toFixed(1)}% from last month`,
        };
      } catch (error: any) {
        console.log(error.message);
        return { message: "Error" };
      }
    },
  },

  Mutation: {
    approveNGO: async (_: any, { id }: { id: string }, { req }: { req: any }) => {
      
      try {
        const user = await authenticateUser(req);
        if (!user || user.role !== "ADMIN") {
          return { message: "Unauthorized" };
        }
        return await prisma.nGO.update({
          where: { id },
          data: { status: "verified" },
        });
      } catch (error: any) {
        console.log(error.message);
        return { message: "Error" };
      }
    },

    rejectNGO: async (_: any, { id }: { id: string }, { req }: { req: any }) => {
      
      try {
        const user = await authenticateUser(req);
        if (!user || user.role !== "ADMIN") {
          return { message: "Unauthorized" };
        }
        return await prisma.nGO.update({
          where: { id },
          data: { status: "rejected" },
        });
      } catch (error: any) {
        console.log(error.message);
        return { message: "Error" };
      }
    },
  },
};

export default adminResolvers;
