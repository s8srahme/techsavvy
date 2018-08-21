import React, { Component } from "react";
import { Loader } from "components";
import { ChevronDown, Edit2, Delete } from "react-feather";
import { Dropdown } from "../..";
import moment from "moment";

export class ArticleDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDropdownActive: false
		};
	}

	_handleDropdownClick = index => {
		this.setState({ isDropdownActive: !this.state.isDropdownActive });
	};

	render = () => {
		const {
			// authenticationData,
			isLoadingAuthentication,

			articleData,
			// hasErroredArticle,
			// articleError,
			isFetchingArticle
		} = this.props;

		return isLoadingAuthentication || isFetchingArticle ? (
			<div className="wrapper">
				<div className="news-loader-content">
					<Loader />
				</div>
			</div>
		) : (
			<div className="wrapper">
				{articleData.featured_image_url && (
					<div className="news-masthead">
						<figure
							className="news-featured-image"
							style={{
								backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0.1)),
			url("${articleData.featured_image_url}")`
							}}
						/>
					</div>
				)}
				<div className={`news-view-content ${!articleData.featured_image_url && "clear"}`}>
					<div className="container">
						<section className="row">
							<article className="column">
								<header className="news-info-wrapper">
									<div className="news-tag-wrapper">
										<span className="tag active">{articleData.category}</span>
									</div>
									<h1>{articleData.title}</h1>
									<div className="news-meta-wrapper">
										<div className="news-meta">
											<span>{articleData.author_id.name.toLowerCase()}</span>
											<span>{"\u00b7"}</span>
											<time>{moment(articleData.created_at).fromNow()}</time>
										</div>
										<div className="news-meta-dropdown-wrapper">
											<div className="news-meta-dropdown-btn" onClick={this._handleDropdownClick}>
												<ChevronDown className="news-meta-dropdown-icon" />
											</div>
											{this.state.isDropdownActive && (
												<Dropdown
													shouldDropdownShrink={false}
													items={[
														{ icon: Edit2, title: "Edit", onClick: () => this.props.history.push(`/blog/new-story`) },
														{ icon: Delete, title: "Delete", onClick: () => {} }
													]}
												/>
											)}
										</div>
									</div>
								</header>
								<div id="news-view-description" dangerouslySetInnerHTML={{ __html: articleData.description }} />
							</article>
						</section>
					</div>
				</div>
			</div>
		);
	};
}
