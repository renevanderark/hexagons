import React from "react";

const levelCap = 100;
class Menu extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			levelPack: null
		};
	}

	renderLevels() {
		let levels = []
		for(let i = 0; i < levelCap; i++) {
			levels.push(<a href={this.state.levelPack + "." + i + ".html"} key={i}>
				Level {i+1}
			</a>);
		}

		return (<div style={{height: "calc(100% - 75px)", overflowY: "auto"}}>
			{levels}
		</div>);
	}

	renderHex() {
		return (
			<svg viewBox="0 0 300 260" height="60%" style={{position: "relative", top: "4px"}}>
				<polygon fill="rgba(0,0,255,.2)" points="300,130 225,260 75,260 0,130 75,0 225,0" stroke="#DDD" strokeWidth="1" />
			</svg>
		);
	}

	setLevelPack(levelPack) {
		this.setState({levelPack: levelPack});
	}

	renderLevelPacks() {
		return (<div style={{height: "calc(100% - 75px)", overflowY: "auto"}}>
			<a onClick={this.setLevelPack.bind(this, "3x4-3")}>{this.renderHex()} 3x4 - 3</a>
			<a onClick={this.setLevelPack.bind(this, "3x4-4")}>{this.renderHex()} 3x4 - 4</a>
			<a onClick={this.setLevelPack.bind(this, "3x4-5")}>{this.renderHex()} 3x4 - 5</a>
			<a onClick={this.setLevelPack.bind(this, "3x4-6")}>{this.renderHex()} 3x4 - 6</a>

			<a onClick={this.setLevelPack.bind(this, "3x5-3")}>{this.renderHex()} 3x5 - 3</a>
			<a onClick={this.setLevelPack.bind(this, "3x5-4")}>{this.renderHex()} 3x5 - 4</a>
			<a onClick={this.setLevelPack.bind(this, "3x5-5")}>{this.renderHex()} 3x5 - 5</a>
			<a onClick={this.setLevelPack.bind(this, "3x5-6")}>{this.renderHex()} 3x5 - 6</a>

			<a onClick={this.setLevelPack.bind(this, "4x4-3")}>{this.renderHex()} 4x4 - 3</a>
			<a onClick={this.setLevelPack.bind(this, "4x4-4")}>{this.renderHex()} 4x4 - 4</a>
			<a onClick={this.setLevelPack.bind(this, "4x4-5")}>{this.renderHex()} 4x4 - 5</a>
			<a onClick={this.setLevelPack.bind(this, "4x4-6")}>{this.renderHex()} 4x4 - 6</a>

			<a onClick={this.setLevelPack.bind(this, "4x5-3")}>{this.renderHex()} 4x5 - 3</a>
			<a onClick={this.setLevelPack.bind(this, "4x5-4")}>{this.renderHex()} 4x5 - 4</a>
			<a onClick={this.setLevelPack.bind(this, "4x5-5")}>{this.renderHex()} 4x5 - 5</a>
			<a onClick={this.setLevelPack.bind(this, "4x5-6")}>{this.renderHex()} 4x5 - 6</a>
		</div>);
	}
	render() {
		let content = this.state.levelPack ? this.renderLevels() : this.renderLevelPacks();
		return (
			<div id="menu">
				<h1>Fluxagon</h1>
				{content}
			</div>
		);
	}
}

React.render(<Menu />, document.body);

