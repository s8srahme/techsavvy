import { createRequestInstance } from "utils";
import articleService from "./articleService";
import commentService from "./commentService";
import userService from "./userService";
import mailService from "./mailService";
import authService from "./authService";

export let instance = createRequestInstance();

export default {
	articles: articleService("/articles", instance),
	mails: mailService("/mails", instance),
	users: userService("/users", instance),
	comments: commentService("/comments", instance),
	auth: authService("/auth", instance)
};
