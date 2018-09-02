import {
	FETCH_COMMENTS,
	FETCH_COMMENTS_SUCCESS,
	FETCH_COMMENTS_FAILURE,
	FETCH_MORE_COMMENTS,
	FETCH_MORE_COMMENTS_SUCCESS,
	FETCH_MORE_COMMENTS_FAILURE,
	FETCH_COMMENT,
	FETCH_COMMENT_SUCCESS,
	FETCH_COMMENT_FAILURE,
	UPDATE_COMMENT,
	UPDATE_COMMENT_SUCCESS,
	UPDATE_COMMENT_FAILURE,
	DELETE_COMMENT,
	DELETE_COMMENT_SUCCESS,
	DELETE_COMMENT_FAILURE,
	CREATE_COMMENT,
	CREATE_COMMENT_SUCCESS,
	CREATE_COMMENT_FAILURE
} from "../constants";

const initialState = {
	comments: {},
	isFetchingComments: false,
	hasErroredComments: false,
	commentsError: null,

	isFetchingMoreComments: false,
	hasErroredMoreComments: false,
	moreCommentsError: null,

	comment: {},
	isFetchingComment: false,
	hasErroredComment: false,
	commentError: null,

	onCreateData: {},
	isFetchingCreateData: false,
	onCreateError: null,

	onUpdateData: {},
	isFetchingUpdateData: false,
	onUpdateError: null,

	onDeleteData: {},
	isFetchingDeleteData: false,
	onDeleteError: null
};

export const commentReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_COMMENTS:
			return {
				...state,
				isFetchingComments: true
			};
		case FETCH_COMMENTS_SUCCESS:
			return {
				...state,
				isFetchingComments: false,
				comments: action.payload,
				commentsError: null
			};
		case FETCH_COMMENTS_FAILURE:
			return {
				...state,
				isFetchingComments: false,
				hasErroredComments: true,
				commentsError: action.error
			};

		case FETCH_MORE_COMMENTS:
			return {
				...state,
				isFetchingMoreComments: true
			};
		case FETCH_MORE_COMMENTS_SUCCESS:
			return {
				...state,
				isFetchingMoreComments: false,
				comments: {
					meta: action.payload.meta,
					data: { comments: [...state.comments.data.comments, ...action.payload.data.comments] }
				},
				moreCommentsError: null
			};
		case FETCH_MORE_COMMENTS_FAILURE:
			return {
				...state,
				isFetchingMoreComments: false,
				hasErroredMoreComments: true,
				moreCommentsError: action.error
			};

		case FETCH_COMMENT:
			return {
				...state,
				isFetchingComment: true
			};
		case FETCH_COMMENT_SUCCESS:
			return {
				...state,
				isFetchingComment: false,
				comment: action.payload.comment,
				commentError: null
			};
		case FETCH_COMMENT_FAILURE:
			return {
				...state,
				isFetchingComment: false,
				hasErroredComment: true,
				commentError: action.error
			};

		case CREATE_COMMENT:
			return {
				...state,
				onCreateData: {},
				isFetchingCreateData: true
			};
		case CREATE_COMMENT_SUCCESS:
			return {
				...state,
				isFetchingCreateData: false,
				onCreateData: action.payload,
				onCreateError: null,
				comments: {
					meta: state.comments.meta,
					data: { comments: [action.payload.data.createdComment, ...state.comments.data.comments] }
				}
			};
		case CREATE_COMMENT_FAILURE:
			return {
				...state,
				isFetchingCreateData: false,
				onCreateError: action.error
			};

		case UPDATE_COMMENT:
			return {
				...state,
				onUpdateData: {},
				isFetchingUpdateData: true
			};
		case UPDATE_COMMENT_SUCCESS:
			return {
				...state,
				isFetchingUpdateData: false,
				onUpdateData: action.payload,
				onUpdateError: null,
				comments: {
					meta: state.comments.meta,
					data: {
						comments: state.comments.data.comments.map((item, i) => {
							if (item._id === action.payload.data.updatedComment._id) {
								item.text = action.payload.data.updatedComment.text;
							}
							return item;
						})
						// comments: (async () => {
						// 	// await state.comments.data.comments.forEach((item, i) => {
						// 	// 	if (item._id === action.payload.data.updatedComment._id)
						// 	// 		item.text = action.payload.data.updatedComment.text;
						// 	// });
						// 	await state.comments.data.comments.every((val, i) => {
						// 		if (val._id === action.payload.data.updatedComment._id) {
						// 			val.text = action.payload.data.updatedComment.text;
						// 			return false; // break
						// 		}
						// 		return true;
						// 	});
						// 	return state.comments.data.comments;
						// })()
					}
				}
			};
		case UPDATE_COMMENT_FAILURE:
			return {
				...state,
				isFetchingUpdateData: false,
				onUpdateError: action.error
			};

		case DELETE_COMMENT:
			return {
				...state,
				onDeleteData: {},
				isFetchingDeleteData: true
			};
		case DELETE_COMMENT_SUCCESS:
			return {
				...state,
				isFetchingDeleteData: false,
				onDeleteData: action.payload,
				onDeleteError: null,
				comments: {
					meta: state.comments.meta,
					data: {
						comments: state.comments.data.comments.filter(
							(item, idx) => item._id !== action.payload.data.deletedComment._id
						)
					}
				}
			};
		case DELETE_COMMENT_FAILURE:
			return {
				...state,
				isFetchingDeleteData: false,
				onDeleteError: action.error
			};

		default:
			return state;
	}
};
