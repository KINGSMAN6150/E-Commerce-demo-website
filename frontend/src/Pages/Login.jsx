// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import '../Pages/CSS/Login.css'; // Import your CSS for styling
import Footer from "../Components/Footer/Footer";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };
        
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', userData);
            console.log('Login successful:', res.data);
            // Redirect to the login success page
            navigate('/loginsuccess'); // This will navigate to the login success page
        } catch (error) {
            console.error('Login error:', error);
            
            // Check if error response exists
            if (error.response && error.response.data) {
                alert(error.response.data.message || 'An unexpected error occurred.');
            } else {
                alert('An unexpected error occurred. Please try again later.');
            }
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
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
