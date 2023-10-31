import { useEffect, useState } from 'react';
import { useStyles } from './ProfileStyles';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from '../materialUI-common';
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert, Avatar } from "@mui/material";
import {
  Grid,
  TextField,
  Button
} from "@mui/material";
import Divider from '@mui/material/Divider';
import { editUser, getUserByEmail } from '../../services/user/UserService';
import { TProfileForEdit, /**User*/ IUserWithId } from '../../types';
import { useUserActions } from "../../store/user/useUserActions";
import CONSTANTS from '../../constants';
import { useAppSelector } from '../../hooks/store';
import { DEFAULT_USER_STATE } from '../../store/user/Userslice';
import LoadingScreen from '../loading_screen/LoadingScreen';

const ProfileForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  // Slice recuperados de la store de user
  const user = useAppSelector((state) => state.user)

  // Actions para actualizar slice user en la store
  const { updateUser } = useUserActions();

  // State para manejar alertas
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  // React-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserWithId>();

    // Fetch para recuperar de la bd y actualizar la store
  const fetchUserData = async () => {
    try {
      const email = localStorage.getItem('email');
      const userData: IUserWithId = email ? await getUserByEmail(email) : DEFAULT_USER_STATE;
      updateUser(userData);
      setLoading(false);
      reset(userData);
    } catch (err) {
      console.error('Error al obetener los datos del servidor', err);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  // botón Guardar Cambios, se edita en la bd y se actualiza el user en la store
  const onSubmit: SubmitHandler<IUserWithId> = async (data) => {
    const { id, name, lastName, username, password, email, roles, profileImage } = data;
    try {
      if (data) {
        const userToEdit: TProfileForEdit = {
          name,
          lastName,
          username,
          password,
        };
        const userForPersist: IUserWithId = {
          id,
          email,
          name,
          lastName,
          username,
          password,
          roles,
          profileImage,
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
    <>
      {loading ? (
          <LoadingScreen />
        ) : (
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
                  <Avatar
                      sx={useStyles.profileImage}
                      src={`${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${user.profileImage}`}
                      alt={'Imagen de perfil'}
                    />
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
        )}
    </>
  );
};

export default ProfileForm;
