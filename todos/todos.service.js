const TodoModel = require("../models/todoModel");

const createTodo = async (user, req_body) => {
    try {
        if (!req_body) {
            return {
                statusCode: 422,
                message: "Add a Todo already!",
                success: false,
            };
        }

        const newTodo = await TodoModel.create({
            title: req_body.title,
            userId: user._id,
        });

        return {
            message: "Todo successfully created",
            statusCode: 201,
            success: true,
            newTodo,
        };
    }
    catch(err) {
        return {
            message:
                "Something went wrong while creating. Go back to your dashboard",
            err,
            statusCode: 409,
            success: false,
        };
    }
};

const deleteTodo = async (user, req_id) => {
	try {
		if (!req_id) {
			return {
				statusCode: 422,
				message: "No task to Delete",
				success: false,
			};
		}

		const deleteTodo = await TodoModel.findByIdAndDelete({
			_id: req_id._id,
		});

        console.log(deleteTodo);

		if (!deleteTodo) {
			return {
				statusCode: 406,
				message: "Unable to delete Todo",
				success: false,
			};
		}

		const TodoList = await TodoModel.find({ userId: user._id });

		return {
			statusCode: 200,
			message: "Todo deleted successfully",
			success: true,
			TodoList,
		};

	} catch (err) {
		console.log("del error: ", err);
		return {
			statusCode: 409,
			message: "Something went wrong with deleting the todo, try again later.",
			err,
			success: false,
		};
	}
};

const getTodo = async (user) => {
    try {
        const todo = await TodoModel.find({ userId: user._id });

        console.log("my todo", todo);

        if (!user) {
            return {
                statusCode: 404,
                message: "You are an Unauthorized User",
            };
        }

        if (todo.length === 0) {
            return {
                statusCode: 404,
                message: "There are no Todo's",
                todo: null,
            };
        }

        if (todo.length != 0) {
        console.log("chelsea");
            return {
                statusCode: 200,
                message: null,
                todo,
                user,
            };
        }
    } catch (error) {
        return {
            statusCode: 409,
            message:
                "Something went wrong with getting the todo list, try again later.",
            error,
            success: false,
        };
    }
}

const updateTodo = async ({ status, user }) => {
    try {
        if (!todo) {
            return {
                statusCode: 422,
                message: "Add a Todo",
                success: false,
            }
        }

        const updateTodo = await TodoModel.findByIdAndUpdate(user._id, {
            status: user.status,
        })

        if (!updateTodo){
            return {
                statusCode: 406,
                message: "Unable to Update Todo",
                success: false,
            }
        }

        return {
            statusCode: 204,
            message: "Todo has been Updated Successfully",
            updateTodo: [updateTodo],
        }
    }
    catch (err) {
        return {
            statusCode: 409,
            message: "Something went wrong with deleting the todo, try again later.",
            err,
            success: false,
        }
    }
};

module.exports = { 
    createTodo, 
    deleteTodo,
    getTodo,
    updateTodo,
};
