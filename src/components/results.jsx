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
		let nextButton = this.props.hasNextLevel ? <button onClick={this.props.onNextGame}>Next level</button> : null;
		return (<div style={{position: "fixed", width: "100%", height: "100%", zIndex: 1, backgroundColor: "rgba(0,0,0,0.3)"}}>
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
						<li key={i}>
							<label style={{display: "inline-block", width: "50%", color: fills[i]}}>||</label>
							<span style={{display: "inline-block", width: "50%", textAlign: "right"}}>
								{score * 100}
							</span>
						</li>
					))}
					<li>
						<label style={{display: "inline-block", width: "50%"}}>T</label>
						<span style={{display: "inline-block", width: "50%", textAlign: "right", color: "red"}}>
							-{Math.floor((new Date().getTime() - this.props.startTime) / 100)}
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