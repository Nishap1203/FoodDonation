// import { Request, Response, NextFunction } from "express";
// import prisma from "../config/db.js"; 

// export const isAdmin = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
//   try {
//     const userId = req.user?.id; 
    
//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//       select: { role: true },
//     });
//     console.log(user)
//     //@ts-ignore
//     if (!user || user.role !== "ADMIN") {
//       return res.status(403).json({ message: "Forbidden: Admin access required" });
//     }

//     next(); 
//   } catch (error : any) {
//     console.log(error)
//     return res.status(500).json({ message: "Internal server error", error:error.message});
//   }
// };
