import React, { createContext, useState } from "react";
import collection_product from "../Components/Assests/collection";

export const ShopContext = createContext(null);

// Function to get the default cart state
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < collection_product.length; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [user, setUser] = useState(null); // State to track logged-in user

    // Function to add an item to the cart
    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] + 1
        }));
    };

    // Function to remove an item from the cart, ensuring no negative values
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max(prev[itemId] - 1, 0) // Prevents negative values
        }));
    };

    // Function to get the total number of items in the cart
    const getTotalReminderItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    };

    // Function to log in the user
    const loginUser = (userData) => {
        setUser(userData);
    };

    // Function to log out the user
    const logoutUser = () => {
        setUser(null);
    };

    // Function to get the first letter of the user's name for the navbar
    const getUserFirstLetter = () => {
        return user ? user.name.charAt(0).toUpperCase() : null;
    };

    const sendReminderEmail = async (productId) => {
        const product = collection_product.find(item => item.id === productId);
        console.log('Sending reminder for product:', product);
        
        try {
            const response = await fetch('http://localhost:3000/api/reminder/send-reminder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: user.email, // Assuming you have user email in your context
                    productDetails: {
                        name: product.name,
                        brand: product.brand,
                        starting_bid: product.starting_bid,
                        auction_end_time: product.auction_end_time
                    }
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to send reminder');
            }
    
            const data = await response.json();
            console.log('Reminder sent successfully:', data);
            alert('Reminder email sent successfully!');
        } catch (error) {
            console.error('Error sending reminder:', error);
            alert('Failed to send reminder email. Please try again.');
        }
    };

    // Context value including the product list, cart items, user info, and functions
    const contextValue = {
        all_product: collection_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalReminderItems,
        user,
        loginUser,
        logoutUser,
        getUserFirstLetter,
        sendReminderEmail // Add sendReminderEmail to context
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children} {/* Use 'props.children' to render nested components */}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
