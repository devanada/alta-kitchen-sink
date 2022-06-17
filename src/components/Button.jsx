import React, { Component } from "react";

export default class Button extends Component {
  render() {
    return (
      <button
        className="bg-amber-300 text-black font-bold rounded-lg my-1"
        onClick={this.props.onClick}
      >
        {this.props.label}
      </button>
    );
  }
}
