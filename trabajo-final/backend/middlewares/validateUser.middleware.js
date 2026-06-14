export default function validateUser(req, res, next) {
  const requiredFields = ["fullName", "password", "email", "age", "address", "phone"];
  const missingField = requiredFields.find(field => !req.body[field]);

  if (missingField) {
    return res.status(400).json({ message: `Falta el campo ${missingField}` });
  }

  next();
}
