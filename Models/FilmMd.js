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
 *           example: "A mind-bending thriller by Christopher Nolan"
 *         image:
 *           type: string
 *           example: "1692975812345-inception.png"
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
import mongoose from "mongoose";
const filmSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "film title is required"],
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    genres: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Film = mongoose.model("Film", filmSchema);
export default Film;
