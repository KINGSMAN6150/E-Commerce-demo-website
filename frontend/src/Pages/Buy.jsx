// frontend/src/Pages/Buy.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Collection from "../Components/Collection/Collection";
import Receive from "../Components/Receive/Receive";
import Footer from "../Components/Footer/Footer";
import collection_product from "../Components/Assests/collection";
import { ShopContext } from "../Context/Context";
import './CSS/Buy.css';

const Buy = () => {
    const { user } = useContext(ShopContext);
    const [watches, setWatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWatches = async () => {
            try {
                // Fetch new watches added through the sell functionality
                const response = await axios.get('http://localhost:3000/api/buy/watches');
                
                // Combine static collection with uploaded watches
                const uploadedWatches = response.data.map(watch => ({
                    ...watch,
                    id: watch._id, // Ensure ID is properly mapped
                    image: watch.image.startsWith('http') 
                        ? watch.image 
                        : `http://localhost:3000${watch.image}` // Construct full image URL if necessary
                }));

                const allWatches = [...collection_product, ...uploadedWatches];
                setWatches(allWatches);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching watches:', error);
                setError('Failed to load watches');
                setLoading(false);
            }
        };
        fetchWatches();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="buy-page">
            <h1>Buy Pre-owned and New Watches</h1>
            <div className="watches-grid">
                {watches.map((watch) => (
                    <div key={watch.id} className="watch-card">
                        <Link to={`/product/${watch.id}`}>
                            <img src={watch.image} alt={watch.name} />
                        </Link>
                        <div className="watch-details">
                            <h2>{watch.name}</h2>
                            <p><strong>Brand:</strong> {watch.brand}</p>
                            <p><strong>Model:</strong> {watch.model}</p>
                            <p><strong>Condition:</strong> {watch.condition}</p>
                            <p><strong>Current Bid:</strong> ${watch.starting_bid}</p>
                            <p><strong>Auction Ends:</strong> {new Date(watch.auction_end_time).toLocaleString()}</p>
                            <Link to={`/product/${watch.id}`} className="view-details-button">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <Receive />
            <Footer />
        </div>
    );
};

export default Buy;
