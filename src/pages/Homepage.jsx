import React, { Component } from "react";
import Lottie from "lottie-react";

import CinemaLoading from "../assets/animations/cinema_animation.json";
import Layout from "../components/Layout";
import { Card, Card2 } from "../components/Card";
import CustomHeader from "../components/Header";

import "../styles/App.css";

class Homepage extends Component {
  state = {
    data: [],
    title: "WELCOME",
    dataMovie: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchData();
  }

  handleClick(item) {
    const temp = this.state.dataMovie.slice();
    temp.push(item);
    this.setState({ dataMovie: temp, title: item.title });
  }

  // simulasi pemanggilan api
  fetchData() {
    setTimeout(() => {
      const dummy = [
        {
          id: 1,
          title: "Title 1",
          content: "Content 1",
          image:
            "https://image.tmdb.org/t/p/w500/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg",
        },
        {
          id: 2,
          title: "Title 2",
          content: "Content 2",
          image:
            "https://image.tmdb.org/t/p/w500/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg",
        },
        {
          id: 3,
          title: "Title 3",
          content: "Content 3",
          image:
            "https://image.tmdb.org/t/p/w500/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg",
        },
        {
          id: 4,
          title: "Title 4",
          content: "Content 4",
          image:
            "https://image.tmdb.org/t/p/w500/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg",
        },
        {
          id: 5,
          title: "Title 5",
          content: "Content 5",
          image:
            "https://image.tmdb.org/t/p/w500/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg",
        },
        {
          id: 6,
          title: "Title 6",
          content: "Content 6",
          image:
            "https://image.tmdb.org/t/p/w500/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg",
        },
      ];
      this.setState({ data: dummy }, () => this.setState({ loading: false }));
    }, 3000);
  }

  render() {
    if (this.state.loading) {
      return <Lottie loop autoplay animationData={CinemaLoading} />;
    } else {
      return (
        <Layout title={this.state.title}>
          <div className="grid grid-flow-row auto-rows-max grid-cols-2 md:grid-cols-4 lg:grid-cols-5 m-2 gap-3">
            {this.state.data.map((item) => (
              <Card
                key={item.id}
                titleItem={item.title}
                contentItem={item.content}
                imgItem={item.image}
                onClickItem={() => this.handleClick(item)}
              />
            ))}
          </div>
          <h1>DATA MOVIE</h1>
          <div className="grid grid-flow-row auto-rows-max grid-cols-2 md:grid-cols-4 lg:grid-cols-5 m-2 gap-3">
            {this.state.dataMovie.map((item, index) => (
              <Card2
                key={index}
                titleItem={item.title}
                contentItem={item.content}
                onClickItem={() => this.handleClick(item)}
              />
            ))}
          </div>
        </Layout>
      );
    }
  }
}

export default Homepage;
