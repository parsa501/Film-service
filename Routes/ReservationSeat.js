/**
 * @swagger
 * tags:
 *   name: ReservationSeats
 *   description: Manage reserved seats for shows
 */

/**
 * @swagger
 * /api/seat:
 *   post:
 *     summary: Reserve seats for a show
 *     tags: [ReservationSeats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reservationId
 *               - showId
 *               - seats
 *             properties:
 *               reservationId:
 *                 type: string
 *                 example: "64f8a2c1234567890abcdef"
 *               showId:
 *                 type: string
 *                 example: "64f8a2c1234567890abcdff"
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
 *                       example: "VIP1"
 *     responses:
 *       201:
 *         description: Seats reserved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ReservationSeat'
 *                 message:
 *                   type: string
 *                   example: "Seats reserved successfully"
 *       400:
 *         description: No seats provided / Some seats are already reserved
 *       404:
 *         description: Show not found
 */

/**
 * @swagger
 * /api/seat:
 *   get:
 *     summary: Get all reserved seats
 *     tags: [ReservationSeats]
 *     responses:
 *       200:
 *         description: List of reserved seats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReservationSeat'
 */

/**
 * @swagger
 * /api/seat/{id}:
 *   get:
 *     summary: Get a reserved seat by ID
 *     tags: [ReservationSeats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ReservationSeat ID
 *     responses:
 *       200:
 *         description: Seat data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReservationSeat'
 *       404:
 *         description: Seat not found
 */

/**
 * @swagger
 * /api/seat/{id}:
 *   patch:
 *     summary: Update a reserved seat by ID (Admin only)
 *     tags: [ReservationSeats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ReservationSeat ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               row:
 *                 type: string
 *               number:
 *                 type: integer
 *               seatLabel:
 *                 type: string
 *               price:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [reserved, cancelled]
 *     responses:
 *       200:
 *         description: Seat updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReservationSeat'
 *       404:
 *         description: Seat not found
 */

/**
 * @swagger
 * /api/seat/cancel/{id}:
 *   patch:
 *     summary: Cancel a reserved seat by ID (User)
 *     tags: [ReservationSeats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ReservationSeat ID
 *     responses:
 *       200:
 *         description: Seat cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ReservationSeat'
 *                 message:
 *                   type: string
 *                   example: "Seat cancelled successfully"
 *       404:
 *         description: Seat not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReservationSeat:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64f8a2c1234567890abcdef"
 *         reservationId:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "64f8a2c1234567890abcd12"
 *             userId:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64f8a2c1234567890abcdea"
 *                 username:
 *                   type: string
 *                   example: "john_doe"
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
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
 *         row:
 *           type: string
 *           example: "A"
 *         number:
 *           type: integer
 *           example: 1
 *         seatLabel:
 *           type: string
 *           example: "VIP1"
 *         price:
 *           type: number
 *           example: 150
 *         status:
 *           type: string
 *           enum: [reserved, cancelled]
 *           example: reserved
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
import { cancel, create, getAll, getOne, update } from "../Controllers/ReservationSeatCn.js";

const seatRouter = express.Router();

seatRouter.route("/")
  .post(isLogin, create)
  .get(isLogin, getAll);

seatRouter.route("/cancel/:id")
  .patch(isLogin, cancel);

seatRouter.route("/:id")
  .patch(isAdmin, update)
  .get(isLogin, getOne);

export default seatRouter;
