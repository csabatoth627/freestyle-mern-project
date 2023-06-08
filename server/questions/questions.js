
const mongoose = require("mongoose");



const CardModel = require("../db/card.model");

const questions = require("./questions.json")



mongoose.connect("").then(() => {
  return main()
})


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


const main = () => {
populateCard()

}
