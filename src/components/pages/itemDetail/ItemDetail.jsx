import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import { Button } from "@mui/material";
import { CartContext } from "../../../context/CartContext";

import './ItemDetail.css'
const ItemDetail = () => {
    const { id } = useParams();
    const { addToCart, getQuantityById } = useContext(CartContext);
    let quantity = getQuantityById(id);
    const [product, setProduct] = useState(null);
    const [counter, setCounter] = useState(quantity || 1);


    useEffect(() => {
        let refCollection = collection(db, "products");
        let refDoc = doc(refCollection, id);
        getDoc(refDoc)
            .then((res) => setProduct({ ...res.data(), id: res.id }))
            .catch((error) => console.log(error));
    }, [id]);

    // SUMAR
    const addOne = () => {
        if (counter < product.stock) {
            setCounter(counter + 1);
        } else {
            alert("stock maximo");
        }
    };

    // RESTAR

    const subOne = () => {
        if (counter > 1) {
            setCounter(counter - 1);
        } else {
            alert("no podes agregar menos de 1 elemento al carrito");
        }
    };
    // AGREGAR AL CARRITO

    const onAdd = () => {
        let obj = {
            ...product,
            quantity: counter,
        };
        addToCart(obj);
    };

    return (

        <div className="centered-container">
            <div className="container-cart">
                <h2 className='text-center'>Detalles de los productos</h2>
                <div className="row1">
                    {product && (
                        <div className="card-container">
                            <h4 className='product-title'>{product.title}</h4>
                            <img src={product.image} className="image" alt="" />
                            <h3 className='product-description'>{product.description}</h3>
                        </div>
                    )}
                    {
                        quantity && <h6>Ya tienes {quantity} en el carrito</h6>
                    }
                    {
                        product?.stock === quantity && <h6>Ya tienes el maximo en el carrito</h6>
                    }
                    <div className='botons'>
                        <Button variant="contained" onClick={subOne}>
                            -
                        </Button>

                        <span className='counter'> {counter} </span>

                        <Button variant="contained" onClick={addOne}>
                            +
                        </Button>

                    </div>
                    <Button onClick={onAdd}><span className="addCar">Agregar al carrito</span> </Button>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
