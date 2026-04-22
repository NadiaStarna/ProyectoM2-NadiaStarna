export const validateAuthor = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      error: "El nombre es obligatorio"
    });
  }

  if (!email || email.trim() === "") {
    return res.status(400).json({
      error: "El email es obligatorio"
    });
  }

  const emailClean = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailClean)) {
    return res.status(400).json({
      error: "El email es inválido"
    });
  }

  next();
};