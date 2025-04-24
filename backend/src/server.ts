import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import prisma from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
import { Request, Response } from "express"
import cookieParser from "cookie-parser";
// import userRoutes from "./routes/userRoutes.js";
// import ngoRoutes from "./routes/ngoRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import donationRoutes from "./routes/donationRoutes";

import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphQL/schema/index.js"
import  resolvers from "./graphQL/resolvers/index.js"

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies and authorization headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/ngo", ngoRoutes);
// app.use("/api/admin", adminRoutes);
app.get("/", (req,res)=>{
  res.json("hello")
})
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return { req, res, cookies: req.cookies }; 
  },
});

async function startServer() {
  await apolloServer.start();
  //@ts-ignore
  apolloServer.applyMiddleware({ app, path: "/graphql",cors: { credentials: true, origin: "http://localhost:5173" }
    
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, async () => {
    console.log(`Server running on PORT : ${PORT}`);
    
    try {
      await prisma.$connect();
      console.log("Database connected");
    } catch (error) {
      console.error(" DB connection error:", error);
    }
  });
}


startServer().catch(console.error);
