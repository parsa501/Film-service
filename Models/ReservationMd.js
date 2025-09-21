
/**
 * @swagger
 * components:
 *   schemas:
 *     SeatItem:
 *       type: object
 *       properties:
 *         row:
 *           type: string
 *           example: "A"
 *         number:
 *           type: integer
 *           example: 1
 *         seatLabel:
 *           type: string
 *           example: "VIP1"
 *
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
 *               example: "64f8a2c1234567890abcdeb"
 *             title:
 *               type: string
 *               example: "Inception"
 *             startTime:
 *               type: string
 *               format: date-time
 *               example: "2025-10-01T19:00:00.000Z"
 *         seats:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SeatItem'
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled]
 *           example: "confirmed"
 *         totalPrice:
 *           type: number
 *           example: 300
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
import mongoose from "mongoose";
const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    showId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
    },
    seats: [
      {
        row: { type: String },
        number: { type: Number },
        seatLabel: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
