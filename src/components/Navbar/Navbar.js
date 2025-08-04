import { Link } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navBar">
      <Link className="navButton" to="/">
        Home
      </Link>
      <Link className="navButton" to="/books">
        Booklist
      </Link>
      <Link className='navButton' to = "/bookFind">
        Find Book
      </Link>
    </nav>
  );
};

export default Navbar;