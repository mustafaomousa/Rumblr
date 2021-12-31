const express = require("express");
const router = express.Router();

const apiRouter = require("./api");

router.use("/api", apiRouter);

//serving react build files in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");

  router.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());

    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });

  router.use(express.static(path.resolve("../frontend/build")));

  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());

    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });
}

if (process.env.NODE_ENV !== "production") {
  router.get("/api/csrf/restore", (req, res) => {
    const token = req.csrfToken();
    res.cookie("XSRF-TOKEN", token);
    return res.json({ csrfToken: token });
  });
}

module.exports = router;
