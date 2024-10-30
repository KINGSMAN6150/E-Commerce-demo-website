import React from 'react';
import '../Pages/CSS/Aboutus.css';
import teamImage from '../Pages/CSS/team.jpg'; // Import an image for the team
import Footer from '../Components/Footer/Footer';

const AboutUs = () => {
    return (
        <div>
        <div className="about-us">
            <div className="about-us-banner">
                <img src={teamImage} alt="Our Team" className="banner-image"/>
            </div>
            <div className="about-us-content">
                <h1>About Us</h1>
                <p>
                    Welcome to Auction House, the premier online auction site for watch enthusiasts. 
                    We bring together collectors and sellers from all over the world to buy and sell 
                    unique and luxury watches. Our platform provides a secure, transparent, and easy-to-use 
                    experience for anyone interested in the world of horology.
                </p>
                <h2>Our History</h2>
                <p>
                    Founded in 2020, Auction House was started by a group of watch enthusiasts who 
                    wanted to create a marketplace dedicated exclusively to watches. Over the years, 
                    we have grown to become one of the most trusted auction platforms in the industry.
                </p>
                <h2>Our Mission</h2>
                <p>
                    Our mission is to provide a transparent and engaging auction experience where 
                    buyers and sellers can connect in a secure environment. We strive to offer the 
                    best selection of watches and the most user-friendly auction process.
                </p>
                <h2>Why Choose Us?</h2>
                <ul>
                    <li>Curated selection of luxury watches</li>
                    <li>Secure and transparent bidding process</li>
                    <li>Excellent customer support</li>
                    <li>Dedicated to watch enthusiasts worldwide</li>
                </ul>
            </div>
        </div>
        <Footer />
        </div>
    );
}

export default AboutUs;
