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
};

class Hexagon extends React.Component {
	constructor(props) {
		super(props);

		let position = [this.props.gridPiece.x * 225, (this.props.gridPiece.y * 260) + ((this.props.gridPiece.x % 2) * 130) ];
		this.center = {x: position[0] + 150, y: position[1] + 150};
		this.nextRotation = this.props.gridPiece.rotation;

		this.animationFrameListener = this.onAnimationFrame.bind(this);
	}

	componentDidMount() {
		React.initializeTouchEvents(true);
		window.requestAnimationFrame(this.animationFrameListener);
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.gridPiece.rotation !== nextProps.gridPiece.rotation && nextProps.gridPiece.rotation % 60 === 0) {
			this.nextRotation = snapTo(normalizeAngle(nextProps.gridPiece.rotation));
			this.props.onRelease(this.nextRotation);
		}
	}

	shouldComponentUpdate(nextProps) {
		return this.props.updated !== nextProps.updated || this.props.gridPiece.rotation !== nextProps.gridPiece.rotation;
	}

	onAnimationFrame() {
		if(this.nextRotation < this.props.gridPiece.rotation) {
			this.props.onRotate(this.props.gridPiece.rotation - 10);
		} else if(this.nextRotation > this.props.gridPiece.rotation) {
			this.props.onRotate(this.props.gridPiece.rotation + 10);
		}
		window.setTimeout(this.animationFrameListener, 5);
	}

	onTouchStart(ev) {
		let {clientX, clientY} = ev.touches[0];
		console.log(clientX, this.center.x);
		this.initX = clientX;
		this.initY = clientY;
		this.nextX = clientX;
		this.nextY = clientY;
	}

	onTouchMove(ev) {
		let {clientX, clientY} = ev.touches[0];
		this.nextX = clientX;
		this.nextY = clientY;
	}

	onTouchEnd() {
		if(this.nextX === this.initX && this.nextY === this.initY) {
			this.nextRotation = this.initX > this.center.x ? // TODO: recompute this.center.x based on real image width when zoomed
				this.nextRotation + 60 :
				this.nextRotation - 60;
		}
	}

	setTransform() {
		let position = [this.props.gridPiece.x * 225, (this.props.gridPiece.y * 260) + ((this.props.gridPiece.x % 2) * 130) ];
		return `translate(${position[0]}, ${position[1]}) rotate(${this.props.gridPiece.rotation}, 150, 130)`;
	}

	render() {
		return (
			<g 	onTouchEnd={this.onTouchEnd.bind(this)}
				onTouchMove={this.onTouchMove.bind(this)}
				onTouchStart={this.onTouchStart.bind(this)}
				transform={this.setTransform()}>
				{this.props.tubes.map((tube, i) => <Tube key={i} {...tube} /> )}
				<polygon fill="rgba(0,0,255,.2)" points="300,130 225,260 75,260 0,130 75,0 225,0" stroke="#aaa" strokeWidth=".1" />
			</g>
		);
	}
}

Hexagon.propTypes = {
	gridPiece: React.PropTypes.object,
	onRelease: React.PropTypes.func,
	onRotate: React.PropTypes.func,
	tubes: React.PropTypes.array,
	updated: React.PropTypes.number
};

Hexagon.defaultProps = {
	tubes: []
};

export default Hexagon;