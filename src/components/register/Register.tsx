import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";
import { Grid, TextField, Button } from "@mui/material";
import { registerUser } from "../../services/register/RegisterService";
import User from "../../models/user/User";


const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, Arial, sans-serif',
  },
});

const defaultValues: UserToRegister = {
  email: "",
  name: "",
  surname: "",
  nickName: "",
  password: "",
};

type UserToRegister = {
  email: string;
  name: string;
  surname: string;
  nickName: string;
  password: string;
};

const RegisterForm = () => {
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<UserToRegister>({ defaultValues });

  const onSubmit: SubmitHandler<UserToRegister> = async (data) => {
    const { email, name, surname, nickName, password } = data;
    try {
      if (data) {
        const user: User = {
          email,
          name,
          surname,
          nickName,
          password,
        };
        await registerUser(user);
        setAlert({
          type: "success",
          message: "Registro satisfactorio como usuario.",
        });
      }
      reset();
    } catch (e) {
      setAlert({
        type: "error",
        message: "Error en el registro.",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

            }}
          >
            <img
              src="src/assets/logo-slc.svg"
              alt="SLC Logo"
              style={{
                width: "500px",
              }}
            />
            <h1 style={{ color: "white", fontSize: "1.2rem", fontWeight: 100, textAlign: "center", lineHeight: "1.7", }}>Regístrate y lleva el control de tus gastos de eventos<br></br> con tus contactos de manera sencilla </h1>
          </div>
        </Grid>


        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={1} square
          sx={{
            position: "absolute",
            top: 100,
            right: 150,
            width: 450,
            borderRadius: "0.9375rem",
            background: "rgba(217, 217, 217, 0.10)",
          }}>
          <Box
            sx={{
              my: 10,
              mx: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "50px",
              gap: "15px",
            }}
          >

            <Typography component="h1" variant="h5" sx={{ color: "white" }}>
              ¡Regístrate!
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2} >
                <Grid item xs={12} sm={6} >
                  <TextField
                    sx={{ color: "white" }}
                    className="text-field-custom"
                    autoComplete="given-name"
                    fullWidth
                    id="name"
                    label="Primer Nombre"
                    autoFocus
                    {...register("name", { required: true, minLength: 4 })}
                    error={Boolean(errors.name)}
                    helperText={errors.name ? errors.name.message : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="text-field-custom"
                    required
                    fullWidth
                    id="last_name"
                    label="Primer Apellido"
                    autoComplete="family-name"
                    {...register("surname", { required: true, minLength: 4 })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className="text-field-custom"
                    required
                    fullWidth
                    id="email"
                    label="Correo electrónico"
                    autoComplete="email"
                    {...register("email", { required: true, minLength: 4 })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className="text-field-custom"
                    required
                    fullWidth
                    id="nickName"
                    label="Apodo"
                    autoComplete="nickName"
                    {...register("nickName", {
                      required: true,
                      minLength: 3,
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className="text-field-custom"
                    required
                    fullWidth
                    id="password"
                    label="Contraseña"
                    type="password"
                    autoComplete="password"
                  {...register("password", { required: true, minLength: 4 })}
                  />
                </Grid>
              </Grid>
              <Button
                className="button-custom"
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#000",
                  borderRadius: "10px",
                  border: '2px solid',
                  borderImage: 'linear-gradient(to right, #77EBEB, #9A40E0)',
                  borderImageSlice: 1,
                  borderImageSource: 'linear-gradient(to right, #77EBEB, #9A40E0)',
                  padding: '10px',
                  boxShadow: "0px 4px 61px 0px rgba(77, 71, 195, 0.60)",
                  '&:hover': {
                    backgroundColor: "#211f42"
                  },

                }}
              disabled={!isValid}
              >
                Crear Cuenta
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/Login">Regresar</Link>
                </Grid>
              </Grid>
              {alert.type === "success" && (
                <Alert severity="success">{alert.message}</Alert>
              )}
              {alert.type === "error" && (
                <Alert severity="error">{alert.message}</Alert>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider >
  );
};

export default RegisterForm;
