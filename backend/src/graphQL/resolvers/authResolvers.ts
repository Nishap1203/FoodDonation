import {
    SignUpCommand,
    AuthFlowType,
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    ConfirmSignUpCommand,
    ForgotPasswordCommand,
    ConfirmForgotPasswordCommand,
    ResendConfirmationCodeCommand
  } from "@aws-sdk/client-cognito-identity-provider";
  import prisma from "../../config/db.js";
  import { getClientSecretHash } from "../../utils/generateSecret.js";
  import jwt from "jsonwebtoken";
  import {Response} from "express"
  import { changePasswordSchema, confirmSignupSchema, forgotPasswordSchema, loginSchema, resendCodeSchema, signUpSchema } from "../../validations/authValidations.js";
  import { validateRequest } from "../../middlewares/validateGql.js";
  

  const client = new CognitoIdentityProviderClient({});
  const JWT_SECRET = process.env.JWT_SECRET || "fewjinfieww";
  
   const authResolvers = {
    Mutation: {
      async signUp(_: any, { email, password }: { email: string; password: string }) {
        const validationResult = validateRequest(signUpSchema, { email, password });

          if (validationResult.success !== true) {
            return validationResult;
          }

        try {
          const params = new SignUpCommand({
            ClientId: process.env.COGNITO_CLIENT_ID!,
            SecretHash: getClientSecretHash(email),
            Username: email,
            Password: password,
            UserAttributes: [{ Name: "email", Value: email }],
          });
      
          await client.send(params);
      
          return { message: "User registered successfully", email };
        } catch (error: any) {
          return { message: error.message };
        }
      },
  
      async confirmSignUp(_: any, { email, code }: { email: string; code: string }) {
        
        const validationResult = validateRequest(confirmSignupSchema, { email, code });

          if (validationResult.success !== true) {
            return validationResult;
          }

        try {
          const command = new ConfirmSignUpCommand({
            ClientId: process.env.COGNITO_CLIENT_ID!,
            SecretHash: getClientSecretHash(email),
            Username: email,
            ConfirmationCode: code,
          });
  
          await client.send(command);
          return {message : "User confirmed successfully"};
        } catch (error: any) {
          return {message : error.message};
        }
      },
  
      async login( _: any,
        { email, password }: { email: string; password: string },
        { res }: { res: Response } ) {
          const validationResult = validateRequest(loginSchema, { email, password });

          if (validationResult.success !== true) {
            return validationResult;
          }
        try {
          const params = new InitiateAuthCommand({
            AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
            AuthParameters: {
              USERNAME: email,
              PASSWORD: password,
              SECRET_HASH: getClientSecretHash(email),
            },
            ClientId: process.env.COGNITO_CLIENT_ID!,
          });
  
          const response = await client.send(params);
          if (!response.AuthenticationResult?.IdToken) {
            return {message : "Unauthorized"}
          }
  
          const token = response.AuthenticationResult.IdToken;
          // console.log(token)
          // res.cookie("access_token", token, {
          //   sameSite: "none", 
          //   secure: true,
          //   path: "/",
          //   maxAge: 3600000
          // });
          // console.log(res.getHeaders());
          let user = await prisma.user.findFirst({ where: { email } });
  
          if (!user) {
            user = await prisma.user.create({
              data: { email, password: jwt.sign(password, JWT_SECRET) },
            });
          }
  
          return { message: "logged in successfully",user, token };
        } catch (error: any) {
          return {message : error.message}
        }
      },
  
      async logout(_: any, __: any, { res }: { res: Response }) {
        //@ts-ignore
        res.clearCookie("access_token", {
          httpOnly: true,
        });
      
        return { message: "Logged out successfully" };
      }
,
  
      async forgotPassword(_: any, { email }: { email: string }) {
        const validationResult = validateRequest(forgotPasswordSchema, { email});

        if (validationResult.success !== true) {
          return validationResult;
        }
        try {
          const params = new ForgotPasswordCommand({
            ClientId: process.env.COGNITO_CLIENT_ID!,
            Username: email,
            SecretHash: getClientSecretHash(email),
          });
  
          await client.send(params);
          return {message : "Confirmation code sent successfully"};
        } catch (error: any) {
          return {message : error.message}
        }
      },
  
      async changePassword(_: any, {email ,code, password }: {email : string, code: string; password: string }) {
        const validationResult = validateRequest(changePasswordSchema, { email , code, password });

        if (validationResult.success !== true) {
          return validationResult;
        }
        try { 
          const params = new ConfirmForgotPasswordCommand({
            ClientId: process.env.COGNITO_CLIENT_ID!,
            Username: email,
            Password: password,
            ConfirmationCode: code,
            SecretHash: getClientSecretHash(email),
          });
  
          await client.send(params);
          return {message : "Password changed successfully"};
        } catch (error: any) {
          return {message : error.message}
        }
      },
  
      async resendCode(_: any, { email }: { email: string }) {
        const validationResult = validateRequest(resendCodeSchema, { email });

        if (validationResult.success !== true) {
          return validationResult;
        }
        try {
          const params = new ResendConfirmationCodeCommand({
            ClientId: process.env.COGNITO_CLIENT_ID!,
            Username: email,
            SecretHash: getClientSecretHash(email),
          });
  
          await client.send(params);
          return {message : "Confirmation code resent successfully"};
        } catch (error: any) {
          return {message : error.message}
        }
      },
    },
  };
  


  export default authResolvers;