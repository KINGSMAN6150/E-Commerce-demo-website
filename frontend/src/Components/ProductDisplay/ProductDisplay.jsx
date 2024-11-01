import React, { useContext } from "react";
import './ProductDisplay.css';
import Footer from '../Footer/Footer';
import { ShopContext } from "../../Context/Context";

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart, sendReminderEmail } = useContext(ShopContext);

    // Handle the 'Add to Reminder' action, which adds to the cart and sends a reminder email
    const handleAddToReminder = () => {
        addToCart(product.id);
        sendReminderEmail(product.id);
    };

    return (
        <div>
            <div className="productdisplay">
                <div className="productdisplay-left">
                    <div className="productdisplay-img"> 
                        <img src={product.image} alt="" />
                    </div>
                </div>
                <div className="productdisplay-right">
                    <label>Product Name:</label>
                    <h1>{product.name}</h1>
                    <label>Product Brand:</label>
                    <p>{product.brand}</p>
                    <label>Product Model:</label>
                    <p>{product.model}</p>
                    <label>Product Starting Bid:</label>
                    <p>{product.starting_bid}</p>
                    <label>Product Currency:</label>
                    <p>{product.currency}</p>
                    <label>Product Condition:</label>
                    <p>{product.condition}</p>
                    <label>Product Auction End Time:</label>
                    <p>{product.auction_end_time}</p>
                    <button onClick={handleAddToReminder}>Add to Reminder</button>
                    <button>Bid</button>
                </div>
            </div>
            <div className="description">
                <label>Description:</label>
                <p>{product.description}</p>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDisplay;
