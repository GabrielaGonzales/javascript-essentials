import * as authService from "../services/auth.service.js";

export function authenticate(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Debes iniciar sesion" });
  }

  const token = header.split(" ")[1];
  const user = authService.findUserByToken(token);

  if (!user) {
    return res.status(403).json({ message: "Token invalido" });
  }

  req.user = user;
  next();
}
