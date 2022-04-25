const PORT = 8000;
const axios = require("axios");
const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const url = process.env.URL;

app.get("/", (req, res) => {
  res.json("this works");
});

app.get("/scores", (req, res) => {
  const options = {
    method: "GET",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token": process.env.ASTRA_TOKEN,
    },
  };
  axios(`${url}?page-size=20`, options)
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(500).json({ message: err }));
});

app.post("/addscore", (req, res) => {
  const bodyContent = req.body;

  const options = {
    method: "POST",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token": process.env.ASTRA_TOKEN,
    },
    data: bodyContent,
  };
  axios(url, options)
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(500).json({ message: err }));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
