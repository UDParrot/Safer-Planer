const { gql } = require("apollo-server");

module.exports = gql`
	type User{
		id: ID!
		email: String!
		token: String!
		username: String!
		createdAt: String!
		friends:[String]
	}

	type Arrangement{
		userID: ID!
		long: String!  
		lait: String!
		address: String!
		time: Int!
		username: String!
		year: Int!
		month: Int!
		day: Int!
	}

	type Location {
		long: String
		lait: String
		address: String
	}

	input RegisterInput{
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}

	input Input {
		username: String!
		long: String!
		lait: String!
		address: String!
		time: Int!
		year: Int!
		month: Int!
		day: Int!
	}

	type Query{
		getUserInfo: User!
		countUsers: Int!
		getUsers: [User]

		getAllArrangements: [Arrangement]!
		getArrangementsOfPerson(username: String): [Arrangement]!
		getArrangementsOfLocation(long: String, lait: String): [Arrangement]!
		getCountOfLocationAtTime(long: String, lait: String, time: Int, year: Int, month: Int, day: Int): Int!
		getAddress(address: String): Location!

		getAllLocations: [Location]!
	}

	type Mutation{
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!
		deleteUser(username: String!): User!
		deleteAllUsers: Int!
		addFriend(username: String!): String!

		makeArrangement(long: String, lait: String, address: String, time: Int, year: Int, month: Int, day: Int):Arrangement!
		makeArrangementNoAuth(input: Input):Arrangement!
		deleteAllArrangements: Int!

		addLocation(long: String, lait: String, address: String): Location!
	}





`