import express from "express";
import contactosController from "./controllers/contactosController.js";
import fs from "node:fs";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const html = await fs.promises.readFile("index.html", "utf8");
  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

app.get("/styles.css", async (req, res) => {
  const css = await fs.promises.readFile("styles.css", "utf8");
  res.setHeader("Content-Type", "text/css");

  res.send(css);
});

app.post("/addForm", async (req, res) => {
  await contactosController.createComment(req, res);
});

app.get("/comments", async (req, res) => {
  await contactosController.getComments(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
