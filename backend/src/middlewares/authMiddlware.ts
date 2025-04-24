// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import jwkToPem from "jwk-to-pem";
// import axios from "axios";
// import prisma from "../config/db.js";

// // declare module "express" {
// //     export interface Request {
// //         user?: {
// //             id: string;
// //             email: string;
// //             role: string;  
// //         };
// //     }
// // }

// const COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID!;
// const COGNITO_REGION = process.env.COGNITO_REGION!;

// const getPublicKeys = async () => {
//     const url = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}/.well-known/jwks.json`;
//     const { data } = await axios.get(url);
//     return data.keys;
// };

// export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
//     try {
//         const token = req.cookies.access_token; 
//         if (!token) return res.status(401).json({ message: "Unauthorized, no token provided" });
        
//         const keys = await getPublicKeys();
//         const decodedHeader = jwt.decode(token, { complete: true });
//         if (!decodedHeader || !decodedHeader.header.kid){ 
//             // return res.status(401).json({ message: "Invalid token" });
//             return null;
//         }
        
//         const key = keys.find((k: any) => k.kid === decodedHeader.header.kid);
//         if (!key){ 
//             // return res.status(401).json({ message: "Invalid token" });
//             return null;
//         }

//         const pem = jwkToPem(key);
//         return new Promise((resolve, reject) => {
//             jwt.verify(token, pem, { algorithms: ["RS256"] }, async (err, decoded: any) => {
//               if (err) return resolve(null);
//               const user = await prisma.user.findUnique({ where: { email: decoded.email } });
//               resolve(user ? { id: user.id, email: user.email, role: user.role } : null);
//             });
//           });
//         } catch {
//           return null;
//         }
// };


import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import axios from "axios";
import prisma from "../config/db.js";

const COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID!;
const COGNITO_REGION = process.env.COGNITO_REGION!;

type AuthUser = {
  id: string;
  email: string;
  role: string;
};

const getPublicKeys = async () => {
  const url = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}/.well-known/jwks.json`;
  const { data } = await axios.get(url);
  return data.keys;
};

export const authenticateUser = async (req: any): Promise<AuthUser | null>=> {
  let token = req.headers.authorization
  // console.log(token)
  // const token = req.cookies?.access_token
  if (!token) throw new Error("Unauthorized: No token provided");

  try {
    const keys = await getPublicKeys();
    const decodedHeader = jwt.decode(token, { complete: true });

    if (!decodedHeader || !decodedHeader.header.kid) throw new Error("Invalid token");

    const key = keys.find((k: any) => k.kid === decodedHeader.header.kid);
    if (!key) throw new Error("Invalid token");

    const pem = jwkToPem(key);

    return new Promise((resolve, reject) => {
      jwt.verify(token, pem, { algorithms: ["RS256"] }, async (err, decoded: any) => {
        if (err) return reject(new Error("Unauthorized: Invalid token"));

        const user = await prisma.user.findUnique({ where: { email: decoded.email } });
        if (!user) return reject(new Error("Unauthorized: User not found"));

        resolve({ id: user.id, email: user.email, role: user.role });
      });
    });
  } catch (error) {
    throw new Error("Unauthorized: Token verification failed");
  }
};
