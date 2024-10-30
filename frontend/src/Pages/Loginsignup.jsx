import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CSS/Loginsignup.css';
import group from './CSS/group.jpg';
import Footer from '../Components/Footer/Footer';
import './CSS/SlidingPanel.css'; // Import CSS for sliding panel

const Loginsignup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [firstLetter, setFirstLetter] = useState('');
    const [panelOpen, setPanelOpen] = useState(false); // State for panel visibility
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSignup = async (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            phone,
            password,
        };

        try {
            const res = await axios.post('http://localhost:3000/api/auth/signup', userData);
            console.log('Signup successful:', res.data);
            setFirstLetter(name.charAt(0).toUpperCase());
        } catch (error) {
            console.error('Signup error:', error);

            if (error.response && error.response.data) {
                console.error('Error response:', error.response.data);
                alert(error.response.data.message || 'An unexpected error occurred.');
            } else {
                alert('An unexpected error occurred. Please try again later.');
            }
        }
    };

    const togglePanel = () => {
        setPanelOpen(!panelOpen); // Toggle the panel's visibility
    };

    return (
        <div>
            <div className="loginsignup">
                <img src={group} alt="" />
                <div className="loginsignup-container">
                    <h1>Sign Up</h1>
                    <form className="loginsignup-fields" onSubmit={handleSignup}>
                        <label>Enter Your Name:</label>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Enter Your Email:</label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Enter Your Phone Number:</label>
                        <input
                            type="text"
                            placeholder="Enter Your Phone no."
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <label>Enter Your Password:</label>
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className="loginsignup-login">
                            {firstLetter ? `Welcome, ${firstLetter}` : 'Already Have An Account?'}
                        </p>
                        {firstLetter ? (
                            <span className="first-letter">{firstLetter}</span>
                        ) : (
                            <a href="/login" onClick={(e) => { 
                                e.preventDefault(); // Prevent default anchor behavior
                                navigate('/login'); // Use navigate to redirect
                            }}>Login Here</a>
                        )}
                        <div className="loginsignup-agree">
                            <input type="checkbox" name="" id="" required />
                            <label>By Continuing, I agree to the terms and conditions mentioned below</label>
                            <button type="submit">Continue</button>
                        </div>
                    </form>
                    {firstLetter && ( // Only show the button if the user is signed up
                        <button onClick={togglePanel} className="panel-toggle-button">
                            {panelOpen ? 'Close Menu' : 'Open Menu'}
                        </button>
                    )}
                    {panelOpen && (
                        <div className="sliding-panel">
                            <ul>
                                <li>Account Details</li>
                                <li>Products</li>
                                <li>Log Out</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Loginsignup;
