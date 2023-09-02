const authorize = (permittedRoles) => {
  return (req, res, next) => {
    if (permittedRoles.includes(req.role)) next();
    else res.status(401).json({ message: "Unauthorized" });
  };
};

module.exports = { authorize };
