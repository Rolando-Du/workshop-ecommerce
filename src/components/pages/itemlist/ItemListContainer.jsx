import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";

import './ItemListContainer.css';

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let refCollection = collection(db, "products");
        getDocs(refCollection)
            .then((res) => {
                let newArray = res.docs.map((product) => {
                    return { ...product.data(), id: product.id };
                });
                setProducts(newArray);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="container">
            <h1 className="text-center">Tus productos seleccionados</h1>
            <div className="container-cart">
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-lg-3 col-md-5 col-sm-6 col-12">
                            <div className="product-container">
                                <img src={product.image} className="image" alt="" />
                                <h6 className='product-title'>{product.title}</h6>
                                <h4 className='product-price'>$ {product.unit_price}</h4>
                                <h6 className='product-stock'>Disponible: {product.stock} /u</h6>
                                <Link to={`/itemDetail/${product.id}`}>
                                    <span className='details'>Ver detalle</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ItemListContainer;
