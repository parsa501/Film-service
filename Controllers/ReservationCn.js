import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Reservation from "../Models/ReservationMd.js";
import Show from "../Models/ShowMd.js";

export const create = catchAsync(async (req, res, next) => {
  const { showId, seats } = req.body;
  const userId = req.userId;

  const show = await Show.findById(showId);
  if (!show) return next(new HandleERROR("Show not found"));
  const conflicts = await Reservation.find({
    showId,
    status: { $ne: "cancelled" },
    $or: seats.map(s => ({
      seats: { $elemMatch: { row: s.row, number: s.number } }
    }))
  });

  if (conflicts.length > 0) {
    return next(new HandleERROR("Some seats are already reserved"));
  }
  const totalPrice = seats.length * show.price;
  const reservation = await Reservation.create({
    userId,
    showId,
    seats,
    totalPrice,
    status: "confirmed",
  });
  res.status(201).json({
    success: true,
    data: reservation,
    message: "Reservation created successfully",
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Reservation, req?.query, req?.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate("showId", "title startTime")
    .populate("userId", "username email");
  const result = await features.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Reservation, req?.query, req?.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate("showId", "title startTime")
    .populate("userId", "username email");

  const result = await features.execute();
  return res.status(200).json(result);
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const reservation = await Reservation.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!reservation) return next(new HandleERROR("Reservation not found"));

  return res.status(200).json({
    success: true,
    data: reservation,
  });
});

export const cancel = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const reservation = await Reservation.findById(id);
  if (!reservation) return next(new HandleERROR("Reservation not found"));
  reservation.status = "cancelled";
  await reservation.save();
  res.status(200).json({
    success: true,
    data: reservation,
    message: "Reservation cancelled successfully",
  });
});
