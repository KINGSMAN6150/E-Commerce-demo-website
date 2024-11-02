// frontend/src/Pages/Product.jsx
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../Context/Context";
import collection_product from "../Components/Assests/collection";
import Footer from "../Components/Footer/Footer";
import "./CSS/Product.css";

const Product = () => {
    const { productId } = useParams();
    const { user } = useContext(ShopContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bidHistory, setBidHistory] = useState([]);

    const fetchBidHistory = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/bids/product/${productId}/bids`);
            setBidHistory(response.data);
        } catch (error) {
            console.error('Error fetching bid history:', error);
        }
    }, [productId]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const staticProduct = collection_product.find(p => p.id.toString() === productId);
                
                if (staticProduct) {
                    setProduct(staticProduct);
                    setLoading(false);
                } else {
                    const response = await axios.get(`http://localhost:3000/api/buy/watches/${productId}`);
                    const watchData = response.data;
                    watchData.image = watchData.image.startsWith('http') 
                        ? watchData.image 
                        : `http://localhost:3000${watchData.image}`;
                    setProduct(watchData);
                    setLoading(false);
                }
                await fetchBidHistory();
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to load product');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId, fetchBidHistory]);

    const handleBid = async () => {
        if (!user) {
            alert("Please login to place a bid");
            return;
        }

        const bidAmount = prompt("Enter your bid amount:");
        if (!bidAmount) return;

        const numericBid = parseFloat(bidAmount);
        if (isNaN(numericBid) || numericBid <= product.starting_bid) {
            alert("Please enter a valid bid amount higher than the current bid");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:3000/api/bids/place-bid`,
                { 
                    productId: product._id || product.id, 
                    bidAmount: numericBid 
                },
                { headers: { 'x-auth-token': localStorage.getItem('token') } }
            );

            setProduct(prevProduct => ({
                ...prevProduct,
                starting_bid: response.data.currentBid
            }));
            await fetchBidHistory();
            alert("Bid placed successfully!");
        } catch (error) {
            console.error('Error placing bid:', error);
            alert(error.response?.data?.message || "Error placing bid. Please try again.");
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!product) return <div className="error">Product not found</div>;

    return (
        <div className="product-page">
            <div className="product-container">
                <div className="product-image">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="product-details">
                    <h1>{product.name}</h1>
                    <p><strong>Brand:</strong> {product.brand}</p>
                    <p><strong>Model:</strong> {product.model}</p>
                    <p><strong>Condition:</strong> {product.condition}</p>
                    <p><strong>Current Bid:</strong> ${product.starting_bid}</p>
                    <p><strong>Auction Ends:</strong> {new Date(product.auction_end_time).toLocaleString()}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    {user ? (
                        <button className="bid-button" onClick={handleBid}>
                            Place Bid
                        </button>
                    ) : (
                        <p className="login-message">Please login to place a bid</p>
                    )}
                    <div className="bid-history">
                        <h2>Bid History</h2>
                        {bidHistory.length > 0 ? (
                            <ul>
                                {bidHistory.map((bid, index) => (
                                    <li key={index}>
                                        ${bid.amount} by {bid.userId.name} on {new Date(bid.timestamp).toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No bids yet</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Product;