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
	}

	componentDidMount() {
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

	render() {
		let info = this.state.finished ? 
			<Results onNextGame={this.onNextGame.bind(this)} onReset={this.onReset.bind(this)} scores={this.state.scores} /> : 
			<Header level={this.state.gameIdx + 1} levels={this.state.levels} />;
		return (
			<div style={{fontFamily: "sans-serif"}}>
				{info}
				<svg
					height={this.state.height * 260 + 130}
					width={this.state.width * 225 + 75}>
					{this.renderGrid()}
					{this.renderArrows("entryPoints")}
					{this.renderArrows("exits")}
				</svg>
			</div>
		);
	}
}
React.render(<App />, document.body);

window.addEventListener("unload", () => {
	localStorage.setItem("saved-state", JSON.stringify(store.getState()));
});