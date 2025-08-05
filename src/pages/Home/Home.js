import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to Our Digital Library</h1>
          <p>Discover thousands of books at your fingertips</p>
          <div className="cta-buttons">
            <Link to="/books" className="cta-button browse-btn">Find Books</Link>
            <Link to="/login" className="cta-button login-btn">Login</Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><i class="fa-solid fa-book"></i></div>
            <h3>Extensive Collection</h3>
            <p>Access thousands of books across all genres</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
            <h3>Easy Search</h3>
            <p>Find exactly what you're looking for</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i class="fa-solid fa-laptop"></i></div>
            <h3>Digital Access</h3>
            <p>Read anytime, anywhere</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;