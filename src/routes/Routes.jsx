import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { TestContext, ThemeContext } from "../utils/context";
import { reduxAction } from "../utils/redux/actions/action";
import HomePage from "../pages/Homepage";
import Favourites from "../pages/Favourites";
import TestingScreen from "../pages/TestingScreen";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const App = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("light");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const tempLocal = localStorage.getItem("favMovie");
    if (tempLocal) {
      dispatch(reduxAction("SET_FAVORITES", JSON.parse(tempLocal)));
    }
  }, []);

  return (
    <ThemeContext.Provider value={background}>
      <TestContext.Provider value="TEST">
        <BrowserRouter>
          <Routes>
            {/* :movie_id -> path parameter */}
            {/* query param tidak kita define didalam file Routes */}
            <Route path="/" element={<Navigate to="/homepage" />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/movie/:movie_id" element={<Detail />} />
            <Route path="/testing" element={<TestingScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </TestContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
