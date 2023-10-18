const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
	mongoose.connect(process.env.MONGO_URL);

	mongoose.connection.on("connected", () => {
		console.log("Connected to MongoDB Successfully");
	});

	mongoose.connection.on("error", (err) => {
		console.log("An error occurred while connecting to MongoDB");
		console.log(err);
	});
};

module.exports = {
	connectMongo,
};
