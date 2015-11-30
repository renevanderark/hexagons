import React from "react";

const levelCap = parseInt(location.href.replace(/.*\?levelCap=([0-9]+)/, "$1")) || 100;
localStorage.setItem("level-cap", levelCap);


class Menu extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			levelPack: null
		};
	}

	renderLevels() {
		let levels = [];
		for(let i = 0; i < levelCap; i++) {
			levels.push(<a href={this.state.levelPack + "." + i + ".html"} key={i}>
				Level {i+1}
			</a>);
		}

		return (<div style={{paddingTop: "75px", paddingBottom: "35px"}}>
			{levels}
		</div>);
	}

	renderHex() {
		return (
			<svg height="60%" style={{position: "relative", top: "4px"}} viewBox="0 0 300 260">
				<polygon fill="rgba(0,0,255,.2)" points="300,130 225,260 75,260 0,130 75,0 225,0" stroke="#DDD" strokeWidth="1" />
			</svg>
		);
	}

	setLevelPack(levelPack) {
		this.setState({levelPack: levelPack});
	}

	renderLevelPacks() {
		return (<div style={{paddingTop: "75px", paddingBottom: "35px"}}>
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
				<h1 style={{position: "fixed", top: 0, paddingLeft: "20px", display: "block", width: "100%", backgroundColor: "#fff", zIndex: 1000, textAlign: "left"}}>
					Fluxagon
				</h1>
				<button onClick={function() {AndroidInterface.shareMe(); }} style={{position: "fixed", top: 20, right: 20, zIndex: 1001, height: "40px"}}>
					<svg fill="#fff" height="90%" viewBox="0 0 507.45 507.45"><g id="share-alt"><path d="M408,178.5c-20.4,0-38.25,7.65-51,20.4L175.95,94.35c2.55-5.1,2.55-12.75,2.55-17.85C178.5,33.15,145.35,0,102,0    S25.5,33.15,25.5,76.5S58.65,153,102,153c20.4,0,38.25-7.65,51-20.4l181.05,104.55c-2.55,5.1-2.55,12.75-2.55,17.85    c0,5.1,0,12.75,2.55,17.85L153,379.95c-12.75-12.75-30.6-20.4-51-20.4c-40.8,0-73.95,33.15-73.95,73.95S61.2,507.45,102,507.45    s73.95-33.15,73.95-73.95c0-5.1,0-10.2-2.55-17.85L354.45,308.55c12.75,12.75,30.6,20.4,51,20.4c43.35,0,76.5-33.15,76.5-76.5    C481.95,209.1,451.35,178.5,408,178.5z"/></g></svg>
				</button>
				{content}
			</div>
		);
	}
}

React.render(<Menu />, document.body);
