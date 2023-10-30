import { useEffect, useState } from 'react';
import { useStyles } from './ProfileStyles';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from '../materialUI-common';
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert } from "@mui/material";
import {
  Grid,
  TextField,
  Button
} from "@mui/material";
import Divider from '@mui/material/Divider';
import { editUser, getProfilePicture, getUser } from '../../services/user/UserService';
import { ProfileForEdit, /**User*/ UserWithId } from '../../types';
import { useUserActions } from "../../hooks/useUserActions";


interface ProfileFormProps {
  email: string
}

const ProfileForm: React.FC<ProfileFormProps> = ({ email }) => {
  const { updateUser } = useUserActions();
  const [profileImage, setProfileImage] = useState<string | null>('');

  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserWithId>();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData: UserWithId = await getUser(email);
      reset(userData);
      console.log('user', userData);
      const picture = await getProfilePicture(userData.profileImage)
      console.log('pic', typeof picture);
      setProfileImage(picture);
    } catch (err) {
      console.log('Error al obetener los datos del servidor', err);
    }
  }

  const onSubmit: SubmitHandler<UserWithId> = async (data) => {
    const { id, name, lastName, username, password, email, roles } = data;
    try {
      if (data) {
        const userToEdit: ProfileForEdit = {
          name,
          lastName,
          username,
          password,
        };
        const userForPersist: UserWithId = {
          id,
          email,
          name,
          lastName,
          username,
          password,
          roles,
          profileImage: ''
        }
        await editUser(userToEdit, id);
        updateUser(userForPersist);
        setAlert({
          type: "success",
          message: "Actualización satisfactoria de los datos.",
        });
      }
    } catch (e) {
      setAlert({
        type: "error",
        message: "Error en la modificación de los datos.",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ width: "sm", height: "md" }}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={1}
          sx={useStyles.paper}>
          <Box
            sx={useStyles.boxPaper}
          >
            <Typography variant='h4' sx={useStyles.bodyH2}>
              Datos personales
            </Typography>
            <Divider variant="middle" />
            <img src={profileImage ? profileImage : ''} style={useStyles.profileImage} />
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
                    sx={useStyles.textField}
                    autoComplete="given-name"
                    fullWidth
                    variant='standard'
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
                    sx={useStyles.textField}
                    required
                    fullWidth
                    variant='standard'
                    id="last_name"
                    label=""
                    autoComplete="family-name"
                    {...register("lastName", { required: true, minLength: 4 })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Correo: </Typography>
                  <TextField
                    sx={useStyles.textFieldEmail}
                    required
                    fullWidth
                    variant='standard'
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
                    sx={useStyles.textField}
                    required
                    fullWidth
                    variant='standard'
                    id="username"
                    label=""
                    autoComplete="username"
                    {...register("username", {
                      required: true,
                      minLength: 3,
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Contraseña: </Typography>
                  <TextField
                    sx={useStyles.textField}
                    required
                    fullWidth
                    variant='standard'
                    type='password'
                    id="password"
                    label=""
                    autoComplete="password"
                    {...register("password", {
                      required: true,
                      minLength: 4,
                    })}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={useStyles.button}
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
