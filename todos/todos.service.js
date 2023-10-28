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
        console.log(err)
        return {
            message:
                "Something went wrong while creating. Go back to your dashboard",
            err,
            statusCode: 409,
            success: false,
        };
    }
};

const deleteTodo = async ({ todoId, user }) => {
	try {
        if (!todoId) {
            return {
                statusCode: 422,
                message: "Delete a Task",
                success: false,
            };
        }

        const deleteTodo = await TodoModel.findByIdAndDelete({todoId});

        if (!deleteTodo){
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
            TodoList,
            user,
        };
    } catch (err) {
        return {
            statusCode: 409,
            message: "Something went wrong with deleting the todo, try again later.",
            err,
            success: false,
        }
    }
};

const getTodo = async (user) => {
    console.log("welcome");
    try {
        console.log("odili");
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

const updateTodo = async ({ _id, todo, status, userId }) => {
    try {
        if (!todo) {
            return {
                statusCode: 422,
                message: "Add a Todo",
                success: false,
            }
        }

        const updateTodo = await TodoModel.findByIdAndUpdate(_id, {
            todo: todo,
            status: status,
            userId: userId
        })

        if (!updateTodo){
            return {
                statusCode: 406,
                message: "Unable to Update Todo",
                sucess: false,
            }
        }

        return {
            statusCode: 204,
            message: "Todo has been Updated Successfully",
            updateTodo: [updateTodo],
            userId
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
