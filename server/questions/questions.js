
const mongoose = require("mongoose");



const CardModel = require("../db/webCard.model");

const questions = require("./questions.json")





mongoose.connect("mongodb+srv://csabi627:CsabInez9195@cluster0.bakktz0.mongodb.net/").then(() => {

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
