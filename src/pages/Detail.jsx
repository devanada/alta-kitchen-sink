import React, { Component } from "react";
import axios from "axios";

import { withRouter } from "../utils/navigation";
import Layout from "../components/Layout";

class Detail extends Component {
  state = {
    data: {},
    title: "WELCOME",
    loading: true,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { movie_id } = this.props.params;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=0e6ab6977a441feefe861571f011429c&language=en-US`
      )
      .then((res) => {
        const { data } = res;
        console.log(data);
        this.setState({ data });
      })
      .catch((err) => alert(err.toString()))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { data, loading } = this.state;
    if (loading) {
      return <div>LOADING....</div>;
    } else {
      return (
        <Layout title={"Home"}>
          <div>Title: {data.title}</div>
          {data.genres.map((item) => (
            <div key={item.id} className="bg-black p-3">
              <p className="text-white">{item.name}</p>
            </div>
          ))}
          <div>Overview: {data.overview}</div>
        </Layout>
      );
    }
  }
}

export default withRouter(Detail);
