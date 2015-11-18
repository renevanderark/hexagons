import React from "react";
import Entry from "./components/entry";
import Hexagon from "./components/hexagon";
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

	renderEntryPoints() {
		return this.state.entryPoints.map((e, i) => (
			<Entry gridPiece={this.state.grid[e[0]]} hasFlow={i+1} idx={e[1]} key={i} />
		));
	}

	render() {
		return (
			<svg
				height={this.state.height * 260 + 130}
				onMouseDown={(ev) => ev.preventDefault()}
				onTouchStart={(ev) => ev.preventDefault()}
				width={this.state.width * 225 + 75}>
				{this.renderGrid()}
				{this.renderEntryPoints()}
			</svg>
		);
	}
}
React.render(<App />, document.body);

