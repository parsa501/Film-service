/**
 * @swagger
 * components:
 *   schemas:
 *     Seat:
 *       type: object
 *       properties:
 *         row:
 *           type: string
 *           example: "A"
 *           description: Row of the seat
 *         number:
 *           type: integer
 *           example: 1
 *           description: Seat number
 *         label:
 *           type: string
 *           example: "VIP1"
 *           description: Optional label for the seat
 *         isAvailable:
 *           type: boolean
 *           example: true
 *           description: Whether the seat is available
 *
 *     Auditorium:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64f8a2c1234567890abcdef"
 *         title:
 *           type: string
 *           example: "Main Hall"
 *         seats:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Seat'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
import mongoose from "mongoose";
const SeatSchema = new mongoose.Schema({
  row: {
    type: String,
    required: [true, "row is required"],
  },
  number: {
    type: Number,
    required: [true, "number is required"],
  },
  label: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const AuditoriumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      unique: [true, "title must be unique"],
    },
    seats: [SeatSchema],
  },
  { timestamps: true }
);

const Auditorium = mongoose.model("Auditorium", AuditoriumSchema);
export default Auditorium;
