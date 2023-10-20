import React, { useState } from 'react';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert } from "@mui/material";
import { Grid, TextField, Button } from "@mui/material";
import { registerUser } from "../../services/register/RegisterService";
import Avatar from '@mui/material/Avatar';
import User from "../../models/user/User";


const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, Arial, sans-serif',
  },
});

const defaultValues: Profile = {
  email: "",
  name: "",
  surname: "",
  nickName: "",
  password: "",
};

interface Profile {
  name: string;
  surname: string;
  nickName: string;
  email: string;
  password: string;
}

const ProfileForm = () => {
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<Profile>({ defaultValues });

  const onSubmit: SubmitHandler<Profile> = async (data) => {
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
      <Grid container component="main" sx={{ width: "90%", height: "80vh" }}>
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
            <Grid sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 90, height: 90 }}
              />
              <Grid sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: "15px",
              }}
              >
                <Typography sx={{ color: "black"}}>
                  <b>Santiago Norrea</b>
                </Typography>
                <Typography sx={{ color: "gray"}}>
                  <b>santiago.nor@gmail.com</b>
                </Typography>
              </Grid>
            </Grid>

            <Typography sx={{ color: "black", marginTop:"15px", alignItems: "left"}}>
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
                  <TextField
                    sx={{ color: "white" }}
                    className="text-field-custom"
                    autoComplete="given-name"
                    fullWidth
                    id="name"
                    label="<name.usuario>"
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
                    label="<surname.usuario>"
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
                    label="<email.usuario>"
                    autoComplete="email"
                    disabled
                    {...register("email", { required: true, minLength: 4 })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className="text-field-custom"
                    required
                    fullWidth
                    id="nickName"
                    label="<nickName.usuario>"
                    autoComplete="nickName"
                    {...register("nickName", {
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
