import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { Grid, TextField, Button } from "@mui/material";
import { loginUser } from "../../services/UserService";
import { LoginUser } from "../../types";
import './Login.css'


const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, Arial, sans-serif',
  },
});

const defaultValues: LoginUser = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const {
    register, //Hook from useForm
    handleSubmit,
   /* formState: { errors, isValid },*/
    reset,
  } = useForm<LoginUser>({ defaultValues });

  const onSubmit: SubmitHandler<LoginUser> = async (data) => {
    const { username, password } = data;
    try {
      if (data) {
        const user: LoginUser = {
          username,
          password,
        };
        await loginUser(user);
        setAlert({
          type: "error",
          message: response.message,
        });
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }
    } catch (e) {
      setAlert({
        type: "error",
        message: "Error en el inicio de sesión.",
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
            <h1
              style={{
                color: "white",
                fontSize: "1.2rem",
                fontWeight: 100,
                textAlign: "center",
                lineHeight: "1.7",
              }}
            >
              Si aún no tienes una cuenta registrada{" "}
            </h1>
            <Link to="/register">¡Regístrate aquí!</Link>
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={1}
          square
          sx={{
            position: "absolute",
            top: 100,
            right: 150,
            width: 450,
            borderRadius: "0.9375rem",
            background: "rgba(217, 217, 217, 0.10)",
          }}
        >
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
              Iniciar Sesión
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    className="text-field-custom"
                    required
                    fullWidth
                    id="username"
                    label="Correo electrónico"
                    autoComplete="username"
                    {...register("username", { required: true, minLength: 4 })}
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
                    error={Boolean(errors.password)}
                    helperText={errors.password ? errors.password.message : ""}
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
                  border: "2px solid",
                  borderImage: "linear-gradient(to right, #77EBEB, #9A40E0)",
                  borderImageSlice: 1,
                  borderImageSource:
                    "linear-gradient(to right, #77EBEB, #9A40E0)",
                  padding: "10px",
                  boxShadow: "0px 4px 61px 0px rgba(77, 71, 195, 0.60)",
                  "&:hover": {
                    backgroundColor: "#211f42",
                  },
                }}
                disabled={!isValid}
              >
                Iniciar Sesión
              </Button>
              <Grid container justifyContent="flex-end"></Grid>
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
    </ThemeProvider>
  );
};

export default LoginForm;