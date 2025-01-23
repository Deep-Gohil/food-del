import React, { createContext, useEffect, useState } from 'react';
export const StoreContext = createContext(null);
import axios from 'axios';

const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    // const url = "http://localhost:8090";    
    const url = "https://food-del-backend-ujt2.onrender.com"
    const [token, setToken] = useState("");
    let [food_list, setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
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

    // const loadCartData = async(token)=>{
    //     const res = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    //     setCartItems(res.data.cartData)
    // }

    const loadCartData = async (token) => {
        try {
            const res = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    
            console.log("Cart response:", JSON.stringify(res.data, null, 2));
    
            const transformedCart = res.data.cart.reduce((acc, item) => {
                acc[item._id] = item.quantity;
                return acc;
            }, {});
    
            console.log("Transformed cart data:", transformedCart);
    
            setCartItems(transformedCart);
        } catch (error) {
            console.error("Error loading cart data:", error);
            setCartItems({});
        }
    };
    

    // useEffect(() => {
    //     async function loadData() {
    //         await fetchFoodList();
    //         const storedToken = localStorage.getItem("token");
    //         if (storedToken) {
    //             setToken(storedToken);
    //             await loadCartData(localStorage.getItem("token"))
    //         }
    //     }
    //     loadData()
    // }, []);


    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function loadData() {
            try {
                await fetchFoodList();
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);
                    await loadCartData(storedToken);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    if (isLoading) {
        return <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            Loading...
            </div>;
    }


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
