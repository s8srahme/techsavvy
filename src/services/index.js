import { createRequestInstance } from "utils";
import articleService from "./articleService";
import commentService from "./commentService";
import userService from "./userService";

export let instance = createRequestInstance();

export default {
	articles: articleService("/articles", instance),
	users: userService("/users", instance),
	comments: commentService("/comments", instance)
};