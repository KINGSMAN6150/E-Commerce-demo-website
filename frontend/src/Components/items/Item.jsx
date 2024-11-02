import React from "react";
import './Item.css'
import { Link } from "react-router-dom";

const Item = (props) => {
    return (
        <div className="item">
            <Link to={`/product/${props.id}`}><img src={props.image} alt="" /></Link> 
            <p>{props.name}</p>
            <p>{props.brand}</p>
            <p>{props.description}</p>
            <p>{props.model}</p>
            <p>{props.condition}</p>
            <p>{props.auction_end_time}</p>
            <div className="price">
                <div className="starting_bid">
                    Starting Bid: ${props.starting_bid}
                </div>
                {props.current_bid && (
                    <div className="current_bid">
                        Current Bid: ${props.current_bid}
                    </div>
                )}
            </div>
            <button onClick={() => props.onBid(props.id)}>Place Bid</button>
        </div>
    )
}

export default Item;