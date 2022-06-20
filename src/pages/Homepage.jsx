import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Lottie from "lottie-react";
import axios from "axios";

import { TestContext } from "../utils/context";
import { reduxAction } from "../utils/redux/actions/action";
import CinemaLoading from "../assets/animations/cinema_animation.json";
import Layout from "../components/Layout";
import { Card } from "../components/Card";
import { withRouter } from "../utils/navigation";
import { useFetchGet } from "../utils/customHooks";

import "../styles/App.css";

const Homepage = (props) => {
  const dispatch = useDispatch();
  const data = useFetchGet(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  );
  const valueCtx = useContext(TestContext);
  /*
  const [state, setState] = useState(initialValue)
  */
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // console.log("TESTING");
  }, [page]);

  /*
  1. tanpa empty scope -> selalu dijalankan
  useEffect(() => {
  })

  2. ditambahkan empty scope -> hanya dijalankan sekali saja setelah component di render
  useEffect(() => {
  }, [])

  3. ditambahkan dependency didalam scope -> dijalankan setiap kali ada perubahan dependency
  useEffect(() => {
  }, [state])
  */

  async function fetchData() {
    var config = {
      method: "get",
      url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const fetch = await axios(config);
    setMovies(fetch.data.results);
    setLoading(false);
    // axios
    //   .get(
    //     `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    //   )
    //   .then((res) => {
    //     const { results } = res.data;
    //     console.log(results);
    //     const stringify = JSON.stringify(results); // JS value -> JSON string
    //     // console.log(results);
    //     // console.log(stringify);
    //     // console.log(JSON.parse(stringify)); // JSON string -> JS value
    //     // console.log(results);
    //     setMovies(results);
    //   })
    //   .catch((err) => alert(err.toString()))
    //   .finally(() => setLoading(false));
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
        setMovies(temp);
        setPage(newPage);
      })
      .catch((err) => alert(err.toString()));
    // .finally(() => setLoading(false));
  }

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${e.target.value}&page=1&include_adult=false`
        )
        .then((res) => {
          const { results } = res.data;
          setMovies(results);
        })
        .catch((err) => alert(err.toString()));
    }
  };

  const handleFav = (item) => {
    const tempLocal = localStorage.getItem("favMovie");
    if (tempLocal) {
      const temp = JSON.parse(tempLocal);
      /*
      cek item yang diinputkan ada di local storage atau tidak (find)
      kalau gak ada, push ke local storage
      kalau ada, kasih alert
      */
      temp.push(item);
      localStorage.setItem("favMovie", JSON.stringify(temp));
      dispatch(reduxAction("SET_FAVORITES", temp));
    } else {
      localStorage.setItem("favMovie", JSON.stringify([item]));
      dispatch(reduxAction("SET_FAVORITES", [item]));
    }
    alert("Added to favorite");
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
          {movies.map((item) => (
            <Card
              key={item.id}
              titleItem={item.title}
              imgItem={item.poster_path}
              onClickItem={() => navigate(`/movie/${item.id}`)}
              onClickFav={() => handleFav(item)}
              item={item}
            />
          ))}
        </div>
        <button onClick={() => fetchData2()}>Load More</button>
      </Layout>
    );
  }
};

export default withRouter(Homepage);
