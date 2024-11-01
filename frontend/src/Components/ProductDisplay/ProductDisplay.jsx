import React, { useContext, useState } from "react";
import './ProductDisplay.css';
import Footer from '../Footer/Footer';
import { ShopContext } from "../../Context/Context";

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart, sendReminderEmail, placeBid, bids, user } = useContext(ShopContext);
    const [bidAmount, setBidAmount] = useState('');

    const currentBid = bids[product.id]?.amount || product.starting_bid;

    const handleAddToReminder = () => {
        addToCart(product.id);
        sendReminderEmail(product.id);
        alert("Product added to reminders and email sent!");
    };

    const handleBid = (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login to place a bid");
            return;
        }

        const newBid = parseFloat(bidAmount);
        if (newBid > currentBid) {
            if (placeBid(product.id, newBid)) {
                alert("Bid placed successfully!");
                setBidAmount('');
            } else {
                alert("Bid could not be placed. Please try again.");
            }
        } else {
            alert("Bid amount must be higher than the current bid.");
        }
    };

    return (
        <div>
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
                    <p><strong>Currency:</strong> {product.currency}</p>
                    <p><strong>Condition:</strong> {product.condition}</p>
                    <p><strong>Auction End Time:</strong> {product.auction_end_time}</p>
                    <button onClick={handleAddToReminder}>Add to Reminder</button>
                    
                    <div className="bidding-section">
                        <h3>Current Bid: ${currentBid}</h3>
                        {user ? (
                            <form onSubmit={handleBid}>
                                <input
                                    type="number"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                    placeholder="Enter bid amount"
                                    min={currentBid + 1}
                                    max="10000"
                                    step="0.01"
                                    required
                                />
                                <button type="submit">Place Bid</button>
                            </form>
                        ) : (
                            <p>Please login to place a bid</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="description">
                <h3>Description:</h3>
                <p>{product.description}</p>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDisplay;
