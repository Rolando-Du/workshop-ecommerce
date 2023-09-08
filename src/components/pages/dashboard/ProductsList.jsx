import Swal from 'sweetalert2'; // Importa SweetAlert2
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
    Box,
    Modal,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { db } from "../../../firebaseConfig";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import ProductsForm from "./ProductsForm";

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
    zIndex: 9999, // Establece un z-index alto para que esté en la parte superior
};

const ProductsList = ({ products, setIsChange }) => {
    const [open, setOpen] = useState(false);
    const [productSelected, setProductSelected] = useState(null);

    const deleteProduct = (id) => {
        // Muestra un popup de confirmación antes de eliminar el producto
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará el producto de forma permanente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, elimina el producto
                deleteDoc(doc(db, "products", id));
                setIsChange(true);

                // Muestra un popup de éxito después de eliminar
                Swal.fire({
                    title: "Producto eliminado",
                    text: "El producto ha sido eliminado con éxito.",
                    icon: "success",
                    confirmButtonText: "Continuar",
                });
            }
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (product) => {
        setProductSelected(product);
        setOpen(true);
    };

    const handleUpdate = (updatedProduct) => {
        // Muestra un popup de confirmación antes de actualizar el producto
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción modificará el producto.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, modificar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, actualiza el producto
                const productsCollection = doc(db, "products", updatedProduct.id);
                const updatedData = {
                    title: updatedProduct.title,
                    description: updatedProduct.description,
                    unit_price: updatedProduct.unit_price,
                    stock: updatedProduct.stock,
                    category: updatedProduct.category,
                };

                updateDoc(productsCollection, updatedData).then(() => {
                    setIsChange(true);
                    handleClose();

                    // Muestra un popup de éxito después de actualizar
                    Swal.fire({
                        title: "Producto actualizado",
                        text: "El producto ha sido actualizado con éxito.",
                        icon: "success",
                        confirmButtonText: "Continuar",
                    });
                });
            }
        });
    };

    return (
        <div>
            <Box display="flex" justifyContent="end" marginTop="-2rem">
                <Button variant="contained" onClick={() => handleOpen(null)}>
                    Agregar nuevo
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">id</TableCell>
                            <TableCell align="left">titulo</TableCell>
                            <TableCell align="left">precio</TableCell>
                            <TableCell align="left">stock</TableCell>
                            <TableCell align="left">imagen</TableCell>
                            <TableCell align="left">categoria</TableCell>
                            <TableCell align="left">acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="left">
                                    {product.id}
                                </TableCell>
                                <TableCell component="th" scope="row" align="left">
                                    {product.title}
                                </TableCell>
                                <TableCell component="th" scope="row" align="left">
                                    {product.unit_price}
                                </TableCell>
                                <TableCell component="th" scope="row" align="left">
                                    {product.stock}
                                </TableCell>
                                <TableCell component="th" scope="row" align="left">
                                    <img
                                        src={product.image}
                                        alt=""
                                        style={{ width: "80px", height: "80px" }}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row" align="left">
                                    {product.category}
                                </TableCell>
                                <TableCell component="th" scope="row" align="left">
                                    <IconButton onClick={() => handleOpen(product)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => deleteProduct(product.id)}>
                                        <DeleteForeverIcon color="primary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ProductsForm
                        handleClose={handleClose}
                        setIsChange={setIsChange}
                        productSelected={productSelected}
                        setProductSelected={setProductSelected}
                        handleUpdate={handleUpdate} // Pasa la función handleUpdate al formulario
                    />
                </Box>
            </Modal>
        </div>
    );
};

export default ProductsList;
