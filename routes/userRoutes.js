import express from "express";
import {
  LogIn,
  SignUp,
  getUsers,
  updateUser
} from "../controllers/userController.js";
const userRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management for the Ticket Management System
 */

/**
 * @swagger
 * /api/v1/users:
 *  get:
 *    summary: Get all users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: A list of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  fullName:
 *                    type: string
 *                  email:
 *                    type: string
 *      404:
 *        description: Users not found
 */

userRoute.get('/', getUsers);
userRoute.post("/login", LogIn);
userRoute.put('/:id', updateUser);
userRoute.post("/signup", SignUp);

export default userRoute;