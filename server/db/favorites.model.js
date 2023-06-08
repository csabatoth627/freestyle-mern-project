const mongoose = require("mongoose");

const { Schema } = mongoose;

const FavoriteSchema = new Schema({ 
    question: String,
    answer: String,
    comment: String,
    
});


module.exports = mongoose.model("Favorite", FavoriteSchema);