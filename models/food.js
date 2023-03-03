const mongoose = require("mongoose")

const Schema = mongoose.Schema

const FoodSchema = new Schema({
    name: {type:String, required: true, maxLength: 100},
    price: {type:Number, required: true},
    store: {type:Schema.Types.ObjectId, ref: "Store", required: true},
})

FoodSchema.virtual("url").get( function() {
    return `/food/${encodeURIComponent(this.name)}/${this._id}`
})

module.exports = mongoose.model("Food", FoodSchema);