import React from "react";

class Header extends React.Component {

	constructor(props) {
		super(props);

		this.state = {time: 0};
	}

	componentDidMount() {
		this.initUpdates();
	}

	initUpdates() {
		this.setState({time: new Date().getTime()});
		window.setTimeout(this.initUpdates.bind(this), 200);
	}

	render() {
		return (<header>
			L: {this.props.level} / {this.props.levels},
			T: {Math.floor((new Date().getTime() - this.props.startTime) / 1000)}
		</header>);
	}
}

export default Header;