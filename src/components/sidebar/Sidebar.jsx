import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import {
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineMessage,
  MdOutlinePeople,
  MdOutlineSettings,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = ({ child }) => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav
        className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
        ref={navbarRef}
      >
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />
            <span className="sidebar-brand-text">ADMIN</span>
          </div>
          <button className="sidebar-close-btn" onClick={closeSidebar}>
            <MdOutlineClose size={24} />
          </button>
        </div>
        <div className="sidebar-body">
          <div className="sidebar-menu">
            <ul className="menu-list">
              <li className="menu-item transform transition duration-300 hover:scale-105">
                <Link to="/dashboard" className="menu-link active">
                  <span className="menu-link-icon">
                    <MdOutlineGridView size={18} />
                  </span>
                  <span className="menu-link-text">Dashboard</span>
                </Link>
              </li>
              <li className="transform transition duration-300 hover:scale-105 menu-item">
                <Link to="/selectMerchant" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineBarChart size={20} />
                  </span>

                  <span className="menu-link-text">Select Blockchain</span>
                </Link>
              </li>
              <li className=" transform transition duration-300 hover:scale-105 menu-item">
                <Link to="/paymentMethod" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineAttachMoney size={20} />
                  </span>
                  <span className="menu-link-text">Payment</span>
                </Link>
              </li>
              <li className=" transform transition duration-300 hover:scale-105 menu-item">
                <Link to="/webINtegration" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineCurrencyExchange size={18} />
                  </span>
                  <span className="menu-link-text">Integrate</span>
                </Link>
              </li>
              <li className=" transform transition duration-300 hover:scale-105 menu-item">
                <Link to="/" className="menu-link">
                  <span className="menu-link-icon">
                    <MdOutlineShoppingBag size={20} />
                  </span>
                  <span className="menu-link-text">Home</span>
                </Link>
              </li>
              
            </ul>
          </div>

        
        </div>
      </nav>
      {child}
    </>
  );
};

export default Sidebar;
