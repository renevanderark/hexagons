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

	renderGrid() {
		return Object.keys(this.state.grid).map((k, i) => (
			<Hexagon
				gridPiece={this.state.grid[k]}
				key={i}
				onRelease={(degs) => store.dispatch({type: "RELEASE_GRID_PIECE", index: k, degs: degs})}
				onRotate={(degs) => store.dispatch({type: "ROTATE_GRID_PIECE", index: k, degs: degs})}
				position={[this.state.grid[k].x * 225, (this.state.grid[k].y * 260) + ((this.state.grid[k].x % 2) * 130) ]}
				rotation={this.state.grid[k].rotation}
				scale={window.innerWidth / (this.state.width * 225 + 75)}
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
			<Results onNextGame={this.onNextGame.bind(this)} onReset={this.onReset.bind(this)} scores={this.state.scores} startTime={this.state.startTime} /> :
			<Header level={this.state.gameIdx + 1} levels={this.state.levels} startTime={this.state.startTime} />;
		return (
			<div style={{fontFamily: "sans-serif"}}>
				{info}
				<div id="canvas-wrapper" style={{
					height: "calc(100% - 18px)", width: "100%", overflow: "auto", backgroundColor: "rgb(200,200,225)"
				}}>
					<svg
						height="100%"
						viewBox={this.getViewBox()}
						width="100%">
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