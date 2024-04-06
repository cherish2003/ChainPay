import { useContext, useEffect } from "react";
import "./App.scss";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import { AreaTable } from "./components";
import HomePage from "./HomePage";
import SelectMerchant from "./components/dasboardFunc/SelectMerchant";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route
            path="/dashboard"
            element={
              <>
                <Dashboard />
                <button
                  type="button"
                  className="theme-toggle-btn"
                  onClick={toggleTheme}
                >
                  <img
                    className="theme-icon"
                    src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
                  />
                </button>
              </>
            }
          />
        </Route>
        <Route element={<BaseLayout />}>
          <Route
            path="/selectMerchant"
            element={
              <>
                <SelectMerchant />
                <button
                  type="button"
                  className="theme-toggle-btn"
                  onClick={toggleTheme}
                >
                  <img
                    className="theme-icon"
                    src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
                  />
                </button>
              </>
            }
          />
        </Route>

        <Route element={<BaseLayout />}>
          <Route
            path="/integrate"
            element={
              <>
                <button
                  type="button"
                  className="theme-toggle-btn"
                  onClick={toggleTheme}
                >
                  <img
                    className="theme-icon"
                    src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
                  />
                </button>
              </>
            }
          />
        </Route>

        <Route path="/" element={<HomePage />}></Route>
        <Route path="/selectMerchant" element={<SelectMerchant />}></Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
