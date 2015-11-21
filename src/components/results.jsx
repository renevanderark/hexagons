import React from "react";

const fills = [
	"rgb(0,0,255)",
	"rgb(0,255,0)",
	"rgb(255,0,0)",
	"rgb(255,255,0)",
	"rgb(0,255,255)",
	"rgb(255,0,255)"
];


class Results extends React.Component {
	
	render() {
		return (<div style={{position: "fixed", width: "100%", height: "100%", zIndex: 1, backgroundColor: "rgba(0,0,0,0.3)"}}>
			<div style={{
				position: "fixed",
				width: "50%",
				left: "25%",
				height: "80%",
				top: "10%",
				borderRadius: "2%",
				backgroundColor: "rgba(255,255,255,0.4)",
				border: "2px solid rgb(0, 0, 255)",
				padding: "5%"
			}}>
				<h1>Well Done!</h1>
				<ul style={{listStyle: "none"}}>
					{this.props.scores.map((score, i) => (
						<li key={i}>
							<label style={{width: "50%", color: fills[i]}}>||</label>{score}
						</li>
					))}
				</ul>
				<button onClick={this.props.onNextGame}>Next level</button>
				<button onClick={this.props.onReset}>Back</button>
			</div>
		</div>);
	}
}

Results.propTypes = {
	onNextGame: React.PropTypes.func
};

export default Results;