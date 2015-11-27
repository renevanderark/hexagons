import React from "react";

let state = localStorage.getItem("saved-state") ? JSON.parse(localStorage.getItem("saved-state")) : {};

if(state.levelPack) {
	location.href = state.levelPack + "." + (state.gameIdx || 0) + ".html";
}

class Menu extends React.Component {

	render() {
		return (
			<div>
				<a href="3x4-3.0.html" style={{display: "block"}}>3x4-3</a>
				<a href="4x4-3.0.html" style={{display: "block"}}>4x4-3</a>
			</div>
		);
	}
}

React.render(<Menu />, document.body);