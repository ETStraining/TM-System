import express from "express";
import {
  LogIn,
  SignUp,
  getUsers,
  updateUser
} from "../controllers/userController.js";
const userRoute = express.Router();
userRoute.get('/', getUsers);
userRoute.post("/login", LogIn);
userRoute.put('/:id', updateUser);
userRoute.post("/signup", SignUp);

export default userRoute;