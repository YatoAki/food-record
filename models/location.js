const mongoose = require("mongoose")

const Schema = mongoose.Schema

const LocationSchema = new Schema({
    name: {type:String, required: true, maxLength: 100},
})

LocationSchema.virtual("url").get( function() {
    return `/location/${encodeURIComponent(this.name)}/${this._id}`
})

module.exports = mongoose.model("Location", LocationSchema);