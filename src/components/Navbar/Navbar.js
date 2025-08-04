import { Link } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navBar">
      <button className="navButton">
        <Link to="/home">Home</Link>
      </button>
      <button className="navButton">
        <Link to="/books">Book list</Link>
      </button>
      <button className="navButton">
        <Link to="/bookFind">Find Book</Link>
      </button>
      <button className="navButton">
        <Link to="/bookManage">Book Manager</Link>
      </button>
      <button className="navButton">
        <Link to="/logIn">Account</Link>
      </button>
    </nav>
  );
};
export default Navbar;