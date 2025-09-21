import ApiFeatures, { catchAsync } from "vanta-api";
import Auditorium from "../Models/AuditoriumMd.js";
export const create = catchAsync(async (req, res, next) => {
  const auditorium = await Auditorium.create(req.body);
  res.status(201).json({
    success: true,
    data: auditorium,
  });
});
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Auditorium, req?.query, req?.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Auditorium, req?.query, req?.role)
    .addManualFilters({ _id: req.params.id })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const auditorium = await Auditorium.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    data: auditorium,
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const auditorium = await Auditorium.findByIdAndDelete(id);
  if (!auditorium) {
    return next(new HandleERROR("Auditorium not found", 404));
  }
  return res.status(200).json({
    success: true,
    data: null,
    message: "Auditorium deleted successfully",
  });
});
