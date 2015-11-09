import React from "react";
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

	onRotate(index, degs) {
		store.dispatch({type: "ROTATE_GRID_PIECE", index: index, degs: degs});
	}

	renderGrid() {
		return Object.keys(this.state.grid).map((k, i) => (
			<Hexagon
				gridPiece={this.state.grid[k]}
				key={i}
				onRotate={this.onRotate.bind(this, k)}
				position={[this.state.grid[k].x * 225, (this.state.grid[k].y * 260) + ((this.state.grid[k].x % 2) * 130) ]}
				rotation={this.state.grid[k].rotation}
				tubes={this.state.grid[k].tubes} />
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
			</svg>
		);
	}
}
React.render(<App />, document.body);

