const mongoose = require("mongoose");

const { Schema } = mongoose;

const CardSchema = new Schema({ 
    topic: String,
    question: String,
    answer: String,
    comment: String
});

module.exports = mongoose.model("Card", CardSchema);
