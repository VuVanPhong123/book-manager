import UserProfile from '../../components/User/UserProfile';
import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('other');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [socialId, setSocialId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [check, setCheck] = useState(localStorage.getItem('check') === 'true');

  // Đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_id', data.user.id);
        localStorage.setItem('user_email', data.user.email);
        localStorage.setItem('user_username', data.user.username);
        localStorage.setItem('user_name', data.user.name || '');
        localStorage.setItem('user_gender', data.user.gender || '');
        localStorage.setItem('user_age', data.user.age || '');
        localStorage.setItem('user_phone', data.user.phone || '');
        localStorage.setItem('user_socialId', data.user.socialId || '');
        localStorage.setItem('check', 'true');

        setCheck(true);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Login error:', error);
    }
  };

  // Đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            username, 
            email, 
            password,
            name,
            gender,
            age: age ? parseInt(age) : undefined,
            phone,
            socialId,
        }),
        });

        const data = await response.json();

        if (response.ok) {
        alert('Register successful! Please login.');
        setIsLogin(true);
        setUsername('');
        setEmail('');
        setPassword('');
        setName('');
        setGender('other');
        setAge('');
        setPhone('');
        setSocialId('');
        } else {
        // Hiển thị thông báo lỗi cụ thể
        if (data.type === 'duplicate') {
            if (data.field === 'email') {
            setError('Email already exists. Please use a different email address.');
            } else if (data.field === 'username') {
            setError('Username already exists. Please choose a different username.');
            } else {
            setError('User already exists. Please try different credentials.');
            }
        } else if (data.type === 'validation' && data.errors) {
            setError(data.errors[0].msg || 'Please check your input fields.');
        } else {
            setError(data.message || 'Registration failed. Please try again.');
        }
        }
    } catch (error) {
        setError('Network error. Please try again.');
        console.error('Register error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_username');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_gender');
    localStorage.removeItem('user_age');
    localStorage.removeItem('user_phone');
    localStorage.removeItem('user_socialId');
    localStorage.removeItem('check');
    setCheck(false);
  };

  const handleGuestLogin = () => {
    navigate('/bookFind');
  };

  if (!check)
    return (
      <div className="login-container">
        <div className="login-card">
          <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="subtitle">
            {isLogin ? 'Log in to access your account' : 'Sign up for a new account'}
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={isLogin ? handleLogin : handleRegister}>
            {!isLogin && (
              <>
                <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your username"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
              </>
            )}

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {!isLogin && (
              <>
                <div className="input-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Your age"
                    min="1"
                    max="120"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Your phone number"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="socialId">Social ID</label>
                  <input
                    type="text"
                    id="socialId"
                    value={socialId}
                    onChange={(e) => setSocialId(e.target.value)}
                    placeholder="Your social ID"
                  />
                </div>
              </>
            )}

            <button type="submit" className="login-button">
              {isLogin ? 'Log in' : 'Register'}
            </button>
          </form>

          <div className="toggle-auth">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <span className="auth-toggle-link" onClick={() => setIsLogin(false)}>Register</span>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <span className="auth-toggle-link" onClick={() => setIsLogin(true)}>Log in</span>
              </p>
            )}
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          <button onClick={handleGuestLogin} className="guest-button">
            Continue as Guest
          </button>
        </div>
      </div>
    );
  else
    return (
      <div className="profile-container">
        <UserProfile />
        <button className="logout-button" onClick={handleLogout}>
          Log Out
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
    );
};

export default Login;