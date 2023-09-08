import Swal from "sweetalert2";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, db } from "../../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!isValidEmail(userCredentials.email)) {
      Swal.fire({
        title: "Error de registro",
        text: "Por favor, ingresa un correo electrónico válido.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
      return;
    }

    if (!isValidPassword(userCredentials.password)) {
      Swal.fire({
        title: "Error de registro",
        text:
          "La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
      return;
    }

    if (userCredentials.password !== userCredentials.confirmPassword) {
      Swal.fire({
        title: "Error de registro",
        text: "Las contraseñas no coinciden.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
      return;
    }

    try {
      const res = await signUp(userCredentials);
      if (res.user.uid) {
        await setDoc(doc(db, "users", res.user.uid), { rol: "user" });
      }
      navigate("/login");

      // Mostrar un popup de éxito con SweetAlert2
      Swal.fire({
        title: "Registro exitoso",
        text: "Ahora puedes iniciar sesión con tu nueva cuenta",
        icon: "success",
        confirmButtonText: "Iniciar sesión",
      });
    } catch (error) {
      console.log("Error de registro:", error);
      // Mostrar un popup de error utilizando SweetAlert2
      Swal.fire({
        title: "Error de registro",
        text: "Ocurrió un error durante el registro. Inténtalo nuevamente.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  };

  const isValidEmail = (email) => {
    // Utiliza una expresión regular para validar el formato del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    // Verifica que la contraseña tenga al menos 8 caracteres y contenga al menos una letra mayúscula
    return password.length >= 8 && /[A-Z]/.test(password);
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
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid
          container
          rowSpacing={2}
          // alignItems="center"
          justifyContent={"center"}
        >
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
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
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
          <Grid item xs={10} md={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Confirmar contraseña
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={handleChange}
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
                label="Confirmar contraseña"
              />
            </FormControl>
          </Grid>
          <Grid container justifyContent="center" spacing={3} mt={2}>
            <Grid item xs={10} md={7}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  color: "white",
                  textTransform: "none",
                  textShadow: "2px 2px 2px grey",
                }}
              >
                Registrarme
              </Button>
            </Grid>
            <Grid item xs={10} md={7}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/login")}
                type="button"
              >
                Regresar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Register;
