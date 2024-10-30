import React from "react";
import preowned from "./CSS/preowned.jpg"
import './CSS/Sell.css'
import Footer from "../Components/Footer/Footer";
const Sell=()=>{
    return(
        <div>
            <div className="sell-page">
                <img src={preowned} alt="" />
                <div className="sell-item-container">
                    <h1>Sell Your Pre-owned and New Watches</h1>
                    <div className="product-fields">
                    <label>Enter Products Name:</label>
                    <input type="text" placeholder="Name"/>
                    <label>Enter Products Brand :</label>
                    <input type="email" placeholder="Brand"/>
                    <label>Enter Products Model:</label>
                    <input type="phone-number" placeholder="Model"/>
                    <label>Enter Product Condition:</label>
                    <input type="text" placeholder="Condition"/>
                    <label>Enter Auction Time:</label>
                    <input type="text" placeholder="Auction time"/>
                    <div className="sell-product-agree">
                        <input type="checkbox" name="" id="" />
                        <label>By Continuing, I agree to the terms and condition mentioned below</label>
                    <button>Create Product</button>
                    </div>
                    </div>   
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Sell;