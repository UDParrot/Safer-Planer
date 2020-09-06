const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {UserInputError} = require("apollo-server")

const {validateRegisterInput, validateLoginInput} = require("../../Utils/validators")
const {SECRET_KEY} = require("../../config");
const User = require("../../models/User");
const checkAuth = require('../../Utils/check-auth'); 



function generateToken(user){
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		}, 
		SECRET_KEY,
		{ expiresIn: "1h"}
	);
}


module.exports = {
	Query: {
		async countUsers(){
				const count = await User.estimatedDocumentCount()
				return count
		},
		async getUsers(){
				const users = await User.find()
				return users
		},

		async getUserInfo(_, {}, context) {
			const user = checkAuth(context);
			return user;
		}
	},


	Mutation: {
		async login(parent, {username, password}, context, info){
			const {errors, valid} = validateLoginInput(username, password);
			if(!valid){throw new UserInputError("Errors", {errors})}
			const user = await User.findOne({username});
			if(!user){
				errors.general = "user not found";
				throw new UserInputError("user not found", {errors});
			}
			const match = await bcrypt.compare(password, user.password)
			if(!match){
				errors.general = "Wrong crendetials";
				throw new UserInputError("Wrong crendetials", {errors});
			}
			const token = generateToken(user);
			return {
				...user._doc,
				id: user.id,
				token
			};
		},

		async register(
			parent, 
			{registerInput: {username, email, password, confirmPassword}}, 
			context, 
			info
			){
			//Validate user data
			const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword)
			if(!valid){throw new UserInputError("Errors", {errors});}
			console.log(username);
			//Make sure user doesn't already exist
			const user = await User.findOne({username});
			if (user){
				throw new UserInputError("Username is taken",
				{
					errors:{username: "This username is taken"}
				})
			}

			//hash password and create an auth token
			password = await bcrypt.hash(password, 12);
			const newUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString()
			})
			const res = await newUser.save()
			const token = generateToken(res);
			return {
				...res._doc,
				id: res.id,
				token
			}
		},

		async deleteUser(parent, {username}, context, info){
			const user = await User.findOne({username})
			const deletedUser = await User.deleteOne({username})
			if (deletedUser.deletedCount<1) {
				throw new UserInputError("User Does not exist");
			}
			const token = generateToken(user)
			return {
				...user._doc,
				id: user.id,
				token
			}
		},

		async deleteAllUsers(parent, username, context, info){
			const count = await User.estimatedDocumentCount()
			await User.deleteMany({})
			return count
		},


		async addFriend(_, {username}, context){
			const myUsername = checkAuth(context).username
			const friend = await User.findOne({username})
			if(!friend){
				throw new UserInputError("User does not exist")
			}
			const user = await User.findOne({username:myUsername})
			if (user.friends.includes(username)){
				throw new UserInputError("Friend exist")
			}
			user.friends = [username]
			const res = await user.save()
			return username
		}
	},




}


