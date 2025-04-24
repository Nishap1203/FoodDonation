// import { Request, Response, NextFunction } from "express";
// import prisma from "../config/db.js"; 

// export const checkNGO = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized, user not found" });
//     }

//     const user = await prisma.user.findUnique({
//       where: { id: req.user.id },
//     });

//     if (!user || user.role !== "NGO") {
//       return res.status(403).json({ message: "Access denied. Only NGOs can perform this action." });
//     }

//     next();
//   } catch (error) {
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };
