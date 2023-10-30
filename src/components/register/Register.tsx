import { useState } from "react";
import { useStyles } from './RegisterStyles';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { Alert, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Grid, TextField, Button } from "@mui/material";
import { User } from "../../types";
import { registerUser } from "../../services/user/UserService";
import { theme } from "../materialUI-common";




const defaultValues: User = {
  email: "",
  name: "",
  lastName: "",
  username: "",
  password: "",
  roles: []
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
  } = useForm<User>({ defaultValues });

  const onSubmit: SubmitHandler<User> = async (data) => {
    const { email, name, lastName, username, password } = data;
    const roles = ["USER"];
    try {
      if (data) {
        const user: User = {
          email,
          name,
          lastName,
          username,
          password,
          roles,
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

  const [showPassword, setShowPassword] = useState(false);

  // Función que cambia el valor de 'showPassword' al hacer clic en el icono
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={useStyles.bodyContainer}>
        <Grid item xs={12} sm={6} md={7} sx={useStyles.leftContent}>
          <img src="src/assets/logo-slc.svg" alt="SLC Logo" style={useStyles.logo} />
          <Typography component="h1" variant="h2" sx={useStyles.bodyH2}>
            ¡Regístrate y lleva el control de tus gastos de eventos<br></br> con tus contactos de manera sencilla!
          </Typography>
        </Grid>


        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={8} sx={useStyles.paper}>
          <Box
            sx={useStyles.boxPaper}
          >

            <Typography component="h2" variant="h5">
              ¡Regístrate!
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container xs={12} >
                <Grid item xs={12} sm={6} >
                  <TextField
                    sx={useStyles.textField}
                    autoComplete="given-name"
                    fullWidth
                    variant='filled'
                    color="secondary"
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
                    sx={useStyles.textField}
                    required
                    fullWidth
                    variant='filled'
                    color="secondary"
                    id="last_name"
                    label="Primer Apellido"
                    autoComplete="family-name"
                    {...register("lastName", { required: true, minLength: 4 })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={useStyles.textField}
                    required
                    fullWidth
                    variant='filled'
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
                    variant='filled'
                    color="secondary"
                    id="username"
                    label="Apodo"
                    autoComplete="username"
                    {...register("username", {
                      required: true,
                      minLength: 3,
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={useStyles.textField}
                    required
                    fullWidth
                    variant='filled'
                    color="secondary"
                    id="password"
                    label="Contraseña"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} >
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...register("password", { required: true, minLength: 4 })}
                  />
                </Grid>


                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={useStyles.button}
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
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider >
  );
};

export default RegisterForm;