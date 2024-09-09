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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * tags:
 *   name: Users
 *   description: User management for the Ticket Management System
 */

/**
 * @swagger
 * /api/v1/users:
 *  get:
 *    summary: Get all users
 *    security:
 *      - bearerAuth: []  # Require Bearer token
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

/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *    summary: User login
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: Login successful
 *      400:
 *        description: Bad request
 */
userRoute.post("/login", LogIn);

/**
 * @swagger
 * /api/v1/users/signup:
 *  post:
 *    summary: User signup
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fullName:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      201:
 *        description: User created successfully
 *      400:
 *        description: Bad request
 */
userRoute.post("/signup", SignUp);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  put:
 *    summary: Update a user
 *    security:
 *      - bearerAuth: []  # Require Bearer token
 *    tags: [Users]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The user ID
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              fullName:
 *                type: string
 *              email:
 *                type: string
 *    responses:
 *      200:
 *        description: User updated successfully
 *      404:
 *        description: User not found
 */
userRoute.put('/:id', updateUser);

export default userRoute;
