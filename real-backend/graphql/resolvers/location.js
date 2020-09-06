const {UserInputError} = require("apollo-server");
// const {validateRegisterInput, validateLoginInput} = require("../../Utils/validators")
const Location = require("../../models/Location");


module.exports = {
	Query: {
		async getAllLocations() {
			const locations = await Location.find();
			return locations;
		},

		async getAddress(_, {address}) {
			const location = await Location.find({address: { $eq: address }});
			return location[0];
		}
	},


	Mutation: {
		async addLocation(_, { long, lait, address }) {
			const existed = await Location.find({ long, lait });
			if (existed.length > 0) {
				throw new UserInputError("Cannot add duplicate location");
			}
			const location = new Location({
				long,
				lait,
				address
			});
			const res = await location.save();
			return location;
		}

	},
}


