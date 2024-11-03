// frontend/src/Pages/Product.jsx
import React, { useContext, useEffect, useState } from "react";
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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // First check if product exists in static collection
                const staticProduct = collection_product.find(p => p.id.toString() === productId);
                
                if (staticProduct) {
                    setProduct(staticProduct);
                } else {
                    // If not in static collection, fetch from API
                    const response = await axios.get(`http://localhost:3000/api/buy/watches/${productId}`);
                    const watchData = response.data;
                    // Ensure image URL is complete
                    watchData.image = watchData.image.startsWith('http') 
                        ? watchData.image 
                        : `http://localhost:3000${watchData.image}`;
                    setProduct(watchData);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

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
                alert("Reminder set successfully!");
            }
        } catch (error) {
            console.error('Error setting reminder:', error);
            alert("Failed to set reminder. Please try again.");
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
                    <p><strong>Starting Bid:</strong> ${product.starting_bid}</p>
                    <p><strong>Auction Ends:</strong> {new Date(product.auction_end_time).toLocaleString()}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    
                    <button 
                        className="reminder-button" 
                        onClick={handleAddToReminder}
                    >
                        Add to Reminder
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Product;