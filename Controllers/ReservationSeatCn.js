import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import ReservationSeat from "../Models/ReservationSeatMd.js";
import Show from "../Models/ShowMd.js";

export const create = catchAsync(async (req, res, next) => {
  const { reservationId, showId, seats } = req.body;
  if (!seats || seats.length === 0)
    return next(new HandleERROR("No seats provided"));
  const show = await Show.findById(showId);
  if (!show) return next(new HandleERROR("Show not found"));
  const conflicts = await ReservationSeat.find({
    showId,
    status: "reserved",
    $or: seats.map((s) => ({ row: s.row, number: s.number })),
  });

  if (conflicts.length > 0) {
    return next(new HandleERROR("Some of the seats are already reserved"));
  }
  const createdSeats = await ReservationSeat.insertMany(
    seats.map((s) => ({
      reservationId,
      showId,
      row: s.row,
      number: s.number,
      seatLabel: s.seatLabel || `${s.row}${s.number}`,
      price: show.price,
      status: "reserved",
    }))
  );
  res.status(201).json({
    success: true,
    data: createdSeats,
    message: "Seats reserved successfully",
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(ReservationSeat, req?.query, req?.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate("showId", "title startTime")
    .populate({
      path: "reservationId",
      select: "userId",
      populate: { path: "userId", select: "username email" },
    });
  const result = await features.execute();
  return res.status(200).json(result);
});

export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(ReservationSeat, req?.query, req?.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate("showId", "title startTime")
    .populate({
      path: "reservationId",
      select: "userId",
      populate: { path: "userId", select: "username email" },
    });

  const result = await features.execute();
  return res.status(200).json(result);
});

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const seat = await ReservationSeat.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!seat) return next(new HandleERROR("Seat not found"));

  res.status(200).json({
    success: true,
    data: seat,
  });
});

export const cancel = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const seat = await ReservationSeat.findById(id);
  if (!seat) return next(new HandleERROR("Seat not found"));
  seat.status = "cancelled";
  await seat.save();
  res.status(200).json({
    success: true,
    data: seat,
    message: "Seat cancelled successfully",
  });
});
