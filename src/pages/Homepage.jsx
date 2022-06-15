import React, { Component } from "react";
import Lottie from "lottie-react";
import axios from "axios";

import CinemaLoading from "../assets/animations/cinema_animation.json";
import Layout from "../components/Layout";
import { Card, Card2 } from "../components/Card";

import "../styles/App.css";

class Homepage extends Component {
  state = {
    data: [],
    title: "WELCOME",
    dataMovie: [],
    loading: true,
    page: 1,
  };

  componentDidMount() {
    this.fetchData2();
  }

  handleClick(item) {
    const temp = this.state.dataMovie.slice();
    temp.push(item);
    this.setState({ dataMovie: temp, title: item.title });
  }

  fetchData() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=0e6ab6977a441feefe861571f011429c&language=en-US&page=1"
      )
      .then((res) => {
        const { results } = res.data;
        this.setState({ data: results });
      })
      .catch((err) => alert(err.toString()))
      .finally(() => this.setState({ loading: false }));
  }

  fetchData2() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const newPage = this.state.page + 1;
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=0e6ab6977a441feefe861571f011429c&language=en-US&page=${this.state.page}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const { results } = data;
        const temp = this.state.data.slice(); // copy the array/duplicate the array
        temp.push(...results); // add the new data with push
        this.setState({ data: temp, page: newPage });
      })
      .catch((err) => alert(err.toString()))
      .finally(() => this.setState({ loading: false }));
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
                imgItem={item.poster_path}
                onClickItem={() => this.handleClick(item)}
              />
            ))}
          </div>
          <button onClick={() => this.fetchData2()}>Load More</button>
        </Layout>
      );
    }
  }
}

export default Homepage;
