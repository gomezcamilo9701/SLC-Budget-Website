import { useState } from "react";
import { useStyles } from '../register/RegisterStyles';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../materialUI-common";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { Grid, TextField, Button } from "@mui/material";
import { loginUser } from "../../services/user/UserService";
import { TLoginUser } from "../../types";
import "../login/Login.css"


const defaultValues: TLoginUser = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const {
    register,
    handleSubmit,
    /* formState: { errors, isValid },*/
    reset,
  } = useForm<TLoginUser>({ defaultValues });

  const onSubmit: SubmitHandler<TLoginUser> = async (data) => {
    
    const { email, password } = data;
    try {
      if (data) {
        const user: TLoginUser = {
          email,
          password,
        };
        await loginUser(user);
        setAlert({
          type: "success",
          message: "Ingreso satisfactorio como usuario.",
        });
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      }
      reset();
    } catch (e) {
      setAlert({
        type: "error",
        message: "Error en el Ingreso.",
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={useStyles.bodyContainer}>
        <Grid item xs={12} sm={6} md={7} sx={useStyles.leftContent}>
          <img src="src/assets/logo-slc.svg" alt="SLC Logo" style={useStyles.logo} />
          <Typography component="h2" variant="h2" sx={useStyles.bodyH2}>
            Si aún no tienes una cuenta registrada
          </Typography>
          <Link to="/register">¡Regístrate aquí!</Link>
        </Grid>


        <Grid item xs={12} sm={10} md={5} component={Paper} elevation={8} sx={useStyles.paper}>
          <Box sx={useStyles.boxPaper}>

            <Typography component="h1" variant="h5" sx={{ color: "white" }}>
              Iniciar Sesión
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container >
                <Grid item xs={12}>
                  <TextField
                    sx={useStyles.textField}
                    required
                    fullWidth
                    variant="filled"
                    color="secondary"
                    id="email"
                    label="Correo electrónico"
                    autoComplete="email"
                    {...register("email", { required: true, minLength: 4 })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={useStyles.textField}
                    required
                    fullWidth
                    variant="filled"
                    color="secondary"
                    id="password"
                    label="Contraseña"
                    autoComplete="password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...register("password", { required: true, minLength: 4 })}
                  />
                </Grid>
              </Grid>
              <Button fullWidth type="submit" variant="contained" sx={useStyles.button}>
                Iniciar Sesión
              </Button>
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

export default LoginForm;