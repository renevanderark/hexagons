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
		let promoLink = this.props.levels < 40 ? <button onClick={function() {AndroidInterface.goToPremium(); }}>$ more levels...</button> : null;
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
				<button onClick={function() {AndroidInterface.shareMe(); }} style={{position: "relative", top: "4px", height: "40px"}}>
					<svg fill="#fff" height="90%" viewBox="0 0 507.45 507.45"><g id="share-alt"><path d="M408,178.5c-20.4,0-38.25,7.65-51,20.4L175.95,94.35c2.55-5.1,2.55-12.75,2.55-17.85C178.5,33.15,145.35,0,102,0    S25.5,33.15,25.5,76.5S58.65,153,102,153c20.4,0,38.25-7.65,51-20.4l181.05,104.55c-2.55,5.1-2.55,12.75-2.55,17.85    c0,5.1,0,12.75,2.55,17.85L153,379.95c-12.75-12.75-30.6-20.4-51-20.4c-40.8,0-73.95,33.15-73.95,73.95S61.2,507.45,102,507.45    s73.95-33.15,73.95-73.95c0-5.1,0-10.2-2.55-17.85L354.45,308.55c12.75,12.75,30.6,20.4,51,20.4c43.35,0,76.5-33.15,76.5-76.5    C481.95,209.1,451.35,178.5,408,178.5z"/></g></svg>
				</button>
				<button onClick={this.props.onReset}>Back</button>
				{promoLink}
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