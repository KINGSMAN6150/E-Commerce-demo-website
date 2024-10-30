// Context.js (or wherever you define your context)
import React, { createContext, useState } from 'react';

export const LoginContext = createContext(null);

const ShopProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user information

    return (
        <LoginContext.Provider value={{ user, setUser }}>
            {children}
        </LoginContext.Provider>
    );
};

export default ShopProvider;
