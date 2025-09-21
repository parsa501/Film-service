/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Manage seat reservations for shows
 */

/**
 * @swagger
 * /api/reservation:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - showId
 *               - seats
 *             properties:
 *               showId:
 *                 type: string
 *                 example: "64f8a2c1234567890abcdef"
 *               seats:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - row
 *                     - number
 *                   properties:
 *                     row:
 *                       type: string
 *                       example: "A"
 *                     number:
 *                       type: integer
 *                       example: 1
 *                     seatLabel:
 *                       type: string
 *                       example: "VIP"
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Reservation'
 *                 message:
 *                   type: string
 *                   example: "Reservation created successfully"
 *       400:
 *         description: Some seats are already reserved or invalid input
 *       404:
 *         description: Show not found
 */

/**
 * @swagger
 * /api/reservation:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: List of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */

/**
 * @swagger
 * /api/reservation/{id}:
 *   get:
 *     summary: Get a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found
 */

/**
 * @swagger
 * /api/reservation/{id}:
 *   patch:
 *     summary: Update a reservation by ID (Admin only)
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seats:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     row:
 *                       type: string
 *                     number:
 *                       type: integer
 *                     seatLabel:
 *                       type: string
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, cancelled]
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found
 */

/**
 * @swagger
 * /api/reservation/cancel/{id}:
 *   patch:
 *     summary: Cancel a reservation by ID (User)
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Reservation'
 *                 message:
 *                   type: string
 *                   example: "Reservation cancelled successfully"
 *       404:
 *         description: Reservation not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64f8a2c1234567890abcdef"
 *         userId:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "64f8a2c1234567890abcdea"
 *             username:
 *               type: string
 *               example: "john_doe"
 *             email:
 *               type: string
 *               example: "john@example.com"
 *         showId:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "64f8a2c1234567890abcdff"
 *             title:
 *               type: string
 *               example: "Inception"
 *             startTime:
 *               type: string
 *               example: "2025-10-01T19:00:00.000Z"
 *         seats:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               row:
 *                 type: string
 *                 example: "A"
 *               number:
 *                 type: integer
 *                 example: 1
 *               seatLabel:
 *                 type: string
 *                 example: "VIP"
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled]
 *           example: confirmed
 *         totalPrice:
 *           type: number
 *           example: 150
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

import express from "express";
import isAdmin from "../Middleware/IsAdmin.js";
import isLogin from "../Middleware/IsLogin.js";
import { cancel, create, getAll, getOne, update } from "../Controllers/ReservationCn.js";

const reservationRouter = express.Router();

reservationRouter.route("/")
  .post(isLogin, create)
  .get(isLogin, getAll);

reservationRouter.route("/cancel/:id")
  .patch(isLogin, cancel);

reservationRouter.route("/:id")
  .patch(isAdmin, update)
  .get(isLogin, getOne);

export default reservationRouter;
