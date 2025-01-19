import React, { createContext, useEffect, useState } from 'react';
export const StoreContext = createContext(null);
import axios from 'axios';

const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:8090";
    const [token, setToken] = useState("");
    let [food_list, setFoodList] = useState([])

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const getTotalCartAmmount = () => {
        let totalAmmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmmount;
    };

    const fetchFoodList = async () => {
        const res = await axios.get(url + "/api/food/list")
        setFoodList(res.data.data)
    }

    useEffect(() => {



        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
        }
        loadData()
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
