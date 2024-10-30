import React from "react";
import './Receive.css'
const Receive=()=>
{
    return(
        <div className="receive">
            <h1>Get reminder on your email</h1>
            <p>Subscribe to our reminder and stay updated</p>
            <div>
                <input type="email" placeholder="Your Email ID" />
                <div>
                <button>Subscribe</button>
                </div>
            </div>
        </div>
    )
}
export default Receive;