import React from "react";

const dims = [
	[37.5, 65],
	[150, 0],
	[262.5, 65],
	[262.5, 195],
	[150, 260],
	[37.5, 195]
];

class Tube extends React.Component {

	makePoints() {
		let from = dims[this.props.from];
		let to = dims[this.props.to];
		let bend = [150, 130];
		return `M ${from.join(",")} Q ${bend.join(",")} ${to.join(",")}`;
	}

	render() {
		return (
			<path d={this.makePoints()} fill="transparent" stroke="rgba(0,0,0,.3)" strokeWidth="20" />
		);
	}
}

Tube.propTypes = {
	from: React.PropTypes.number,
	to: React.PropTypes.number
};

export default Tube;