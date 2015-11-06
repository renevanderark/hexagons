import React from "react";

const snaps = [-360, -300, -240, -180, -120, -60, 0, 60, 120, 180, 240, 300, 360];

const snapTo = (num) => {
	var curr = snaps[0];
	var diff = Math.abs(num - curr);
	for (var val = 0; val < snaps.length; val++) {
		var newdiff = Math.abs(num - snaps[val]);
		if (newdiff < diff) {
			diff = newdiff;
			curr = snaps[val];
		}
	}
	return curr;
};

const getAngle = (dX, dY) => Math.atan2(dX, dY) * 180 / Math.PI;

class Hexagon extends React.Component {
	constructor(props) {
		super(props);
		this.center = {x: this.props.position[0] + 150, y: this.props.position[1] + 150};
		this.mouseMoveListener = this.onMouseMove.bind(this);
		this.mouseUpListener = this.onMouseUp.bind(this);
		this.mouseState = "UP";
		this.initAngle = 0;
	}

	componentDidMount() {
		window.addEventListener("mousemove", this.mouseMoveListener);
		window.addEventListener("mouseup", this.mouseUpListener);
	}

	componentWillUnmount() {
		window.removeEventListener("mousemove", this.mouseMoveListener);
		window.removeEventListener("mouseup", this.mouseUpListener);
	}

	onMouseMove(ev) {
		if(this.mouseState === "DOWN") {
			let newAngle = getAngle(ev.pageX - this.center.x, ev.pageY - this.center.y);
			this.props.onRotate(Math.floor(this.initAngle - newAngle));
		}
		return ev.preventDefault;
	}

	onMouseUp(ev) {
		if(this.mouseState === "DOWN") {
			let newAngle = getAngle(ev.pageX - this.center.x, ev.pageY - this.center.y);
			this.props.onRotate(snapTo(Math.floor(this.initAngle - newAngle)));
		}
		this.mouseState = "UP";
		return ev.preventDefault;
	}

	onMouseDown(ev) {
		this.mouseState = "DOWN";
		this.initAngle = getAngle(ev.pageX - this.center.x, ev.pageY - this.center.y);
		return ev.preventDefault;
	}

	setTransform() {
		return `translate(${this.props.position[0]}, ${this.props.position[1]}) rotate(${this.props.rotation}, 150, 130)`;
	}

	render() {
		return (
			<g onMouseDown={this.onMouseDown.bind(this)} transform={this.setTransform()}>
				<polygon fill="rgba(0,0,255,.2)" points="300,130 225,260 75, 260 0,  130 75,  0	225, 0" stroke="#aaa" strokeWidth=".1" />
				<rect fill="red" x="10" y="10" width="10" height="10" />
			</g>
		);
	}
}

Hexagon.propTypes = {
	onRotate: React.PropTypes.func,
	position: React.PropTypes.array,
	rotation: React.PropTypes.number
};

export default Hexagon;