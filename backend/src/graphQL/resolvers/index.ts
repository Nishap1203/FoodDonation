import authResolvers from "./authResolvers.js";
import userResolvers from "./userResolvers.js";
import ngoResolvers from "./ngoResolvers.js";
import adminResolvers from "./adminResolvers.js";       

const resolvers = [authResolvers, userResolvers, ngoResolvers, adminResolvers];

export default resolvers;