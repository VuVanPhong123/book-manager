import { useState } from 'react';
import './Login.css'; 
import { useNavigate } from 'react-router-dom';
import account from "../../data/Account.json"
const Login= () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [check, setCheck] = useState(localStorage.getItem('check')==='true');  
  const handleLogin = (e) => {
    e.preventDefault(); 
    if (account.gmail === email && account.password === password){
        setCheck(true);
        localStorage.setItem('check', 'true');
        console.log('Logging in with:', { email, password });
        navigate('/');
    }
    else {
        setError('Invalid email or password');
    }
  };
  const handleLogout= ()=>{
    setCheck(false);
    localStorage.setItem('check', 'false');
  }
  const handleGuestLogin = () => {
    console.log(localStorage.getItem("check"))
    navigate('/home');
  };
    if(!check)
        return (
            <div className="login-container">
                <div className="login-card">
                    <h1>Welcome Back</h1>
                    <p className="subtitle">Log in to access your account</p>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleLogin} >
                        <div className="input-group">
                            <label htmlFor='email'>Email</label>
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

                        <button type="submit" className="login-button">
                            Log in
                        </button>
                    </form>

                    <div className="divider">
                        <span>or</span>
                    </div>

                    <button onClick={handleGuestLogin} className="guest-button">
                        Continue as Guest
                    </button>
                </div>
            </div>
        );
    else return(
        <button onClick={handleLogout}>log out</button>
    );
};

export default Login;