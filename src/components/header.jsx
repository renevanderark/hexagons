import React from "react";

class Header extends React.Component {

	render() {
		return <header>Lvl: {this.props.level} / {this.props.levels}</header>
	}
}

export default Header;