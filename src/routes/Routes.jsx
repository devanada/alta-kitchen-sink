import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../pages/Homepage";
import TestingScreen from "../pages/TestingScreen";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          {/* :movie_id -> path parameter */}
          {/* query param tidak kita define didalam file Routes */}
          <Route path="/" element={<Navigate to="/homepage" />} />
          <Route path="/homepage" element={<HomePage />} />
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
    );
  }
}
