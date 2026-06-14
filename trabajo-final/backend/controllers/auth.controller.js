import * as authService from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const session = await authService.register(req.body);
  res.status(201).json({ success: true, data: session });
});

export const login = asyncHandler(async (req, res) => {
  const session = await authService.login(req.body);
  res.json({ success: true, data: session });
});

export const profile = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.user });
});
