import React from "react";
import Hexagon from "./components/hexagon";

const randomTubes = () => {
	let amount = Math.floor(Math.random() * 3) + 1;
	let taken = [];
	let tubes = [];
	for(let i = 0; i < amount; i++) {
		let from, to;
		while (taken.indexOf(from = Math.floor(Math.random() * 6)) > -1) { }
		taken.push(from);
		while (taken.indexOf(to = Math.floor(Math.random() * 6)) > -1) { }
		taken.push(to);
		tubes.push({from: from, to: to});
	}

	return tubes;
};


const makeGrid = (w, h) => {
	let grid = {};
	for(let x = 0, i = 0; x < w; x++) {
		for(let y = 0; y < h; y++, i++) {
			grid[i] = {
				x: x,
				y: y,
				rotation: 0,
				tubes: randomTubes()
			}
		}
	}
	return grid;
}

class App extends React.Component {

	constructor(props) {
		super(props);

		let dims = 4;
		this.state = {
			width: dims,
			height: dims,
			grid: makeGrid(dims, dims)
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

