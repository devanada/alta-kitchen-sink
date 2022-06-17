import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import axios from "axios";

import CinemaLoading from "../assets/animations/cinema_animation.json";
import Layout from "../components/Layout";
import { Card } from "../components/Card";
import { withRouter } from "../utils/navigation";

import "../styles/App.css";

const Homepage = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("TESTING");
  }, [page]);

  /*
  1. tanpa empty scope -> selalu dijalankan
  useEffect(() => {
  })

  2. ditambahkan empty scope -> hanya dijalankan sekali saja
  useEffect(() => {
  }, [])

  3. ditambahkan dependency didalam scope -> dijalankan setiap kali ada perubahan dependency
  useEffect(() => {
  }, [state])
  */

  function fetchData() {
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
        setData(results);
      })
      .catch((err) => alert(err.toString()))
      .finally(() => setLoading(false));
  }

  function fetchData2() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const newPage = page + 1;
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=0e6ab6977a441feefe861571f011429c&language=en-US&page=${page}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        const { results } = res;
        const temp = data.slice(); // copy the array/duplicate the array
        temp.push(...results); // add the new data with push
        setData(temp);
        setPage(newPage);
      })
      .catch((err) => alert(err.toString()));
    // .finally(() => setLoading(false));
  }

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=0e6ab6977a441feefe861571f011429c&language=en-US&query=${e.target.value}&page=1&include_adult=false`
        )
        .then((res) => {
          const { results } = res.data;
          setData(results);
        })
        .catch((err) => alert(err.toString()));
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="w-1/2 h-full flex items-center justify-center">
          <Lottie loop autoplay animationData={CinemaLoading} />
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout onKeyDown={(e) => handleSearch(e)}>
        <div className="grid grid-flow-row auto-rows-max grid-cols-2 md:grid-cols-4 lg:grid-cols-5 m-2 gap-3">
          {data.map((item) => (
            <Card
              key={item.id}
              titleItem={item.title}
              imgItem={item.poster_path}
              onClickItem={() => navigate(`/movie/${item.id}`)}
              onClickFav={() => setPage(page + 1)}
            />
          ))}
        </div>
        <button onClick={() => fetchData2()}>Load More</button>
      </Layout>
    );
  }
};

export default withRouter(Homepage);
