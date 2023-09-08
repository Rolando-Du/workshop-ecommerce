import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Swal from 'sweetalert2';

import './Cart.css';

const Cart = () => {
    const { cart, clearCart, deleteById, getTotalPrice } = useContext(CartContext);

    let total = getTotalPrice();

    // Función para eliminar un producto con confirmación
    const confirmDelete = (productId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el producto del carrito.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteById(productId);
                Swal.fire('Eliminado', 'El producto ha sido eliminado del carrito.', 'success');
            }
        });
    };

    return (
        <div className='container'>
            <div className="container-cart">
                <h2 className='text-center'>Detalles de los productos</h2>

                <div className='row'>
                    {cart.map((product) => (
                        <div key={product.id} className="col-lg-3 col-md-5 col-sm-6 col-12 ">
                            <div className="product-container">
                                <h6 className='product-title'>{product.title}</h6>
                                <img src={product.image} className="image" alt="" />
                                <h6 style={{ color: "green", margin: "8px" }}>Cantidad: {product.quantity}</h6>
                                <div className='botons1'>
                                    <Button onClick={() => confirmDelete(product.id)}><span className="delete">Eliminar</span> </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <h5 className="text-center" style={{ borderBottom: "1px solid #000", textAlign: "center" }}>El total a pagar es <span style={{ color: "red", border: "2px solid #000", padding: "5px", borderRadius: "5px" }}> $ {total}</span></h5>

                <div className='finish-footer'>
                    <div >
                        <Button onClick={clearCart}><span className='finish-shop'>Limpiar carrito</span></Button>
                    </div>
                    {
                        cart.length > 0 && <Link to="/checkout" >
                            <span className='finish-shop'>Finalizar compra</span>
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Cart;
