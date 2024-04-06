import { useState, useContext } from "react"
import { CartContext } from "../../context/CartContex"
import { getDocs, collection, query, where, documentId, writeBatch, addDoc, Timestamp } from "firebase/firestore"
import { db } from "../../services/firebase/firebaseConfig"

export const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const { cart, total, clearCart } = useContext(CartContext)
    const items =  cart

    const createOrder = async () => {
        try {
            setLoading(true)
            const objOrder = {
                buyer: {
                    name: `${firstName} ${lastName}`,
                    email: email,
                    phone: phone
                },
                items: cart,
                total,
                date: Timestamp.fromDate(new Date())
            }
    
            const batch = writeBatch(db)
            const outOfStock = []
            const ids = cart.map(prod => prod.id)
    
            const productsCollection = query(collection(db, 'products'), where(documentId(), 'in', ids))
    
            const querySnapshot = await getDocs(productsCollection)
            const { docs } = querySnapshot
    
            docs.forEach(doc => {
                const data = doc.data()
                const stockDb = data.stock
    
                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart.quantity
    
                if(stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })
                } else {
                    outOfStock.push({ id: doc.id, ...data})
                }
            })
    
            if(outOfStock.length === 0) {
                batch.commit()
    
                const orderCollection = collection(db, 'orders')
                const { id } = await addDoc(orderCollection, objOrder)
                
                clearCart()
                setOrderId(id)
            } else {
                console.error('hay productos que no tienen stock disponible')
            }
        } catch (error) {
            console.error('Hubo un error en la generacion de la orden')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (email === confirmEmail) {
            createOrder();
        } else {
            alert("Los correos electrónicos no coinciden.");
        }
    }

  

    if(loading) {
        return  <h1 className="text-center text-4xl">Su orden está siendo generada...</h1>
    }

    if(orderId) {
        return <h1 className="text-center text-4xl">El id de su orden es: {orderId}</h1>
    }

    if (cart.length === 0) {
        return <h1 className="text-center text-4xl">Su carrito está vacío.</h1>
    }

    return  (
        <div className="container mx-auto p-4">
             <h1 className="text-2xl font-bold mb-4 px-14 text-center">Checkout</h1>
            <table className="w-full">
      <thead>
        <tr className="bg-black-100">
          <th className="py-2 px-4">Producto</th>
          <th className="py-2 px-4">Precio</th>
          <th className="py-2 px-4">Cantidad</th>
          <th className="py-2 px-4">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id} className="border-b">
            <td className="py-2 px-4">{item.name}</td>
            <td className="py-2 px-4">$ {item.price.toFixed(2)} </td>
            <td className="py-2 px-4">{item.quantity}</td>
            <td className="py-2 px-4">$ {(item.price * item.quantity).toFixed(2)} </td>
            
          </tr>
        ))}
      </tbody>
    </table>
           
           <h2 className="py-12 px-14 text-center"> Complete sus datos para generar la orden </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 mb-4">
                        <input 
                            type="text"
                            placeholder="Nombre"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-4">
                        <input 
                            type="text"
                            placeholder="Apellido"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-2">
                    <div className="w-full px-2 mb-4">
                        <input 
                            type="tel"
                            placeholder="Teléfono"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 mb-4">
                        <input 
                            type="email"
                            placeholder="Ingrese su correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-2 mb-4">
                        <input 
                            type="email"
                            placeholder="Confirme su correo electrónico"
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">Generar orden de compras</button>
            </form>
        </div>
    )
}

export default Checkout
