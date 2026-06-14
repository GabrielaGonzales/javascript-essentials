export default function validateBook(req, res, next) {
  const requiredFields = [
    "title",
    "description",
    "author",
    "category",
    "language",
    "year",
    "publisher",
    "price",
    "currency"
  ];
  const missingField = requiredFields.find(field => req.body[field] === undefined || req.body[field] === "");

  if (missingField) {
    return res.status(400).json({ message: `Falta el campo ${missingField}` });
  }

  if (Number(req.body.price) < 0 || Number(req.body.year) < 0) {
    return res.status(400).json({ message: "Precio y anio deben ser positivos" });
  }

  next();
}
