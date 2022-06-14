import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div className="container grow p-3 flex flex-col bg-zinc-800 md:bg-zinc-500 rounded">
        <img
          className="w-60 h-72"
          src={this.props.imgItem}
          alt={this.props.imgItem}
        />
        {console.log(this.props)}
        <p className="text-white">{this.props.titleItem}</p>
        <p className="text-white">{this.props.contentItem}</p>
        <button className="text-white" onClick={this.props.onClickItem}>
          Add To Favorite
        </button>
      </div>
    );
  }
}

class Card2 extends Component {
  render() {
    return (
      <div className="container grow p-3 flex flex-col bg-zinc-800 md:bg-zinc-500 rounded">
        <img
          className="max-w-full h-auto"
          width="500"
          height="750"
          src={this.props.imgItem}
          alt={this.props.imgItem}
        />
        <p className="text-white">{this.props.titleItem}</p>
        <p className="text-white">{this.props.contentItem}</p>
      </div>
    );
  }
}

export { Card, Card2 };
