import React from "react";

class Results extends React.Component {
	
	render() {
		return (<div style={{position: "fixed", width: "100%", height: "100%", zIndex: 1, backgroundColor: "rgba(255,255,255,0.4)"}}>
			<h1>Comgratiomelations</h1><button onClick={this.props.onNextGame}>OK nextz</button>
		</div>);
	}
}

Results.propTypes = {
	onNextGame: React.PropTypes.func
};

export default Results;