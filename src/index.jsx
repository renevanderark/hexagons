import React from "react";
import Arrow from "./components/arrow";
import Hexagon from "./components/hexagon";
import Results from "./components/results";
import Header from "./components/header";
import store from "./reducers/store";



class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = store.getState();
		this.touchmap = {positions: [], pinchDelta: 0, pinchDistance: 0};
	}

	componentDidMount() {
		React.initializeTouchEvents(true);

		this.unsubscribe = store.subscribe(this.onStateChange.bind(this));
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	onStateChange() {
		this.setState(store.getState());
	}

	onTouchMove(ev) {
		if (ev.touches.length === 2) {
			for (let i = 0; i < ev.touches.length; i++) {
				let cur = {x: ev.touches[i].pageX, y: ev.touches[i].pageY};
				this.touchmap.positions[i] = cur;
			}
			let oldD = this.touchmap.pinchDistance;
			this.touchmap.pinchDistance = parseInt(Math.sqrt(
				(
					(this.touchmap.positions[0].x - this.touchmap.positions[1].x) *
					(this.touchmap.positions[0].x - this.touchmap.positions[1].x)
				) + (
					(this.touchmap.positions[0].y - this.touchmap.positions[1].y) *
					(this.touchmap.positions[0].y - this.touchmap.positions[1].y)
				)
			), 10);
			this.touchmap.pinchDelta = oldD - this.touchmap.pinchDistance;
			if (this.touchmap.pinchDelta < 100 && this.touchmap.pinchDelta > -20) {
				store.dispatch({type: "ZOOM_BY", pinchDelta: this.touchmap.pinchDelta})
			}
			ev.preventDefault();
			ev.stopPropagation();
		}
	}

	renderGrid() {
		return Object.keys(this.state.grid).map((k, i) => (
			<Hexagon
				gridPiece={this.state.grid[k]}
				key={i}
				onRelease={(degs) => store.dispatch({type: "RELEASE_GRID_PIECE", index: k, degs: degs})}
				onRotate={(degs) => store.dispatch({type: "ROTATE_GRID_PIECE", index: k, degs: degs})}
				position={[this.state.grid[k].x * 225, (this.state.grid[k].y * 260) + ((this.state.grid[k].x % 2) * 130) ]}
				rotation={this.state.grid[k].rotation}
				scale={this.state.scale}
				tubes={this.state.grid[k].tubes}
				updated={this.state.updated} />
		));
	}

	renderArrows(type) {
		return this.state[type].map((e, i) => (
			<Arrow gridPiece={this.state.grid[e[0]]} hasFlow={i+1} idx={e[1]} key={i} type={type} />
		));
	}

	onNextGame() {
		store.dispatch({type: "NEXT_GAME"});
	}

	onReset() {
		store.dispatch({type: "RESET"});
	}

	getViewBox() {
		return `0 0 ${this.state.width * 225 + 75} ${this.state.height * 260 + 130}`;
	}

	render() {
		let info = this.state.finished ? 
			<Results onNextGame={this.onNextGame.bind(this)} onReset={this.onReset.bind(this)} scores={this.state.scores} /> : 
			<Header level={this.state.gameIdx + 1} levels={this.state.levels} />;
		return (
			<div style={{fontFamily: "sans-serif"}}>
				{info}
				<div onTouchMove={this.onTouchMove.bind(this)} id="canvas-wrapper" style={{height: "95%", width: "100%", overflow: "auto"}}>
					<svg
						height={(this.state.height * 260 + 130) * this.state.scale}
						width={(this.state.width * 225 + 75) * this.state.scale}
						viewBox={this.getViewBox()}>
						{this.renderGrid()}
						{this.renderArrows("entryPoints")}
						{this.renderArrows("exits")}
					</svg>
				</div>
			</div>
		);
	}
}
React.render(<App />, document.body);

window.addEventListener("unload", () => {
	localStorage.setItem("saved-state", JSON.stringify(store.getState()));
});