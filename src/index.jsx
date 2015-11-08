import React from "react";
import Hexagon from "./components/hexagon";

const makeGrid = (w, h) => {
	let grid = {};
	for(let x = 0, i = 0; x < w; x++) {
		for(let y = 0; y < h; y++, i++) {
			grid[i] = {
				x: x,
				y: y,
				rotation: 0,
				tubes: [{from: 1, to: 3}, {from: 5, to: 2}, {from: 4, to: 0}]
			}
		}
	}
	return grid;
}

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			grid: makeGrid(4,4)
		};
	}

	onRotate(index, degs) {
		this.setState({
			grid: {...this.state.grid, ...{[index]: {...this.state.grid[index], rotation: degs}}}
		});
	}

	renderGrid() {
		return Object.keys(this.state.grid).map((k, i) => (
			<Hexagon
				key={i}
				onRotate={this.onRotate.bind(this, k)}
				position={[this.state.grid[k].x * 225, (this.state.grid[k].y * 260) + ((this.state.grid[k].x % 2) * 130) ]}
				rotation={this.state.grid[k].rotation}
				tubes={this.state.grid[k].tubes} />
		));
	}

	render() {
		return (
			<svg height="10000" onMouseDown={(ev) => ev.preventDefault()} onTouchStart={(ev) => ev.preventDefault()} width="10000">
				{this.renderGrid()}
			</svg>
		);
	}
}
React.render(<App />, document.body);

