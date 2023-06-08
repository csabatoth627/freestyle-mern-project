
const mongoose = require("mongoose");

const progBasics = require("./progBasics.json");
const progBasicsCardModel = require("../db/progBasicsCard.model");
const CardModel = require("../db/webCard.model");
const web = require("./web.json");



mongoose.connect("mongodb+srv://soskeksz115:jocoka420@freestlyetw.ljgy5fv.mongodb.net/").then(()=>{
  return main()
})


const webQuestionCards = async () => {
  await CardModel.deleteMany({});

  const webCards = web.web.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  console.log(webCards);

  await CardModel.create(...webCards);
  console.log("WebCards created");
};

const progBasicsQuestionCards = async () => {
    await progBasicsCardModel.deleteMany({});
  
    const progBasicsCards = progBasics.progBasics.map((item) => ({
      question: item.question,
      answer: item.answer,
    }));
  
    console.log(progBasicsCards);
  
    await progBasicsCardModel.create(...progBasicsCards);
    console.log("progBasicsCards created");
  };

  const main = ()=> {
    progBasicsQuestionCards();
    webQuestionCards();

  }
