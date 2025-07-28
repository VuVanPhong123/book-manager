import { Link } from 'react-router-dom';
import "./component.css";

const Navbar = () => {
  return (
    <nav className="navBar">
      <Link className="navButton" to="/">
        Home
      </Link>
      <Link className="navButton" to="/books">
        Booklist
      </Link>
    </nav>
  );
};

export default Navbar;