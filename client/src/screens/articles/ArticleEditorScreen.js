import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "redux/actions";
import { ArticleEditor } from "../../components";
// import { slugify } from "../../utils";

class ArticleEditorScreen extends Component {
	componentWillMount = () => {
		window.scrollTo(0, 0);
	};

	// _handleFormSubmit = (event, data) => {
	// 	event.preventDefault();
	//   this.props.history.push(`/blog/${}`)
	// };

	// _handleFormCancel = () => {
	// 	this.props.history.goBack();
	// };

	render = () => {
		const {
			isLoadingAuthentication,
			authenticationData,

			onCreate,
			onCreateData,
			isFetchingCreateData,
			onCreateError
		} = this.props;
		// const post = {
		// 	image:
		// 		"https://i.amz.mshcdn.com/-Tvnq3kgcjiELKDZkWWGBnWIwLo=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F728735%2Fd76babe8-b91a-45e0-aa46-2a3028ef2a94.jpg",
		// 	title: "this is a sample main title",
		// 	description: `<h2>this is a sample title</h2><p>this is a sample description</p><blockquote>this is a sample quote</blockquote><h2>this is another sample title</h2><p>this is another <b>sample</b> description, with a <a href="www.google.com" target="_blank" rel="noopener noreferrer">link</a></p>`,
		// 	timestamp: "20 hours ago",
		// 	category: "tech",
		// 	slug: slugify("iPhone X's notch probably won't get smaller or disappear anytime soon"),
		// 	author_name: "RAYMOND WONG",
		// 	author_image_url: "https://i.pinimg.com/736x/b9/42/d0/b942d0e23bea3c5ecff16edc07219b3b.jpg"
		// };
		return (
			<ArticleEditor
				history={this.props.history}
				isLoadingAuthentication={isLoadingAuthentication}
				authenticationData={authenticationData}
				onCreate={onCreate}
				onCreateData={onCreateData}
				isFetchingCreateData={isFetchingCreateData}
				onCreateError={onCreateError}
				// onFormSubmit={this._handleFormSubmit}
				// onFormCancel={this._handleFormCancel}
			/>
		);
	};
}

const mapStateToProps = ({ articles, authentication }) => {
		return {
			authenticationData: authentication.user,
			isLoadingAuthentication: authentication.isLoadingUser,

			onCreateData: articles.onCreateData,
			onCreateError: articles.onCreateError,
			isFetchingCreateData: articles.isFetchingCreateData
		};
	},
	mapDispatchToProps = dispatch => {
		return {
			onCreate: createData => dispatch(actions.articles.create(createData))
		};
	};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArticleEditorScreen);
