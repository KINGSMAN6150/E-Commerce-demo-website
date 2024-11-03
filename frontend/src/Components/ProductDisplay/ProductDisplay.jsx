// frontend/src/Components/ProductDisplay/ProductDisplay.jsx
import React, { useContext } from "react";
import './ProductDisplay.css';
import { ShopContext } from "../../Context/Context";
import axios from 'axios';

const ProductDisplay = (props) => {
    const { product } = props;
    const { user } = useContext(ShopContext);

    const handleAddToReminder = async () => {
        if (!user) {
            alert("Please login to add reminders");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/reminder/send-reminder', {
                userEmail: user.email,
                productDetails: {
                    name: product.name,
                    brand: product.brand,
                    starting_bid: product.starting_bid,
                    auction_end_time: product.auction_end_time
                }
            });

            if (response.status === 200) {
                alert("Watch added to reminders successfully!");
            }
        } catch (error) {
            console.error('Error adding to reminder:', error);
            alert("Failed to add reminder. Please try again.");
        }
    };

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Model:</strong> {product.model}</p>
                <p><strong>Starting Bid:</strong> ${product.starting_bid}</p>
                <p><strong>Condition:</strong> {product.condition}</p>
                <p><strong>Auction End Time:</strong> {new Date(product.auction_end_time).toLocaleString()}</p>
                
                <button onClick={handleAddToReminder} className="reminder-button">
                    Add to Reminder
                </button>
            </div>
        </div>
    );
};

export default ProductDisplay;