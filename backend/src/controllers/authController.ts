// import { Request, Response } from "express";
// import {
//   SignUpCommand,
//   AuthFlowType,
//   CognitoIdentityProviderClient,
//   InitiateAuthCommand,
//   ConfirmSignUpCommand,
//   ForgotPasswordCommand,
//   ConfirmForgotPasswordCommand,
//   ResendConfirmationCodeCommand
// } from "@aws-sdk/client-cognito-identity-provider";
// import prisma from "../config/db.js";
// import { getClientSecretHash } from "../utils/generateSecret.js";
// import jwt from "jsonwebtoken";
// import { changePasswordSchema, confirmSignupSchema, forgotPasswordSchema, loginSchema, resendCodeSchema, signUpSchema } from "../validations/authValidations.js";
// import { ZodError } from "zod";


// // type AuthRequestBody = {
// //   email: string;
// //   password: string;
// // };

// // type ConfirmSignupBody = {
// //   email: string;
// //   code: string;
// //   password : string;
// // };


// const client = new CognitoIdentityProviderClient({});


// export const signUp = async (req: Request, res: Response) : Promise<any>=> {
//   try {
//     const body = signUpSchema.parse(req.body);
//     const { email, password } = body;

  
//     const params = new SignUpCommand({
//       ClientId: process.env.COGNITO_CLIENT_ID!,
//       SecretHash: getClientSecretHash(email),
//       Username: email,
//       Password: password,
//       UserAttributes: [{ Name: "email", Value: email }],
//     });

//     await client.send(params);
//     res.cookie("email",email, {
//       httpOnly: true,     
//       sameSite: "none" ,
//       path :"/"
//     });
    
//     return res.status(200).json({ message: "User registered successfully", email});
//   } catch (error: any) {
//     // console.log(error)
//     return res.status(400).json({ error: error.message });
//   }
// };


// export const confirmSignUp = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const body = confirmSignupSchema.parse(req.body);
//     const { code,email } = body;
//     const command = new ConfirmSignUpCommand({
//       ClientId: process.env.COGNITO_CLIENT_ID!,
//       SecretHash: getClientSecretHash(email),
//       Username: email,
//       ConfirmationCode: code, 
//     });
//     await client.send(command);   
 
//     return res.status(200).json({ message: "User created successfully"});
//   } catch (error: any) {
  
//     return res.status(400).json({ error: error.message, message: "Error occurred" });
//   }
// };


// export const login = async (req: Request, res: Response) : Promise<any>=> {
//   try {
//     const body = loginSchema.parse(req.body);
//     const { email, password } = body;
    
//     const params = new InitiateAuthCommand({
//       AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
//       AuthParameters: {
//         USERNAME: email,
//         PASSWORD: password,
//         SECRET_HASH: getClientSecretHash(email),
//       },
//       ClientId: process.env.COGNITO_CLIENT_ID!,
//     });
//     const secret = process.env.JWT_SECRET || "9429323osfknsdfoin239r23]]affd"
//     const hashedPassword = jwt.sign(password,secret);
//     const response = await client.send(params);
//     const existingUser = await prisma.user.findFirst({
//       where:{
//         email 
//       }
//     })
//     let user = existingUser
//     if(!existingUser){
//          let user = await prisma.user.create({
//         //@ts-ignore
//         data:{
//           email,
//           password: hashedPassword
//         }
//       })
//     }

//     // res.cookie("email", email);
//     if (!response.AuthenticationResult?.IdToken) {
//       return res.status(401).json({ message: "Authentication failed" });
//     }

//     res.cookie("access_token", response.AuthenticationResult.IdToken, {
//       httpOnly: true,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000, 
//     });

//     return res.status(200).json({ message: "Login Successful", token : response.AuthenticationResult.IdToken, user : existingUser ? existingUser : user});
//   } catch (error: any) {
//     return res.status(400).json({ message :"Internal Server Error" ,error: error.message });
//   }
// };


// export const logout = async (req: Request, res: Response) : Promise<any> => {
//   res.clearCookie("access_token", {
//     httpOnly: true,
//     // secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//   });

//   return res.status(200).json({ message: "Logged out successfully" });
// };


// export const forgetPassword = async (req : Request, res: Response) : Promise<any>=> {
//     const body = forgotPasswordSchema.parse(req.body);
//     const {email} = body;
//     const params = new ForgotPasswordCommand({
//       ClientId: process.env.COGNITO_CLIENT_ID,
//       Username: email,
//       SecretHash: getClientSecretHash(email),
//     })

//     try {
//       await client.send(params);
//       return res.status(200).json({message : "Confirm code sent successfully"})
//     } catch (error : any) {
 
//       return res.status(400).json({message : "Internal Server Error", error : error.message})
//     }
// }

// export const changePassword = async (req: Request, res:Response) : Promise<any>=>{
//     const body = changePasswordSchema.parse(req.body);
//     const {code , password} = body;
//     const email = req.cookies.email;
//     const params = new ConfirmForgotPasswordCommand({
//       ClientId : process.env.COGNITO_CLIENT_ID,
//       Username : email,
//       Password : password,
//       ConfirmationCode: code,
//       SecretHash: getClientSecretHash(email)
//     })
//     try {
//       const response = await client.send(params)
//       return res.status(200).json({message : "password changed successfully", response})
//     } catch (error : any) {

//       return res.status(400).json({message : "Internal Server Error", error : error.message})
//     }
// }

// export const resendCode = async (req: Request , res : Response) : Promise<any> => {
//   const body = resendCodeSchema.parse(req.body);
//   const {email} = body
//   const params = new ResendConfirmationCodeCommand({
//     ClientId : process.env.COGNITO_CLIENT_ID,
//     Username: email,
//     SecretHash:getClientSecretHash(email)
//   })
//   try {
//     await client.send(params);
//     return res.status(200).json({message : "code send successfully"})
//   } catch (error : any) {

//     return res.status(400).json({message : "Internal Server Error", error : error.message})
//   }
// }