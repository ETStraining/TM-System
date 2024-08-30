import express from 'express';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management for the Ticket Management System
 */

/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               
 *               email: 
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - phoneNumber
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/signup', (req, res) => {
  // Handle signup logic here
  res.status(201).json({ message: 'User registered successfully' });
});

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post('/login', (req, res) => {
  // Handle login logic here
  res.status(200).json({ message: 'Login successfully' });
});

// /**
//  * @swagger
//  * /api/v1/users:
//  *   get:
//  *     summary: Get a user by ID
//  *     tags: [Users]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The user ID
//  *     responses:
//  *       200:
//  *         description: User details retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 _id:
//  *                   type: string
//  *                   description: User ID
//  *                 FullName:
//  *                   type: string
//  *                   description: Full name of the user
//  *                 Email:
//  *                   type: string
//  *                   format: email
//  *                   description: Email address of the user
//  *                 TelphoneNumber:
//  *                   type: string
//  *                   description: Phone number of the user
//  *                 createdAt:
//  *                   type: string
//  *                   format: date-time
//  *                   description: Creation date of the user
//  *                 updatedAt:
//  *                   type: string
//  *                   format: date-time
//  *                   description: Last update date of the user
//  *       404:
//  *         description: User not found
//  *       500:
//  *         description: Internal server error
//  */
// router.get('/', (req, res) => {
//   const user = req.params;
//   // Handle fetch user logic here
//   res.status(200).json({ message: `Fetched user with ID ${user}` });
// });

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user's information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', (req, res) => {
  // Handle update user logic here
  res.status(200).json({ message: 'User updated successfully' });
});

export default router;
