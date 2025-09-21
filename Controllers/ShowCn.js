import ApiFeatures, { catchAsync } from "vanta-api";
import Show from "../Models/ShowMd.js";

export const create = catchAsync(async (req, res, next) => {
  const show = await Show.create(req.body);
  res.status(201).json({
    success: true,
    data: show,
  });
});
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Show, req?.query, req?.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Show, req?.query, req?.role)
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
  const show = await Show.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!show) return next(new HandleERROR("Show not found", 404));
  return res.status(200).json({
    success: true,
    data: show,
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const show = await Show.findByIdAndDelete(id);
  if (!show) {
    return next(new HandleERROR("Show not found", 404));
  }
  return res.status(200).json({
    success: true,
    data: null,
    message: "Show deleted successfully",
  });
});
