import {
	FETCH_ARTICLES,
	FETCH_ARTICLES_SUCCESS,
	FETCH_ARTICLES_FAILURE,
	FETCH_MORE_ARTICLES,
	FETCH_MORE_ARTICLES_SUCCESS,
	FETCH_MORE_ARTICLES_FAILURE,
	FETCH_ARTICLE,
	FETCH_ARTICLE_SUCCESS,
	FETCH_ARTICLE_FAILURE,
	UPDATE_ARTICLE,
	UPDATE_ARTICLE_SUCCESS,
	UPDATE_ARTICLE_FAILURE,
	CREATE_ARTICLE,
	CREATE_ARTICLE_SUCCESS,
	CREATE_ARTICLE_FAILURE
} from "../constants";

const initialState = {
	articles: {},
	isFetchingArticles: false,
	hasErroredArticles: false,
	articlesError: null,

	isFetchingMoreArticles: false,
	hasErroredMoreArticles: false,
	moreArticlesError: null,

	article: {},
	isFetchingArticle: false,
	hasErroredArticle: false,
	articleError: null,

	onCreateData: {},
	isFetchingCreateData: false,
	onCreateError: null,

	onUpdateData: {},
	isFetchingUpdateData: false,
	onUpdateError: null
};

export const articleReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ARTICLES:
			return {
				...state,
				isFetchingArticles: true
			};
		case FETCH_ARTICLES_SUCCESS:
			return {
				...state,
				isFetchingArticles: false,
				articles: action.payload,
				articlesError: null
			};
		case FETCH_ARTICLES_FAILURE:
			return {
				...state,
				isFetchingArticles: false,
				hasErroredArticles: true,
				articlesError: action.error
			};

		case FETCH_MORE_ARTICLES:
			return {
				...state,
				isFetchingMoreArticles: true
			};
		case FETCH_MORE_ARTICLES_SUCCESS:
			return {
				...state,
				isFetchingMoreArticles: false,
				articles: {
					meta: action.payload.meta,
					data: { articles: [...state.articles.data.articles, ...action.payload.data.articles] }
				},
				moreArticlesError: null
			};
		case FETCH_MORE_ARTICLES_FAILURE:
			return {
				...state,
				isFetchingMoreArticles: false,
				hasErroredMoreArticles: true,
				moreArticlesError: action.error
			};

		case FETCH_ARTICLE:
			return {
				...state,
				isFetchingArticle: true
			};
		case FETCH_ARTICLE_SUCCESS:
			return {
				...state,
				isFetchingArticle: false,
				article: action.payload.article,
				articleError: null
			};
		case FETCH_ARTICLE_FAILURE:
			return {
				...state,
				isFetchingArticle: false,
				hasErroredArticle: true,
				articleError: action.error
			};

		case CREATE_ARTICLE:
			return {
				...state,
				onCreateData: [],
				isFetchingCreateData: true
			};
		case CREATE_ARTICLE_SUCCESS:
			return {
				...state,
				isFetchingCreateData: false,
				onCreateData: action.payload,
				onCreateError: null
			};
		case CREATE_ARTICLE_FAILURE:
			return {
				...state,
				isFetchingCreateData: false,
				onCreateError: action.error
			};

		case UPDATE_ARTICLE:
			return {
				...state,
				onUpdateData: [],
				isFetchingUpdateData: true
			};
		case UPDATE_ARTICLE_SUCCESS:
			return {
				...state,
				isFetchingUpdateData: false,
				onUpdateData: action.payload,
				onUpdateError: null
			};
		case UPDATE_ARTICLE_FAILURE:
			return {
				...state,
				isFetchingUpdateData: false,
				onUpdateError: action.error
			};

		default:
			return state;
	}
};
