import React, { useEffect, useState } from "react";
import Collection from "../Components/Collection/Collection";
import Receive from "../Components/Receive/Receive";
import Footer from "../Components/Footer/Footer";
import axios from "axios";

const Buy = () => {
    const [watches, setWatches] = useState([]);

    useEffect(() => {
        const fetchWatches = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/buy/watches');
                setWatches(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchWatches();
    }, []);

    return (
        <div>
            <h1>Buy Pre-owned and New Watches</h1>
            <Collection watches={watches} />
            <Receive />
            <Footer />
        </div>
    );
};

export default Buy;