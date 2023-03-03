const mongoose = require("mongoose")

const Schema = mongoose.Schema

const StoreSchema = new Schema({
    name: {type:String, required: true, maxLength: 100},
    location: {type: Schema.Types.ObjectId, ref:"Location", required: true},
})

StoreSchema.virtual("url").get( function() {
    return `/store/${encodeURIComponent(this.name)}/${this._id}`
})

module.exports = mongoose.model("Store", StoreSchema);