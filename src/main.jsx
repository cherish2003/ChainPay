import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { SidebarProvider } from "./context/SidebarContext.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./utils/Redux/store.js";
import { WalletProvider } from "./context/WalletContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <SidebarProvider>
          <WalletProvider>
            <App />
            <Toaster />
          </WalletProvider>
        </SidebarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
