import React from "react";

const fills = [
	"rgba(0,0,255,.6)",
	"rgba(0,255,0,.6)",
	"rgba(255,0,0,.6)",
	"rgba(255,255,0,.6)",
	"rgba(0,255,255,.6)",
	"rgba(255,0,255,.6)"
];

const strokes = [
	"rgb(0,0,255)",
	"rgb(0,255,0)",
	"rgb(255,0,0)",
	"rgb(255,255,0)",
	"rgb(0,255,255)",
	"rgb(255,0,255)"
];

class Arrow extends React.Component {
	setTransform() {
		let position = [this.props.gridPiece.x * 225, (this.props.gridPiece.y * 260) + ((this.props.gridPiece.x % 2) * 130) ];
		return `translate(${position[0]}, ${position[1]}) rotate(${(this.props.idx - 1) * 60}, 150, 130)`;
	}

	render() {
		return (
			<g transform={this.setTransform()}>
				<polygon fill={fills[this.props.hasFlow - 1]} points="148,1 148,15 145,15 150,20 155,15 152,15 152,1" stroke={strokes[this.props.hasFlow - 1]} strokeWidth="1" />
			</g>
		);
	}
}

Arrow.propTypes = {
	gridPiece: React.PropTypes.object,
	hasFlow: React.PropTypes.number,
	idx: React.PropTypes.number
};

export default Arrow;