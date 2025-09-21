import ApiFeatures, { catchAsync } from "vanta-api";
import Film from "../Models/FilmMd.js";
import fs from "fs"
export const create = catchAsync(async (req, res, next) => {
  const film = await Film.create(req.body);
  res.status(201).json({
    success: true,
    data: film,
  });
});
export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Film, req?.query, req?.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});
export const getOne = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Film, req?.query, req?.role)
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
  const film = await Film.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    success: true,
    data: film,
  });
});
export const remove = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const film = await Film.findByIdAndDelete(id);
  if (!film) {
    return next(new HandleERROR("Film not found", 404));
  }
  if (film?.image) {
    fs.unlinkSync(`${__dirname}/Public/Uploads/${film.image}`);
  }
  return res.status(200).json({
    success: true,
    data: null,
    message: "Film deleted successfully",
  });
});
