import React from "react";
import './Quote.css'
import back from '../Assests/back.jpeg'
const Quote=()=>{
    return(
        <div className="quote">
            <div className="quote-left">
                <h1>It doesn't </h1>
                <h1>just tell time</h1>
                <h1>It tells HISTORY</h1>
                <button>Get it now</button>
            </div>
            <div className="quote-right">
                <img src={back} alt="" />
            </div>
        </div>
    )
}
export default Quote;