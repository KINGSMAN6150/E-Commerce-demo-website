import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import collection_product from "../Components/Assests/collection";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < collection_product.length; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [bids, setBids] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) return;

            try {
                const response = await axios.get('http://localhost:3000/api/auth/user', {
                    headers: { 'x-auth-token': token }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUser(null);
                setToken(null);
                localStorage.removeItem('token');
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            const { token, user } = response.data;
            setToken(token);
            setUser(user);
            localStorage.setItem('token', token);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] + 1
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max(prev[itemId] - 1, 0)
        }));
    };

    const getTotalReminderItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    };

    const getUserFirstLetter = () => {
        return user ? user.name.charAt(0).toUpperCase() : null;
    };

    const sendReminderEmail = async (productId) => {
        const product = collection_product.find(item => item.id === productId);
        
        if (!product) {
            console.error("Product not found");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3000/api/reminder/send-reminder',
                {
                    userEmail: user.email,
                    productDetails: {
                        name: product.name,
                        brand: product.brand,
                        starting_bid: product.starting_bid,
                        auction_end_time: product.auction_end_time
                    }
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log('Reminder sent successfully:', response.data);
            alert('Reminder email sent successfully!');
        } catch (error) {
            console.error('Error sending reminder:', error);
            alert('Failed to send reminder email. Please try again.');
        }
    };

    const placeBid = (productId, bidAmount, currentBid) => {
        if (!user) {
            alert("Please login to place a bid");
            return false;
        }
        
        if (isNaN(bidAmount) || bidAmount <= currentBid) {
            alert("Bid must be higher than current bid");
            return false;
        }

        if (bidAmount > 10000) {
            alert("Bid cannot exceed $10,000");
            return false;
        }

        setBids(prevBids => ({
            ...prevBids,
            [productId]: {
                amount: bidAmount,
                userId: user.id,
                timestamp: new Date().toISOString()
            }
        }));

        return true;
    };

    const contextValue = {
        all_product: collection_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalReminderItems,
        user,
        login,
        logout,
        getUserFirstLetter,
        sendReminderEmail,
        bids,
        placeBid
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
