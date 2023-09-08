import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import CartContextComponent from "./context/CartContext";
import AuthContextComponent from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <CartContextComponent>
        <AuthContextComponent>
          <AppRouter />
        </AuthContextComponent>
      </CartContextComponent>
    </BrowserRouter>
  );
}

export default App;