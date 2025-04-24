import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateRequest = (schema: ZodSchema) => {
  //ts error in response
  return (req: Request, res: Response, next: NextFunction) : any => {
    try {
      schema.parse(req.body); 
      next(); 
    } catch (error : any) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          errors: error.issues.map((err) => err.message), 
        });
      }
      return res.status(500).json({ message: "Internal server error" , error: error.message});
    }
  };
};
