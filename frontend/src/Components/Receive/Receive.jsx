import React, { useState } from "react";
import './Receive.css'
import axios from 'axios';

const Receive = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            // Either use the response variable or remove it
            await axios.post('http://localhost:3000/api/email/subscribe', {
                email: email
            });
            setMessage("Successfully subscribed! Check your email for confirmation.");
            setEmail("");
        } catch (error) {
            setMessage("Failed to subscribe. Please try again.");
            console.error('Error:', error);
        }
    };

    return (
        <div className="receive">
            <h1>Get reminder on your email</h1>
            <p>Subscribe to our reminder and stay updated</p>
            <form onSubmit={handleSubscribe}>
                <div>
                    <input 
                        type="email" 
                        placeholder="Your Email ID" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div>
                        <button type="submit">Subscribe</button>
                    </div>
                </div>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    )
}

export default Receive;