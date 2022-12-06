import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "secret", (error, decodedToken) => {
      if (error) {
        console.log(error.message);
        res.status(400).json({ error: "Not authorized" });
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(400).json({ error: "Not logged in" });
  }
};

export default requireAuth;
