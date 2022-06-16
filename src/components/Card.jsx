import React, { Component } from "react";

import Button from "./Button";

class Card extends Component {
  render() {
    return (
      <div className="container grow p-3 flex flex-col bg-zinc-800 md:bg-zinc-500 rounded">
        <div
          className="cursor-pointer h-full flex flex-col"
          onClick={this.props.onClickItem}
        >
          <img
            className="max-w-full h-auto"
            src={
              this.props.imgItem
                ? `https://image.tmdb.org/t/p/w500${this.props.imgItem}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={this.props.imgItem}
          />
          <p className="text-white font-bold text-center">
            {this.props.titleItem}
          </p>
        </div>
        <Button label="Add To Favorite" />
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
