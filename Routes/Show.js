/**
 * @swagger
 * tags:
 *   name: Shows
 *   description: Manage movie showings
 */

/**
 * @swagger
 * /api/show:
 *   post:
 *     summary: Create a new show
 *     tags: [Shows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - filmId
 *               - auditoriumId
 *               - startTime
 *               - endTime
 *               - price
 *             properties:
 *               filmId:
 *                 type: string
 *                 example: "64f8a2c1234567890abcdff"
 *               auditoriumId:
 *                 type: string
 *                 example: "64f8a2c1234567890abcdef"
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-01T19:00:00.000Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-01T21:30:00.000Z"
 *               price:
 *                 type: number
 *                 example: 150
 *     responses:
 *       201:
 *         description: Show created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Show'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/show:
 *   get:
 *     summary: Get all shows
 *     tags: [Shows]
 *     responses:
 *       200:
 *         description: List of shows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Show'
 */

/**
 * @swagger
 * /api/show/{id}:
 *   get:
 *     summary: Get a single show by ID
 *     tags: [Shows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Show ID
 *     responses:
 *       200:
 *         description: Show data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Show'
 *       404:
 *         description: Show not found
 */

/**
 * @swagger
 * /api/show/{id}:
 *   patch:
 *     summary: Update a show by ID (Admin only)
 *     tags: [Shows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Show ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filmId:
 *                 type: string
 *               auditoriumId:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Show updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Show'
 *       404:
 *         description: Show not found
 */

/**
 * @swagger
 * /api/show/{id}:
 *   delete:
 *     summary: Delete a show by ID (Admin only)
 *     tags: [Shows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Show ID
 *     responses:
 *       200:
 *         description: Show deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: "Show deleted successfully"
 *       404:
 *         description: Show not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Show:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64f8a2c1234567890abcdef"
 *         filmId:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "64f8a2c1234567890abcdff"
 *             title:
 *               type: string
 *               example: "Inception"
 *         auditoriumId:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "64f8a2c1234567890abcdef"
 *             title:
 *               type: string
 *               example: "Main Hall"
 *         startTime:
 *           type: string
 *           format: date-time
 *           example: "2025-10-01T19:00:00.000Z"
 *         endTime:
 *           type: string
 *           format: date-time
 *           example: "2025-10-01T21:30:00.000Z"
 *         price:
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
import { create, getAll, getOne, remove, update } from "../Controllers/ShowCn.js";

const showRouter = express.Router();

showRouter.route("/")
  .post(isAdmin, create)
  .get(isLogin, getAll);

showRouter.route("/:id")
  .patch(isAdmin, update)
  .get(isLogin, getOne)
  .delete(isAdmin, remove);

export default showRouter;
