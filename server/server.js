
require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const CardModel = require("./db/webCard.model");

const mongoUrl = process.env.MONGO_URL;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});



app.use(express.json());

app.get("/api/cards", async (req, res) => {
  const query = req.query.topic
  try {
    const cards = await CardModel.find({ topic: query });
   
    if (cards.length === 0) {
      // Ha nem talál kártyát a lekérdezett témával, akkor hibaüzenetet küldünk vissza
      res.status(404).json([{question: "You have no favourite cards"}]);
    } else {
      // Ha talált kártyákat, akkor azokat küldjük vissza
      res.json(cards);
    }


  } catch (error) {
    res.status(500).json({ succes: false, error: "Failed to fetch progcards" });
  }
});



app.get("/api/card/:id", async (req, res) => {
  const id = req.params.id

  try {
    const card = await CardModel.findOne({ _id: id })
    res.json(card);

  } catch (error) {
    res.status(500).json({ succes: false, error: "Failed to fetch card" });
  }
});

app.post("/api/card", async (req, res, next) => {
  const card = req.body
  const question = req.body.question
  const topic = req.body.topic
  try {
    const existQuestion = await CardModel.findOne({ question: question,topic:topic });
    if (existQuestion) {
      return res.status(400).json({ success: false, message: 'The question exists.' });
    }
    const saved = await CardModel.create(card);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
})


app.patch("/api/card/:id", async (req, res) => {
  const comment = req.body.title;
  const id = req.params.id;

  try {
    const card = await CardModel.findByIdAndUpdate(id, { comment: comment }, { new: true });
    res.json(card);
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update card" });
  }
});



app.delete("/api/card/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await CardModel.deleteOne({ _id: id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete card" });
  }
});





mongoose.connect(mongoUrl ).then(() => {

  console.log("Connected to DB");
  app.listen(3000, () => {
    console.log("Server listen on port 3000");
  });
})


