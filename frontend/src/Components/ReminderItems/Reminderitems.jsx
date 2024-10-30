import React, { useContext } from "react";
import './Reminderitems.css';
import { ShopContext } from "../../Context/Context";

const Reminderitems = () => {
    const { all_product, cartItems, removeFromCart } = useContext(ShopContext);
    
    return (
        <div className="reminderitems">
            <div className="reminderitems-format-main">
                <p>Product:</p>
                <p>Name:</p>
                <p>Starting Bid:</p>
                <p>Time:</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="reminderitems-format">
                                <img src={e.image} alt={e.name} className="remindericon-product-icon" />
                                <p>{e.name}</p>
                                <p>${e.starting_bid}</p>
                                <p>{e.auction_end_time}</p>
                                <button onClick={() => removeFromCart(e.id)}>Remove</button>
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null; // Return null when the item is not in the cart to avoid rendering an undefined
            })}
        </div>
    );
};

export default Reminderitems;
