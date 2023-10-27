import {  useEffect, useState } from 'react';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert } from "@mui/material";
import { Grid, TextField, Button } from "@mui/material";
import { editUser, getUser } from '../../services/user/UserService';
import {  User } from '../../types';
//import { TokenService } from '../../services/user/TokenService';


const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, Arial, sans-serif',
  },
});

const defaultValues: User = {
  email: "",
  name: "",
  lastName: "",
  username: "",
  password: "",
  roles: []
};

console.log(localStorage);

// const getUserInfo =() =>{
//   let info: string[];
//   let infoResult: string;

//   infoResult = this.tokenService.getUserInfo();
//   if(infoResult != undefined && infoResult != null && infoResult != ''){
//     info = infoResult.split('|');

//     if(info != undefined && info != null && info.length > 0){
//       this.id = info[0];
//       this.name = info[1];
//     } else {
//       this.name = "";
//     }
//   }
// }

const ProfileForm = () => {
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({ defaultValues });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try{
      const userData = await getUser();
      reset(userData);
    } catch (err) {
      console.log('Error al obetener los datos del tukiUSer', err);
    }
  }

  const onSubmit: SubmitHandler<User> = async (data) => {
    console.log(getUser());
    const { email, name, lastName, username, password } = data;
    try {
      if (data) {
        const user: User = {
          email,
          name,
          lastName,
          username,
          password,
          roles: []
        };
        await editUser(user);
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
      <Grid container component="main" sx={{ width:"100%", height: "70vh" }}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={1} square
          sx={{
            display: "flex",
            borderRadius: "0.9375rem",
            background: "rgba(217, 217, 217, 0.10)",
            alignItems: "center",
            margin: "auto",
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

            <Typography component="h1" variant="h5" sx={{ color: "black" }}>
              Datos personales
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2} >
                <Grid item xs={12} sm={6} >
                  <Typography variant="subtitle2">Nombre: </Typography>
                  <TextField
                    sx={{ color: "white" }}
                    className="text-field-custom"
                    autoComplete="given-name"
                    fullWidth
                    id="name"
                    label=""
                    autoFocus
                    {...register("name", { required: true, minLength: 4 })}
                    error={Boolean(errors.name)}
                    helperText={errors.name ? errors.name.message : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Apellido: </Typography>
                  <TextField
                    className="text-field-custom"
                    required
                    fullWidth
                    id="last_name"
                    label=""
                    autoComplete="family-name"
                    {...register("lastName", { required: true, minLength: 4 })}
                  />
                </Grid>
                <Grid item xs={12}>
                <Typography variant="subtitle2">Correo: </Typography>
                  <TextField
                    className="text-field-custom"
                    required
                    fullWidth
                    id="email"
                    label=""
                    autoComplete="email"
                    disabled
                    {...register("email", { required: true, minLength: 4 })}
                  />
                </Grid>
                <Grid item xs={12}>
                <Typography variant="subtitle2">Apodo: </Typography>
                  <TextField
                    className="text-field-custom"
                    required
                    fullWidth
                    id="username"
                    label=""
                    autoComplete="username"
                    {...register("username", {
                      required: true,
                      minLength: 3,
                    })}
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
              ///  disabled={!isValid} 
              >
                Guardar Cambios
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
    </ThemeProvider>
  );
};

export default ProfileForm;
