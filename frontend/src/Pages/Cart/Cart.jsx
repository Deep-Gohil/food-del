import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'

const Cart = () => {

  const {cartItems,food_List,removeFromCart} = useContext(StoreContext)

  return (
    <div className='cart'>
      
    </div>
  )
}

export default Cart