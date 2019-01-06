import React from "react";
import PropTypes from "prop-types";
import { Loader } from "components";
import { iconPictureLight, iconPictureDark } from "assets";

class LazyLoad extends React.Component {
	static propTypes = {
		src: PropTypes.string,
		className: PropTypes.string,
		wrapperClassName: PropTypes.string,
		overlayClassName: PropTypes.string,
		alt: PropTypes.string,
		background: PropTypes.string,
		figure: PropTypes.bool,
		style: PropTypes.object,
		defaultImage: PropTypes.string
	};

	static defaultProps = {
		className: "",
		wrapperClassName: "",
		overlayClassName: "",
		background: ""
	};

	state = {
		loaded: false,
		errored: false
	};

	componentDidUpdate = (prevProps, prevState, snapshot) => {
		if (prevProps.src !== this.props.src) {
			this.setState(
				{ errored: false }
				// 	, () => {
				// 	console.log(prevProps.src, this.props.src);
				// }
			);
		}
	};

	_handleError = event => {
		this.setState({ errored: true }, this.props.callback);
	};

	_handleLoad = () => this.setState({ loaded: true }, this.props.callback);

	render = () => {
		const {
			src,
			alt,
			className = "",
			wrapperClassName = "",
			overlayClassName = "",
			background = "",
			figure,
			style = null,
			defaultImage,
			children
		} = this.props;
		const { loaded, errored } = this.state;

		if (errored || this.props.errored) {
			return (
				<div className={`lazy-load-wrapper ${background} ${wrapperClassName}`}>
					{figure && children ? (
						<figure className={`${className} show`}>{children}</figure>
					) : src ? (
						<div className="lazy-load-overlay">
							<img
								src={
									defaultImage ||
									(background === "light" || background === "darken-light" ? iconPictureDark : iconPictureLight)
								}
								alt={alt}
								className={`lazy-load-thumbnail ${defaultImage ? "full" : ""} ${overlayClassName}`}
							/>
						</div>
					) : (
						defaultImage && (
							<div className="lazy-load-overlay">
								<img src={defaultImage} alt={alt} className={`lazy-load-thumbnail ${overlayClassName}`} />
							</div>
						)
					)}
				</div>
			);
		}
		return (
			<div className={`lazy-load-wrapper ${background} ${wrapperClassName}`}>
				{!loaded && (
					<div className={`lazy-load-overlay ${overlayClassName}`}>
						<Loader small shouldClearButton inverse={background === "" || background === "dark" ? true : false} />
					</div>
				)}
				<img
					className={`${className} ${loaded ? "show" : ""} ${figure ? "hide" : ""}`}
					src={src}
					alt={alt}
					onLoad={this._handleLoad}
					onError={this._handleError}
				/>
				{figure && (
					<figure className={`${className} ${loaded ? "show" : ""}`} style={style}>
						{children && children}
					</figure>
				)}
			</div>
		);
	};
}

export { LazyLoad };
