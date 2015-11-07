import React from "react";
import Tube from "./tube";


const snaps = [-180, -120, -60, 0, 60, 120, 180];

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

const normalizeAngle = (angle) => {
	angle %= 360; 
	angle = (angle + 360) % 360;  
	if (angle > 180) { angle -= 360; }
    return angle;
}

const getAngle = (dX, dY) => normalizeAngle(Math.atan2(dX, dY) * 180 / Math.PI);



class Hexagon extends React.Component {
	constructor(props) {
		super(props);
		this.center = {x: this.props.position[0] + 150, y: this.props.position[1] + 150};
		this.mouseMoveListener = this.onMouseMove.bind(this);
		this.mouseUpListener = this.onMouseUp.bind(this);
		this.mouseState = "UP";
		this.initAngle = 0;
		this.lastAngle = 0;
	}

	componentDidMount() {
		React.initializeTouchEvents(true);
		window.addEventListener("mousemove", this.mouseMoveListener);
		window.addEventListener("touchmove", this.mouseMoveListener);
		window.addEventListener("mouseup", this.mouseUpListener);
		window.addEventListener("touchend", this.mouseUpListener);
	}

	componentWillUnmount() {
		window.removeEventListener("mousemove", this.mouseMoveListener);
		window.removeEventListener("touchmove", this.mouseMoveListener);
		window.removeEventListener("mouseup", this.mouseUpListener);
		window.removeEventListener("touchend", this.mouseUpListener);
	}

	onMouseMove(ev) {
		if(this.mouseState === "DOWN") {
			let {clientX, clientY} = ev.touches ? ev.touches[0] : ev;
			let newAngle = getAngle(clientX - this.center.x, clientY - this.center.y);
			this.props.onRotate(this.lastAngle + Math.floor(this.initAngle - newAngle));
		}
		return ev.preventDefault;
	}

	onMouseUp(ev) {
		if(this.mouseState === "DOWN") {
			this.props.onRotate(snapTo(normalizeAngle(this.props.rotation)));
		}
		this.mouseState = "UP";
		return ev.preventDefault;
	}

	onMouseDown(ev) {
		this.mouseState = "DOWN";
		let {clientX, clientY} = ev.touches ? ev.touches[0] : ev;
		this.lastAngle = this.props.rotation;
		this.initAngle = getAngle(clientX - this.center.x, clientY - this.center.y);
		return ev.preventDefault;
	}

	setTransform() {
		return `translate(${this.props.position[0]}, ${this.props.position[1]}) rotate(${this.props.rotation}, 150, 130)`;
	}

	render() {
		return (
			<g onMouseDown={this.onMouseDown.bind(this)} onTouchStart={this.onMouseDown.bind(this)} transform={this.setTransform()}>
				{this.props.tubes.map((tube, i) => <Tube key={i} {...tube} /> )}
				<polygon fill="rgba(0,0,255,.2)" points="300,130 225,260 75,260 0,130 75,0 225,0" stroke="#aaa" strokeWidth=".1" />
			</g>
		);
	}
}

Hexagon.propTypes = {
	onRotate: React.PropTypes.func,
	position: React.PropTypes.array,
	rotation: React.PropTypes.number,
	tubes: React.PropTypes.array
};

Hexagon.defaultProps = {
	tubes: []
};

export default Hexagon;