// import { Router } from "express";
// import { registerNGOLocation, getNearestNGO, createFoodRequest, getAllFoodRequests, fulfillFoodRequest, getAllNgoReq } from "../controllers/ngoControllers.js";
// // import { authenticateUser } from "../middlewares/authMiddlware.js"; 
// import { validateRequest } from "../middlewares/validateReq.js";
// import { registerNGOSchema} from "../validations/ngoValidations.js";
// import { checkNGO } from "../middlewares/checkNGO.js";

// const router = Router();

// // router.use(authenticateUser); 

// // router.post("/",validateRequest(registerNGOSchema),authenticateUser,registerNGOLocation);
// // router.get("/",authenticateUser,getNearestNGO);
// // router.put("/:id",validateRequest(updateFoodRequiredSchema),updateNGOFoodRequired)

// router.post("/request",checkNGO,createFoodRequest)
// router.get("/request",checkNGO,getAllFoodRequests)
// router.post("/request/fullfill",checkNGO,fulfillFoodRequest)
// router.get("/requests",getAllNgoReq);
// // admin routes




// // router.get('/pending-ngos', getPendingNGOs);

// // router.put('/approve-ngo/:id', approveNGO);

// // router.put('/reject-ngo/:id', rejectNGO);

// // router.get('/ngo-details/:id', getNGODetails);



// export default router;