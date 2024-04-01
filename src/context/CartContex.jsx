import { useState, createContext } from 'react'
import { useNotification } from '../notification/hooks/useNotification'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const { showNotification } = useNotification()

    const addItem = (productToAdd) => {
      
      if(!isInCart(productToAdd.id)) {
        setCart(prev => [...prev, productToAdd])
        showNotification('success', `Se agrego   ${productToAdd.quantity}  ${productToAdd.name}`)
        
      } else {
        showNotification('error', `Ya existe el producto en el carrito`)
      }
    }
  
    const isInCart = (id) => {
      return cart.some(prod => prod.id === id)
    }
  
    const getTotalQuantity = () => {
      let acumulador = 0
  
      cart.forEach(prod => {
        acumulador += prod.quantity
      })
      console.log(cart)
      return acumulador
    }
  
    const totalQuantity = getTotalQuantity()

    return (
        <CartContext.Provider value={{cart, addItem, totalQuantity}}>
            {children}
        </CartContext.Provider>
    )
}