// In frontend/src/Pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/Context";
import '../Pages/CSS/Login.css';
import Footer from "../Components/Footer/Footer";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility toggle
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();
    const { login } = useContext(ShopContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when starting the login request
        const success = await login(email, password);
        setLoading(false); // Stop loading after login attempt completes
        if (success) {
            navigate('/home');
        } else {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div>
            <div className="login">
                <h1>Login</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Password:</label>
                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="show-password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
