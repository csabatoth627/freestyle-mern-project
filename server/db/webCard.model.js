const mongoose = require("mongoose");

const { Schema } = mongoose;

const CardSchema = new Schema({ 
    question: String,
    answer: String,
    comment: String
});

module.exports = mongoose.model("Webcard", CardSchema);
