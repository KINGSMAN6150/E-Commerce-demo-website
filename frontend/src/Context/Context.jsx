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
        getUserFirstLetter
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children} {/* Use 'props.children' to render nested components */}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
