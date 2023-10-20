const TodoModel = require("../models/taskModel");

const getAllTodo = (req, res) => {
    TodoModel.find()
        .then((item) => res.json(item))
        .catch((err) => res.status(400).json("Error: " + err));
}

const delManyTodo = (req, res) => {
    TodoModel.deleteMany({ completed: true })
        .then(() => res.json("successfully deleted!"))
        .catch((err) => res.status(400).json("Error: " + err));
}

const getOneTodo = (req, res) => {
    TodoModel.findOne({ id: req.params.id })
        .then((item) => res.json(item))
        .catch((err) => res.status(400).json("Error: " + err));
}

const updateOneTodo = (req, res) => {
	TodoModel.findOneAndUpdate({ id: req.params.id }, { $set: req.body })
		.then(() => res.json("successfully updated!"))
		.catch((err) => res.status(400).json("Error: " + err));
};

const deleteOneTodo = (req, res) => {
	TodoModel.findOneAndDelete({ id: req.params.id })
		.then(() => res.json("deleted successfully!"))
		.catch((err) => res.status(400).json("Error: " + err));
};

const createTodo = (req, res) => {
	const id = req.body.id;
	const title = req.body.title;
	const completed = req.body.completed;

	const newTodo = new TodoModel({
		id,
		title,
		completed,
	});

	newTodo
		.save()
		.then((item) => res.json(item))
		.catch((err) => res.status(400).json("Error: " + err));
};


module.exports = {
	getAllTodo,
	delManyTodo, 
    updateOneTodo,
	getOneTodo,
	deleteOneTodo,
	createTodo,
};
