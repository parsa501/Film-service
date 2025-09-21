/**
 * @swagger
 * tags:
 *   name: Films
 *   description: Manage films
 */

/**
 * @swagger
 * /api/film:
 *   post:
 *     summary: Create a new film
 *     tags: [Films]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Inception"
 *               description:
 *                 type: string
 *                 example: "A mind-bending thriller"
 *               image:
 *                 type: string
 *                 example: "inception.png"
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Sci-Fi", "Thriller"]
 *     responses:
 *       201:
 *         description: Film created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Film'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/film:
 *   get:
 *     summary: Get all films
 *     tags: [Films]
 *     responses:
 *       200:
 *         description: List of films
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Film'
 */

/**
 * @swagger
 * /api/film/{id}:
 *   get:
 *     summary: Get a single film by ID
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Film ID
 *     responses:
 *       200:
 *         description: Film data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       404:
 *         description: Film not found
 */

/**
 * @swagger
 * /api/film/{id}:
 *   patch:
 *     summary: Update a film by ID
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Film ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Film updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       404:
 *         description: Film not found
 */

/**
 * @swagger
 * /api/film/{id}:
 *   delete:
 *     summary: Delete a film by ID
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Film ID
 *     responses:
 *       200:
 *         description: Film deleted successfully
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
 *                   example: "Film deleted successfully"
 *       404:
 *         description: Film not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Film:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64f8a2c1234567890abcdef"
 *         title:
 *           type: string
 *           example: "Inception"
 *         description:
 *           type: string
 *           example: "A mind-bending thriller"
 *         image:
 *           type: string
 *           example: "inception.png"
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Sci-Fi", "Thriller"]
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
import { create, getAll, getOne, remove, update } from "../Controllers/FilmCn.js";

const filmRouter = express.Router();

filmRouter.route("/")
  .post(isAdmin, create)
  .get(isLogin, getAll);

filmRouter.route("/:id")
  .patch(isAdmin, update)
  .get(isLogin, getOne)
  .delete(isAdmin, remove);

export default filmRouter;
