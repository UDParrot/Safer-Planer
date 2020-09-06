const usersResolvers = require("./users");
const arrangementResolvers = require("./arrangement");
const locationResolvers = require("./location");
module.exports = {
	Query: {
		...usersResolvers.Query,
		...arrangementResolvers.Query,
		...locationResolvers.Query
	},
	Mutation: {
		...usersResolvers.Mutation,
		...arrangementResolvers.Mutation,
		...locationResolvers.Mutation
	}
}