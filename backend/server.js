import express from "express";

const app = express();

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend running " });
});

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
