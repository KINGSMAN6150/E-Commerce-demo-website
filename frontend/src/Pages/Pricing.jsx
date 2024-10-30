import React from "react";
import './CSS/Pricing.css';
import watch1 from '../Components/Assests/data_images/1.jpg'; // Add paths to your watch images
import watch2 from '../Components/Assests/data_images/2.jpg';
import watch3 from '../Components/Assests/data_images/3.jpg';
import Footer from "../Components/Footer/Footer";

const Pricing = () => {
    return (
        <div>
        <div className="pricing-page">
            <h1>Watch Auction Pricing Plans</h1>
            <p>Choose the best plan that suits your needs!</p>
            
            <div className="pricing-plans">
                <div className="plan">
                    <h2>Basic Plan</h2>
                    <img src={watch1} alt="Basic Watch" />
                    <p>Starting Bid: $100</p>
                    <ul>
                        <li>Access to basic watch listings</li>
                        <li>Limited bidding options</li>
                        <li>Email notifications</li>
                    </ul>
                    <button>Get Started</button>
                </div>
                
                <div className="plan">
                    <h2>Premium Plan</h2>
                    <img src={watch2} alt="Premium Watch" />
                    <p>Starting Bid: $500</p>
                    <ul>
                        <li>Access to all watch listings</li>
                        <li>Priority bidding</li>
                        <li>Personalized notifications</li>
                    </ul>
                    <button>Get Started</button>
                </div>
                
                <div className="plan">
                    <h2>Elite Plan</h2>
                    <img src={watch3} alt="Elite Watch" />
                    <p>Starting Bid: $1000</p>
                    <ul>
                        <li>Exclusive access to rare watches</li>
                        <li>Unlimited bidding</li>
                        <li>Concierge service for watch purchases</li>
                    </ul>
                    <button>Get Started</button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
    );
};

export default Pricing;
