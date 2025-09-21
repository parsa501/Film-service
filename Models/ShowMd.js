/**
 * @swagger
 * components:
 *   schemas:
 *     Show:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64f8a2c1234567890abcdee"
 *         filmId:
 *           type: string
 *           example: "64f8a2c1234567890abcdef"
 *           description: Reference to Film
 *         auditoriumId:
 *           type: string
 *           example: "64f8a2c1234567890abcdf0"
 *           description: Reference to Auditorium
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
 *           example: 200
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
import mongoose from "mongoose";
const showSchema = new mongoose.Schema(
  {
    filmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Film",
    },
    auditoriumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auditorium",
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Show = mongoose.model("Show", showSchema);
export default Show;
