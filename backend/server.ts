import dotenv from "dotenv";
dotenv.config();

import app from "./app";

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
