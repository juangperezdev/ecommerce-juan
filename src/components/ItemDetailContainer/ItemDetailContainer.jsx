import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../../services/firebase/firebaseConfig"

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { itemId } = useParams()

    useEffect(() => {
        const productDoc = doc(db, 'products', itemId)

        getDoc(productDoc)
            .then(queryDocumentSnapshot => {
                const data = queryDocumentSnapshot.data()
                if (queryDocumentSnapshot.exists()) {
                    const productAdapted = { id: queryDocumentSnapshot.id, ...data }
                    setProduct(productAdapted)
                } else {
                    setError("El producto no existe")
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error)
                setError("Hubo un error al obtener el producto")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [itemId])

    if (loading) {
        return <div className="w-full max-w-md mx-auto bg-pink-200 text-center p-8">Cargando...</div>
    }

    if (error) {
        return <div className="w-full max-w-md mx-auto bg-pink-200 text-center p-8">{error}</div>
    }

    return (
        <div className="w-full max-w-md mx-auto bg-pink-200 text-center p-8">
            {product && <ItemDetail {...product} />}
        </div>
    )
}

export default ItemDetailContainer
