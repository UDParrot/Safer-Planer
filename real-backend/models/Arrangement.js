 const {model, Schema} = require("mongoose");

 const arrangementSchema = new Schema({
 	username: String,
 	long: String,
 	lait: String,
 	address: String,
 	time: Number,
	year: Number,
	month: Number,
	day: Number
 })

 module.exports = model("Arrangement", arrangementSchema);