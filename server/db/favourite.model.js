const mongoose = require("mongoose");

const { Schema } = mongoose;

const FavouriteSchema = new Schema({ 
    topic: String,
    question: String,
    answer: String,
    comment: String
});

module.exports = mongoose.model("Favourite", FavouriteSchema);