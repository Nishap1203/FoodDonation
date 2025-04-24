import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export interface GraphQLContext {
  user?: { id: string; role: string };
}

export const createContext = async ({ req }: { req: Request }): Promise<GraphQLContext> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return {};

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) return {};
    return { user };
  } catch (error) {
    return {};
  }
};
