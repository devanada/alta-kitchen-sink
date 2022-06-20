import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { withRouter } from "../utils/navigation";

import { ThemeContext } from "../utils/context";

const CustomHeader = (props) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = (mode) => {
    setTheme(mode);
  };

  return (
    <nav className="sticky top-0 w-full px-2 py-2.5 bg-zinc-800 flex justify-between">
      <div className="text-white">
        <Link to="/">Homepage</Link>
      </div>
      <div>
        <label class="relative block">
          <span class="sr-only">Search</span>
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
          </span>
          <input
            class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="text"
            name="search"
            onKeyDown={props.onKeyDown}
          />
        </label>
      </div>
      {theme === "dark" ? (
        <FaSun
          className="w-8 h-8 text-white"
          onClick={() => handleThemeChange("light")}
        />
      ) : (
        <FaMoon
          className="w-8 h-8 text-white"
          onClick={() => handleThemeChange("dark")}
        />
      )}
      <div className="text-white">
        <Link to="/favourites">Favorites</Link>
      </div>
    </nav>
  );
};

export default withRouter(CustomHeader);
