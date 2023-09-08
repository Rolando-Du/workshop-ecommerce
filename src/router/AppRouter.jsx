import { Route, Routes } from "react-router-dom";
import Navbar from "../components/layout/navbar/Navbar";
import { routes } from "./routes";
import Login from "../components/pages/login/Login";
import Register from "../components/pages/register/Register";
import ForgotPassword from "../components/pages/forgotPassword/ForgotPassword";
import Dashboard from "../components/pages/dashboard/Dashboard";
import ItemListContainer from "../components/pages/itemlist/ItemListContainer.jsx";
import ProtectedAdmin from "./ProtectedAdmin";
import ProtectedUsers from "./ProtectedUsers";
import NotFound from "../components/NotFound/NotFound";


const AppRouter = () => {
  return (
    <Routes>
      {/* PARA LOS USUARIOS LOGEADOS */}
      <Route element={<ProtectedUsers />}>
        <Route element={<Navbar />}>
          {routes.map(({ id, path, Element }) => (
            <Route key={id} path={path} element={<Element />} />
          ))}
        </Route>
      </Route>

      {/* PARA LOS USUARIOS ADMIN */}
      <Route element={<ProtectedAdmin />}>
        <Route element={<Navbar />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* register  */}
      <Route path="/register" element={<Register />} />

      {/* shop  */}
      <Route path="/shop" element={<ItemListContainer />} />

      {/* forgot password  */}
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
