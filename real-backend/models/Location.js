const {model, Schema} = require("mongoose");

const locationSchema = new Schema({
    long: String,
    lait: String,
    address: String,
})
module.exports = model("Location", locationSchema);