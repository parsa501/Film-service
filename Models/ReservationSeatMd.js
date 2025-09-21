/**
 * @swagger
 * components:
 *   schemas:
 *     ReservationSeat:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64f8a2c1234567890abcdec"
 *         reservationId:
 *           type: string
 *           example: "64f8a2c1234567890abcdef"
 *           description: Reference to Reservation
 *         showId:
 *           type: string
 *           example: "64f8a2c1234567890abcdeb"
 *           description: Reference to Show
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
 *           example: "reserved"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
import mongoose from "mongoose";
const reservationSeatSchema = new mongoose.Schema(
  {
    reservationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },
    showId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
      required: true,
    },
    row: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    seatLabel: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["reserved", "cancelled"],
      default: "reserved",
    },
  },
  { timestamps: true }
);

const ReservationSeat = mongoose.model("ReservationSeat", reservationSeatSchema);
export default ReservationSeat;
