import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, updateDoc, doc, } from "firebase/firestore";
import ProductsList from "./ProductsList";
import { Box, Button, Modal, TextField } from "@mui/material";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [open, setOpen] = useState(false);
    const [shipmentCost, setShipmentCost] = useState(null);

    const shipping_price = import.meta.env.VITE_SHIPPING_PRICE

    useEffect(() => {
        setIsChange(false);
        let prodcutsCollection = collection(db, "products");
        getDocs(prodcutsCollection).then((res) => {
            const newArr = res.docs.map((product) => {
                return {
                    ...product.data(),
                    id: product.id,
                };
            });
            setProducts(newArr);
        });
    }, [isChange]);

    const handleClose = () => {
        setOpen(false);
    };

    const updateShipment = async () => {
        updateDoc(doc(db, "shipment", shipping_price),
            { cost: shipmentCost })
        setOpen(false)
    }

    return (
        <div>
            <Box display="flex" justifyContent="start" marginTop= "2rem">
                <Button variant="contained" onClick={() => setOpen(true)}>
                    Costo de envio
                </Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        label="Costo"
                        onChange={(e) => setShipmentCost(+e.target.value)}
                    />
                    <Button onClick={updateShipment}>Modificar</Button>
                </Box>
            </Modal>
            <ProductsList products={products} setIsChange={setIsChange} />
        </div>
    );
};

export default Dashboard;