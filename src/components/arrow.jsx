import React from "react";

const fills = [
	"white",
	"black",
	"white",
	"black",
	"black",
	"black"
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
		return `translate(${position[0]}, ` +
			`${position[1]}) rotate(${(this.props.idx - 1) * 60}, 150, 130) ` +
			`translate(0, -25) ` +
			`rotate(${this.props.type === "exits" ? 180 : 0}, 150, 11) `;
	}

	render() {
		return (
			<g transform={this.setTransform()}>
				<polygon points="150,-5 150,25" stroke={strokes[this.props.hasFlow - 1]} strokeOpacity="0.7" strokeWidth="20" />
				<polygon fill={fills[this.props.hasFlow - 1]} points="148,1 148,15 145,15 150,20 155,15 152,15 152,1" stroke={strokes[this.props.hasFlow - 1]} strokeWidth=".5" />

			</g>
		);
	}
}

Arrow.propTypes = {
	gridPiece: React.PropTypes.object,
	hasFlow: React.PropTypes.number,
	idx: React.PropTypes.number,
	type: React.PropTypes.string
};

export default Arrow;