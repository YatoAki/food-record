const mongoose = require("mongoose")

const Schema = mongoose.Schema

const RatingSchema = new Schema({
    rating: {type:Number, required: true, min:0, max:5},
    people: {type:Number, min: 0},
    food: {type:Schema.Types.ObjectId, ref: "Food", required: true},
})

module.exports = mongoose.model("rating", RatingSchema);