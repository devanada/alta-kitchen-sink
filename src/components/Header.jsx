import React, { Component } from "react";

class CustomHeader extends Component {
  render() {
    return (
      <nav className="sticky top-0 w-full px-2 py-2.5 bg-zinc-800">
        <p className="text-white">{this.props.title}</p>
      </nav>
    );
  }
}

export default CustomHeader;
