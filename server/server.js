

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const webCardModel = require("./db/webCard.model");
const progCardModel = require("./db/progBasicsCard.model");

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

app.get("/api/progcards", async (req, res) => {
  try {
    const progCards = await progCardModel.find();
    res.json(progCards);
    
  } catch (error) {
    res.status(500).json({ succes: false, error: "Failed to fetch progcards" });
  }
});

app.get("/api/webcards", async (req, res) => {
  try {
    const webCards = await webCardModel.find();
    res.json(webCards);
    
  } catch (error) {
    res.status(500).json({ succes: false, error: "Failed to fetch webcards" });
  }
});


app.get("/api/webcards/:id", async (req, res) => {
  const id = req.params.id
  
  try {
    const card = await webCardModel.findOne({ _id: id })
    res.json(card);
    
  } catch (error) {
    res.status(500).json({ succes: false, error: "Failed to fetch webcard" });
  }
});

app.get("/api/progcards/:id", async (req, res) => {
  const id = req.params.id
  
  try {
    const card = await progCardModel.findOne({ _id: id })
    res.json(card);
    
  } catch (error) {
    res.status(500).json({ succes: false, error: "Failed to fetch progcard" });
  }
});

//add the comment

app.patch("/api/webcards/:id", async (req, res) => {
  const comment = req.body.title;
  const id = req.params.id;

  try {
    const card = await webCardModel.findByIdAndUpdate(id, { comment: comment }, { new: true });
    res.json(card);
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update card" });
  }
});

app.patch("/api/progcards/:id", async (req, res) => {
  const comment = req.body.title;
  const id = req.params.id;

  try {
    const card = await progCardModel.findByIdAndUpdate(id, { comment: comment }, { new: true });
    res.json(card);
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update card" });
  }
});

//out of deck

app.delete("/api/progcards/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await progCardModel.deleteOne({ _id: id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete card" });
  }
});

app.delete("/api/webcards/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await webCardModel.deleteOne({ _id: id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete card" });
  }
});



mongoose.connect("").then(()=>{
  console.log("Connected to DB");
  app.listen("3000", () => {
    console.log("Server listen on port 3000");
  });
})


