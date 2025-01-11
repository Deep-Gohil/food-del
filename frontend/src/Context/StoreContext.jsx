import React, { createContext } from 'react'
export const StoreContext = createContext(null)
import { food_list } from '../assets/assets'



const StoreContextProvider = (props) => {


    const contextValue ={
        food_list
    }

    return(
        <StoreContextProvider value={contextValue}>
            {Response.children}
        </StoreContextProvider>
    )
}

export default StoreContextProvider;