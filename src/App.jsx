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
import DumCOm from "./components/DumCom";
import BlockTable from "./components/dasboardFunc/BlockTable";
import ContractEvents from "./components/getLastesTrans";
import PaymentIntegration from "./components/dasboardFunc/PaymentPages/PaymentIntegration";
import PaymentFlow from "./components/dasboardFunc/PaymentPages/PaymentFlow";
import LinkPage from "../src/components/dasboardFunc/PaymentPages/Linkpage";
import EthPage from "../src/components/dasboardFunc/PaymentPages/EthPage";
import TokenPay from "../src/components/dasboardFunc/PaymentPages/TokenPay";

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
                <BlockTable />
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
        {/* //adding here */}
        <Route element={<BaseLayout />}>
          <Route
            path="/webIntegration"
            element={
              <>
                <PaymentIntegration />
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

        {/* adding paymentFlowHere */}
        <Route element={<BaseLayout />}>
          <Route
            path="/paymentMethod"
            element={
              <>
                <PaymentFlow />
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
            path="/payment-link"
            element={
              <>
                <LinkPage />
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
            path="/payment-eth"
            element={
              <>
                <EthPage />
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
            path="/payment-token"
            element={
              <>
                <TokenPay />
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
        <Route path="/dum" element={<DumCOm />}></Route>
        <Route path="/selectMerchant" element={<SelectMerchant />}></Route>
        <Route path="/xyz" element={ContractEvents}></Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
