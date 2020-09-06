const {UserInputError} = require("apollo-server");
const {validateArrangementInput} = require("../../Utils/validators")
const User = require("../../models/User");
const Arrangement = require("../../models/Arrangement");
const Location = require("../../models/Location");

const checkAuth = require('../../Utils/check-auth');
// TODO: get arrangements at a location at a given time

module.exports = {
	Query: {
		async getAllArrangements() {
			const arrangements = await Arrangement.find();
			return arrangements;
		},

		async getArrangementsOfLocation(_, { long, lait }) {
			const arrangements = await Arrangement.find({ long, lait });
			return arrangements;
		},

		async getArrangementsOfPerson(_, { username }) {
			const arrangements = await Arrangement.find({username: { $eq: username }});
			return arrangements;
		},

		async getCountOfLocationAtTime(_, { long, lait, time, year, month, day }) {
			const arrangements = await Arrangement.find({ $and: [{long: long}, {lait: lait}, {time: time}, {year: year}, {month: month}, {day: day}]});
			return arrangements.length;
		}
	},


	Mutation: {
		async makeArrangement(_, {long, lait, address, time, year, month, day }, context) {
			const user = checkAuth(context);
			if (time < 0 || time > 23 || !Number.isInteger(time)) {
				errors.timeRange = "Time should be an Integer from 0 to 23";
			}

			const locationExist = await Location.find({ long, lait });
			if (locationExist.length < 1){
				errors.location = "Location does not exist";
			}

			// if(!Object.keys(errors).length < 1){
			// 	throw new UserInputError("Errors", {errors})
			// }

			const arrangement = new Arrangement({
				long,
				lait,
				address,
				time,
				year,
				month,
				day,
				username:user.username
			})

			const res = await arrangement.save();
			return {
				...res._doc,
				userID:user.id
			}
		},

		async makeArrangementNoAuth(parent, {input: {username, long, lait, address, time, year, month, day }}, context, info) {
			const arrangement = new Arrangement({
				long,
				lait,
				address,
				time,
				year,
				month,
				day,
				username
			});
			const res = await arrangement.save();
			return {
				...res._doc,
				userID:res.id
			}
		},

		async deleteAllArrangements() {
			const count = await Arrangement.estimatedDocumentCount();
			await Arrangement.deleteMany({});
			return count;
		}

	},


}


