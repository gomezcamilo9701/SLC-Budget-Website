import { useEffect, useState } from 'react';
import { useStyles } from './ProfileStyles';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from '../materialUI-common';
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert, Avatar, CssBaseline } from "@mui/material";
import {
  Grid,
  TextField,
  Button
} from "@mui/material";
import Divider from '@mui/material/Divider';
import { editUser } from '../../services/user/UserService';
import { IUserResponse, IUserWithId, TEditUser } from '../../types';
import { useUserActions } from "../../store/user/useUserActions";
import CONSTANTS from '../../constants';
import { useAppSelector } from '../../hooks/store';
import LoadingScreen from '../loading_screen/LoadingScreen';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useImageUploader from '../../hooks/useImageUploader';

const ProfileForm: React.FC = () => {
  
  // #region Estados
  
  //Configuración del LoaderScreen
  const [loading, setLoading] = useState<boolean>(true);

  // Imagen
  const {selectedFile, previewImage, handleImageChange} = useImageUploader();

  // Alertas
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  // #endregion 

  // #region Store

  // Slice
  const user = useAppSelector((state) => state.user)

  // Actions
  const { updateUser } = useUserActions();
  // #endregion 

  // #region React-hook-form y onSubmit
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserWithId>();

  // botón Guardar Cambios, se edita en la bd y se actualiza el user en la store
  const onSubmit: SubmitHandler<IUserWithId> = async (data) => {
    const { id, name, lastName, username, password, email, profileImage } = data;
    try {
      if (data) {
        const userForPersist: IUserResponse = {
          id,
          email,
          name,
          lastName,
          username,
          profileImage,
        }
        let renamedFile = null;
        if (selectedFile) {
          const fileExtension = selectedFile.name.split('.').pop();
          const newFileName = `${email}.${fileExtension}`;
          renamedFile = new File([selectedFile], newFileName);
        }
        const editData: TEditUser = {
          editForm: {
            name,
            lastName,
            username,
            password,
          },
          id: id,
          profileImage: renamedFile,
        }
        await editUser(editData);
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
  // #endregion

  // #region useEffect inicial
  useEffect(() => {
    setTimeout(() => {
      reset(user);
      setLoading(false);
    }, 1000)
  }, []);
  // #endregion

  return (
    <>
    <CssBaseline />
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
                  <Divider variant="middle"/>
                  <Avatar
                    sx={useStyles.profileImage}
                    src={previewImage ??
                      (user.profileImage
                        ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${user.profileImage}`
                        : '')}
                    alt={'Imagen del usuario'}
                  />
                  <Grid item xs={12}>
                    <label htmlFor="image-upload">
                      <Button
                        component="span"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        sx={useStyles.profileButton}
                      >
                        {selectedFile ? 'Mi nueva foto de perfil' : "Cambiar Imagen de Perfil"}
                      </Button>
                    </label>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                  </Grid>
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
                          sx={{ ...useStyles.textField, '& .MuiInputBase-input': { paddingLeft: '10px' } }}
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
                          sx={{ ...useStyles.textField, '& .MuiInputBase-input': { paddingLeft: '10px' } }}
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
                          sx={{ ...useStyles.textFieldEmail, '& .MuiInputBase-input': { paddingLeft: '10px' } }}
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
                          sx={{ ...useStyles.textField, '& .MuiInputBase-input': { paddingLeft: '10px' } }}
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
                          sx={{ ...useStyles.textField, '& .MuiInputBase-input': { paddingLeft: '10px' } }}
                          required
                          fullWidth
                          variant='standard'
                          type='password'
                          id="password"
                          label=""
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
