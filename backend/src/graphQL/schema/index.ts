import userTypeDefs from "./userSchema.js";
import authTypeDefs from "./authSchema.js";
import ngoTypeDef from "./ngoSchema.js";
import adminTypeDefs from "./adminSchema.js";

const typeDefs = [authTypeDefs,userTypeDefs, ngoTypeDef,adminTypeDefs]

export default typeDefs;