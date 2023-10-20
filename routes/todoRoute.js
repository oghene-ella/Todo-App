const express = require("express");
const bodyParser = require("body-parser");

const TodoRouter = express.Router();

const TodoController = require("../controller/TodoController");

TodoRouter.use(bodyParser.json());

TodoRouter.route("/").get(TodoController.getAllTodo);

TodoRouter.route("/:id").get(TodoController.getOneTodo);

TodoRouter.route("/").delete(TodoController.delManyTodo);

TodoRouter.route("/:id").delete(TodoController.deleteOneTodo);

TodoRouter.route("/:id").patch(TodoController.updateOneTodo);

TodoRouter.route("/:id").post(TodoController.createTodo);


module.exports = TodoRouter;
