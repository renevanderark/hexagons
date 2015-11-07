import React from "react";
import Hexagon from "./components/hexagon";

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			rotations: {0: 0, 1: 0, 2: 0}
		};
	}

	onRotate(index, degs) {
		this.setState({
			rotations: {...this.state.rotations, ...{[index]: degs}}
		});
	}

	render() {
		return (
			<svg height="10000" onMouseDown={(ev) => ev.preventDefault()} width="10000">
				<Hexagon tubes={[{from: 1, to: 3}, {from: 5, to: 2}, {from: 4, to: 0}]} onRotate={this.onRotate.bind(this, 0)} position={[0, 0]} rotation={this.state.rotations[0]} />
				<Hexagon tubes={[{from: 1, to: 2}]} onRotate={this.onRotate.bind(this, 1)} position={[225, 130]} rotation={this.state.rotations[1]} />
				<Hexagon tubes={[{from: 4, to: 5}]}  onRotate={this.onRotate.bind(this, 2)} position={[0, 260]} rotation={this.state.rotations[2]} />
			</svg>
		);
	}
}
React.render(<App />, document.body);

