import React from "react";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Modal extends React.Component {
	// componentWillMount = () => {
	// 	document.addEventListener("click", this._handleOverlayClick, false);
	// };

	// componentWillUnmount = () => {
	// 	document.removeEventListener("click", this._handleOverlayClick, false);
	// };

	_handleOverlayClick = e => {
		const { onClose } = this.props;
		if (!this.modal.contains(e.target)) {
			onClose();
		}
	};

	render = () => {
		const { showModal } = this.props;
		let component;

		if (showModal) {
			component = (
				<div className="modal-overlay" onClick={this._handleOverlayClick}>
					<div className="modal-content" ref={node => (this.modal = node)}>
						{this.props.children}
					</div>
				</div>
			);
		}

		return (
			<ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
				{component}
			</ReactCSSTransitionGroup>
		);
	};
}

Modal.propTypes = {
	showModal: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	children: PropTypes.node
};

export { Modal };
