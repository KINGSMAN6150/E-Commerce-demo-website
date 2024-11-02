// In Product.jsx
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../Context/Context";
import "./CSS/Product.css";

const Product = () => {
    const { user } = useContext(ShopContext);
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/buy/watches/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to load product');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

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
                    productId: product.id,
                    bidAmount: numericBid
                },
                {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                }
            );
    
            // Update the product state with the new bid information from the server
            setProduct(prevProduct => ({
                ...prevProduct,
                starting_bid: response.data.newBidAmount // Assuming the server returns the new bid amount
            }));
    
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
            <div className="product-details">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p><strong>Brand:</strong> {product.brand}</p>
                    <p><strong>Model:</strong> {product.model}</p>
                    <p><strong>Condition:</strong> {product.condition}</p>
                    <p><strong>Current Bid:</strong> ${product.starting_bid}</p>
                    <p><strong>Auction Ends:</strong> {new Date(product.auction_end_time).toLocaleString()}</p>
                    <p className="description"><strong>Description:</strong> {product.description}</p>
                    <button className="bid-button" onClick={handleBid}>
                        Place Bid
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;