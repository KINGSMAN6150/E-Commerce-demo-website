import React from "react";
import './Hero.css'
import first from '../Assests/first.webp'
const Hero=()=>{
    return(
    <div className="hero">
        <div className="hero-left">
                <h2>LATEST WATCHES ON AUCTION</h2>
            <div className="hero-latest-btn">
                <div>Collection For Elites</div>
            </div>
        </div>
        <div className="hero-right">
                <img src={first} alt="" />
        </div>
    </div>
    
    )
}
export default Hero;