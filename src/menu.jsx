import React from "react";

let state = localStorage.getItem("saved-state") ? JSON.parse(localStorage.getItem("saved-state")) : {};

class Menu extends React.Component {

	renderHex() {
		return (
			<svg viewBox="0 0 300 260" height="60%" style={{position: "relative", top: "4px"}}>
				<polygon fill="rgba(0,0,255,.2)" points="300,130 225,260 75,260 0,130 75,0 225,0" stroke="#DDD" strokeWidth="1" />
			</svg>
		);
	}

	render() {
		if(state.levelPack) {
			console.log("HELLO?");
			console.log(state.levelPack + "." + (state.gameIdx || 0) + ".html");
			document.location = state.levelPack + "." + (state.gameIdx || 0) + ".html";
		}
		return (
			<div id="menu">
				<h1>Fluxagon</h1>
				<div style={{height: "calc(100% - 75px)", overflowY: "auto"}}>
					<a href="3x4-3.0.html">{this.renderHex()} 3x4 - 3</a>
					<a href="3x4-4.0.html">{this.renderHex()} 3x4 - 4</a>
					<a href="3x4-5.0.html">{this.renderHex()} 3x4 - 5</a>
					<a href="3x4-6.0.html">{this.renderHex()} 3x4 - 6</a>

					<a href="3x5-3.0.html">{this.renderHex()} 3x5 - 3</a>
					<a href="3x5-4.0.html">{this.renderHex()} 3x5 - 4</a>
					<a href="3x5-5.0.html">{this.renderHex()} 3x5 - 5</a>
					<a href="3x5-6.0.html">{this.renderHex()} 3x5 - 6</a>

					<a href="4x4-3.0.html">{this.renderHex()} 4x4 - 3</a>
					<a href="4x4-4.0.html">{this.renderHex()} 4x4 - 4</a>
					<a href="4x4-5.0.html">{this.renderHex()} 4x4 - 5</a>
					<a href="4x4-6.0.html">{this.renderHex()} 4x4 - 6</a>

					<a href="4x5-3.0.html">{this.renderHex()} 4x5 - 3</a>
					<a href="4x5-4.0.html">{this.renderHex()} 4x5 - 4</a>
					<a href="4x5-5.0.html">{this.renderHex()} 4x5 - 5</a>
					<a href="4x5-6.0.html">{this.renderHex()} 4x5 - 6</a>
				</div>
			</div>
		);
	}
}

React.render(<Menu />, document.body);
