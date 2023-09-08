import { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../../../context/AuthContext";
import { db, loginGoogle, onSignIn } from "../../../firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import "./login.css";

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await onSignIn(userCredentials);
      if (res?.user) {
        const userCollection = collection(db, "users");
        const userRef = doc(userCollection, res.user.uid);
        const userDoc = await getDoc(userRef);

        let finalUser = {
          email: res.user.email,
          rol: userDoc.data().rol,
        };

        console.log(finalUser);
        handleLogin(finalUser);
        navigate("/");

        Swal.fire({
          title: "Inicio de sesión exitoso",
          text: "Bienvenido de nuevo",
          icon: "success",
          confirmButtonText: "Continuar",
        });
      } else {
        throw new Error("Error de inicio de sesión");
      }
    } catch (error) {
      console.log("Error de inicio de sesión:", error);
      Swal.fire({
        title: "Error de inicio de sesión",
        text:
          "Ocurrió un error durante el inicio de sesión. Verifica tus credenciales e inténtalo nuevamente.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    try {
      let res = await loginGoogle();
      let finalUser = {
        email: res.user.email,
        rol: "user",
      };
      handleLogin(finalUser);
      navigate("/");
      Swal.fire({
        title: "Inicio de sesión con Google exitoso",
        text: "Bienvenido de nuevo",
        icon: "success",
        confirmButtonText: "Continuar",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error de inicio de sesión con Google",
        text:
          "Ocurrió un error durante el inicio de sesión con Google. Inténtalo nuevamente.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", 
            opacity: 0.7, 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10, 
          }}
        >
          <CircularProgress color="primary" />
        </div>
      )}
      <>
        <h4 className="text-center" style={{ marginTop: "1rem" }}>
          Inicie sesión para continuar
        </h4>
        <form onSubmit={handleSubmit}>
          <Grid container rowSpacing={2} justifyContent={"center"}>
            <Grid item xs={10} md={12}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10} md={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Contraseña
                </InputLabel>
                <OutlinedInput
                  name="password"
                  onChange={handleChange}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff color="primary" />
                        ) : (
                          <Visibility color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Contraseña"
                />
              </FormControl>
            </Grid>
            <Link
              to="/forgot-password"
              style={{ color: "steelblue", marginTop: "10px" }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <Grid item xs={10} md={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  color: "white",
                  textTransform: "none",
                  textShadow: "2px 2px 2px grey",
                  marginBottom: "10px",
                }}
              >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={10} md={12}>
              <Tooltip title="Ingresa con Google">
                <Button
                  className="google-button"
                  variant="contained"
                  startIcon={<GoogleIcon />}
                  onClick={googleSignIn}
                  type="button"
                  fullWidth
                  sx={{
                    color: "white",
                    textTransform: "none",
                    textShadow: "2px 2px 2px grey",
                    marginBottom: "10px",
                  }}
                >
                  Ingresar con Google
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={10} md={12}>
              <Typography
                className="message"
                color={"secondary.primary"}
                variant={"h6"}
                mt={1}
                align="center"
              >
                ¿Aun no tienes cuenta?
              </Typography>
            </Grid>
            <Grid item xs={10} md={12}>
              <Tooltip title="Regístrate">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate("/register")}
                  type="button"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    textShadow: "2px 2px 2px grey",
                    marginBottom: "10px",
                  }}
                >
                  Regístrate
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </form>
      </>
    </Box>
  );
};

export default Login;
