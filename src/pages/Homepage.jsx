import React, { Component } from "react";
import Lottie from "lottie-react";
import axios from "axios";

import CinemaLoading from "../assets/animations/cinema_animation.json";
import Layout from "../components/Layout";
import { Card } from "../components/Card";
import { withRouter } from "../utils/navigation";

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
    this.fetchData();
  }

  fetchData() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then((res) => {
        const { results } = res.data;
        const stringify = JSON.stringify(results); // JS value -> JSON string
        console.log(results);
        console.log(stringify);
        console.log(JSON.parse(stringify)); // JSON string -> JS value
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

  handleSearch(e) {
    if (e.keyCode === 13) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=0e6ab6977a441feefe861571f011429c&language=en-US&query=${e.target.value}&page=1&include_adult=false`
        )
        .then((res) => {
          const { results } = res.data;
          this.setState({ data: results });
        })
        .catch((err) => alert(err.toString()));
    }
  }

  render() {
    if (this.state.loading) {
      return <Lottie loop autoplay animationData={CinemaLoading} />;
    } else {
      return (
        <Layout onKeyDown={(e) => this.handleSearch(e)}>
          <div className="grid grid-flow-row auto-rows-max grid-cols-2 md:grid-cols-4 lg:grid-cols-5 m-2 gap-3">
            {this.state.data.map((item) => (
              <Card
                key={item.id}
                titleItem={item.title}
                imgItem={item.poster_path}
                onClickItem={() => this.props.navigate(`/movie/${item.id}`)}
              />
            ))}
          </div>
          <button onClick={() => this.fetchData2()}>Load More</button>
        </Layout>
      );
    }
  }
}

export default withRouter(Homepage);
