"use strict";
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.set("port", process.env.PORT || 3001);


app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express!" });
});
app.use(express.static(path.join(__dirname, '../')));
app.use('*',  (req, res)=> {
 res.sendFile(path.join(__dirname, '../', 'index.html'));
});

app.listen(app.get("port"), function () {
  console.log("listening");
});
