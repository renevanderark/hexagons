import React from "react";

const strokes = [
	"rgb(0,0,255)",
	"rgb(0,255,0)",
	"rgb(255,0,0)",
	"rgb(255,255,0)",
	"rgb(0,255,255)",
	"rgb(255,0,255)"
];

const fills = [
	"rgba(0,0,255,.4)",
	"rgba(0,255,0,.4)",
	"rgba(255,0,0,.4)",
	"rgba(255,255,0,.4)",
	"rgba(0,255,255,.4)",
	"rgba(255,0,255,.4)"
];

class Results extends React.Component {
	render() {
		let nextButton = this.props.hasNextLevel ? <button onClick={this.props.onNextGame}>Next level</button> : null;
		let timeScore = Math.floor((new Date().getTime() - this.props.startTime) / 100);
		let total =	this.props.scores.reduce((sum, score) => sum + (score * 100), 0) - timeScore;
		return (<div style={{position: "fixed", top: 0, width: "100%", height: "100%", zIndex: 1, backgroundColor: "rgba(0,0,0,0.3)"}}>
			<div style={{
				position: "fixed",
				width: "90%",
				left: "5%",
				height: "90%",
				top: "5%",
				borderRadius: "2%",
				backgroundColor: "rgba(255,255,255,0.4)",
				border: "2px solid rgb(0, 0, 255, 0.6)",
				padding: "5%"
			}}>
				<h1>Well Done!</h1>
				<ul style={{listStyle: "none"}}>
					{this.props.scores.map((score, i) => (
						<li key={i} style={{marginTop: "10px"}}>
							<label style={{display: "inline-block", width: "50%", verticalAlign: "middle"}}>
								<div style={{width: "100%", height: "15px", backgroundColor: fills[i] }}></div>
							</label>
							<span style={{display: "inline-block", verticalAlign: "middle", fontSize: "1em",  width: "50%", textAlign: "right", color: strokes[i]}}>
								{score * 100}
							</span>
						</li>
					))}
					<li style={{marginTop: "10px"}}>
						<label style={{display: "inline-block", fontSize: "1em", width: "50%"}}>Time</label>
						<span style={{display: "inline-block", fontSize: "1em",  width: "50%", textAlign: "right", color: "red"}}>
							-{timeScore}
						</span>
					</li>
					<li style={{marginTop: "10px", paddingTop: "10px", borderTop: "1px solid white"}}>
						<span style={{display: "inline-block", fontSize: "1em",  width: "100%", textAlign: "right", color: "black"}}>
							{total}
						</span>
					</li>
				</ul>
				{nextButton}
				<button onClick={this.props.onReset}>Back</button>
			</div>
		</div>);
	}
}

Results.propTypes = {
	hasNextLevel: React.PropTypes.bool,
	onNextGame: React.PropTypes.func,
	onReset: React.PropTypes.func,
	scores: React.PropTypes.array,
	startTime: React.PropTypes.number
};

export default Results;