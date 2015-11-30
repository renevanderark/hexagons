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
		return (<header style={{width: "100%", position: "fixed", zIndex: 1, opacity: ".8", backgroundColor: "rgba(255,255,255,.5)"}}>
			L: {this.props.level} / {this.props.levels},
			T: {Math.floor((new Date().getTime() - this.props.startTime) / 1000)}
		</header>);
	}
}

Header.propTypes = {
	level: React.PropTypes.number,
	levels: React.PropTypes.number,
	startTime: React.PropTypes.number
};

export default Header;