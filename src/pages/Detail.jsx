import React, { useState, useEffect } from "react";
import axios from "axios";

import { withRouter } from "../utils/navigation";
import Layout from "../components/Layout";
import { useFetchGet } from "../utils/customHooks";

import "../styles/Detail.css";

const Detail = (props) => {
  const data = useFetchGet(
    `https://api.themoviedb.org/3/movie/${props.params.movie_id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
  );
  const [movie, setMovie] = useState({});
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const { movie_id } = props.params;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
      )
      .then((res) => {
        const { data } = res;
        setVideos(data.videos.results);
        setMovie(data);
      })
      .catch((err) => alert(err.toString()))
      .finally(() => setLoading(false));
  };

  console.log("TEST", data);

  if (loading) {
    return <div>LOADING....</div>;
  } else {
    return (
      <Layout title={"Home"}>
        <div>Title: {movie.title}</div>
        {movie.genres.map((item) => (
          <div key={item.id} className="bg-black p-3">
            <p className="text-white">{item.name}</p>
          </div>
        ))}
        <div>Overview: {movie.overview}</div>
        {videos.map((item) => (
          <iframe
            key={item.id}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${item.key}`}
            title={item.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ))}
      </Layout>
    );
  }
};

export default withRouter(Detail);
