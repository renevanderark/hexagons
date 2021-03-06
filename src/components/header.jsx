import React from "react";

class Header extends React.Component {

	constructor(props) {
		super(props);

		this.mounted = false;
		this.state = {time: 0};
	}

	componentDidMount() {
		this.mounted = true;
		this.initUpdates();
	}
	componentWillUnmount() {
		this.mounted = false;
	}
	initUpdates() {
		this.setState({time: new Date().getTime()});

		if(this.mounted) {
			window.setTimeout(this.initUpdates.bind(this), 200);
		}
	}

	render() {
		return (<header style={{height: "4%", width: "100%", fontSize: "1.2em"}}>
			<span style={{color: "#aaa", marginRight: "10px"}}>{this.props.levelPack}</span>
			L:  {this.props.level} / {this.props.levels}<span style={{marginRight: "10px"}}></span>
			T: {Math.floor((new Date().getTime() - this.props.startTime) / 1000)}
		</header>);
	}
}

Header.propTypes = {
	level: React.PropTypes.number,
	levelPack: React.PropTypes.string,
	levels: React.PropTypes.number,
	startTime: React.PropTypes.number
};

export default Header;