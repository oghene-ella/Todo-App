const TodoModel = require("../models/todoModel");

const createTodo = async ({ todo, userId }) => {
    try {
        if (!todo) {
            return {
                statusCode: 422,
                message: "Add a Todo already!",
                success: false,
            };
        }

        const newTodo = await TodoModel.create({
            todo: todo,
            userId: userId._id,
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

const getTodo = async ({userId, getBody }) => {
    try {
        const todo = await TodoModel.find({ userId: userId._id });

        if (!userId) {
            return {
                statusCode: 404,
                message: "You are an Unauthorized User",
                tasks: false,
                userId: null,
            };
        }

        if (todo.length === 0) {
            return {
                statusCode: 404,
                message: "There are no Todo's",
                todo: null,
                getBody,
            };
        }

        if (getBody.status == "pending") {
            todo = todo.filter((theTodo) => theTodo.status == "pending");
        }

        if (getBody.status == "completed") {
            todo = todo.filter((theTodo) => theTodo.status == "completed");
        }

        if (todo.length != 0) {
            return {
                statusCode: 200,
                message: null,
                todo,
                userId,
            };
        }
    } catch (error) {
        return {
            statusCode: 409,
            message:
                "Something went wrong with getting the todo list, try again later.",
            err,
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
