import { Link, useLocation } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navBar">
      <Link to="/">
        <button className={`navButton ${isActive("/home") ? "active" : ""}`}>
          <i class="fa-solid fa-house"></i> Home
        </button>
      </Link>
      <Link to="/books">
        <button className={`navButton ${isActive("/books") ? "active" : ""}`}>
          <i class="fa-solid fa-list"></i> Book list
        </button>
      </Link>
      <Link to="/bookFind">
        <button className={`navButton ${isActive("/bookFind") ? "active" : ""}`}>
          <i class="fa-solid fa-magnifying-glass"></i> Find Book
        </button>
      </Link>
      <Link to="/bookManage">
        <button className={`navButton ${isActive("/bookManage") ? "active" : ""}`}>
          <i class="fa-solid fa-table"></i> Book Manager
        </button>
      </Link>
      <Link to="/logIn">
        <button className={`navButton ${isActive("/logIn") ? "active" : ""}`}>
          <i class="fa-solid fa-user"></i> Account
        </button>
      </Link>
    </nav>
  );
};
export default Navbar;