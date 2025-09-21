/**
 * @swagger
 * tags:
 *   name: Auditoriums
 *   description: Manage cinema auditoriums
 */

/**
 * @swagger
 * /api/auditorium:
 *   post:
 *     summary: Create a new auditorium
 *     tags: [Auditoriums]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - seats
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Main Hall"
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
 *                     label:
 *                       type: string
 *                       example: "VIP"
 *                     isAvailable:
 *                       type: boolean
 *                       example: true
 *     responses:
 *       201:
 *         description: Auditorium created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Auditorium'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/auditorium:
 *   get:
 *     summary: Get all auditoriums
 *     tags: [Auditoriums]
 *     responses:
 *       200:
 *         description: List of auditoriums
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Auditorium'
 */

/**
 * @swagger
 * /api/auditorium/{id}:
 *   get:
 *     summary: Get a single auditorium by ID
 *     tags: [Auditoriums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Auditorium ID
 *     responses:
 *       200:
 *         description: Auditorium data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auditorium'
 *       404:
 *         description: Auditorium not found
 */

/**
 * @swagger
 * /api/auditorium/{id}:
 *   patch:
 *     summary: Update an auditorium by ID
 *     tags: [Auditoriums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Auditorium ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               seats:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     row:
 *                       type: string
 *                     number:
 *                       type: integer
 *                     label:
 *                       type: string
 *                     isAvailable:
 *                       type: boolean
 *     responses:
 *       200:
 *         description: Auditorium updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auditorium'
 *       404:
 *         description: Auditorium not found
 */

/**
 * @swagger
 * /api/auditorium/{id}:
 *   delete:
 *     summary: Delete an auditorium by ID
 *     tags: [Auditoriums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Auditorium ID
 *     responses:
 *       200:
 *         description: Auditorium deleted successfully
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
 *                   example: "Auditorium deleted successfully"
 *       404:
 *         description: Auditorium not found
 */

import express from "express";
import isAdmin from "../Middleware/IsAdmin.js";
import isLogin from "../Middleware/IsLogin.js";
import { create, getAll, getOne, remove, update } from "../Controllers/AuditoriumCn.js";

const auditoriumRouter = express.Router();

auditoriumRouter.route("/")
  .post(isAdmin, create)
  .get(isLogin, getAll);

auditoriumRouter.route("/:id")
  .patch(isAdmin, update)
  .get(isLogin, getOne)
  .delete(isAdmin, remove);

export default auditoriumRouter;
