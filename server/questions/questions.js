require('dotenv').config({ path: '../.env' });
const mongoose = require("mongoose");
const CardModel = require("../db/webCard.model");
const questions = require("./questions.json")


const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}






const populateCard = async () => {
  await CardModel.deleteMany({});

  const cards = questions.map((question) => ({
    topic: question.topic,
    question: question.question,
    answer: question.answer,
  }));



  await CardModel.create(...cards);
  console.log("Cards created");
};


const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateCard();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
