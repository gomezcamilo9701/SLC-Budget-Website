import { useEffect, useState } from 'react';
import { useStyles } from './EventsStyles';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from '../materialUI-common';
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert, Avatar, Badge, Card, CardContent, CardHeader, MenuItem, Modal, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Grid,
  TextField,
  Button
} from "@mui/material";
import Divider from '@mui/material/Divider';
import { editUser, getUserByEmail } from '../../services/user/UserService';
import { IUserWithId, TEditUser } from '../../types';
import { useUserActions } from "../../store/user/useUserActions";
import CONSTANTS from '../../constants';
import { useAppSelector } from '../../hooks/store';
import { DEFAULT_USER_STATE } from '../../store/user/Userslice';
import LoadingScreen from '../loading_screen/LoadingScreen';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface EventSelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventSelect: React.FC<EventSelectProps> = ({ value, onChange }) => {
  const eventTypes = ['Evento tipo 1', 'Evento tipo 2', 'Evento tipo 3'];

  return (
    <TextField select value={value} onChange={onChange} sx={{backgroundColor: "white", borderRadius: "10px"}}
      required
      fullWidth
      variant='standard'
      id="event-name"
      label="">
      {eventTypes.map((eventType) => (
        <MenuItem key={eventType} value={eventType}>
          {eventType}
        </MenuItem>
      ))}
    </TextField>
  );
};


const EventsForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  /*
    // Slice recuperados de la store de user
    const user = useAppSelector((state) => state.user)
  
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        setSelectedFile(file);
      } else {
        setSelectedFile(null);
      }
    };
  
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
        const userWithoutPassword = { ...userData, password: '' };
        updateUser(userWithoutPassword);
        setLoading(false);
        reset(userWithoutPassword);
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
  */

    /*Configuración del textfield de tipo select option*/
  const [selectedEvent, setSelectedEvent] = useState('');

  const handleEventChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEvent(event.target.value);
  };

    /*Configuración del textfield multiline de descripción */
  const [rows, setRows] = useState(1);

  const handleFocus = () => {
    setRows(3);
  };

  const handleBlur = () => {
    setRows(1);
  };

  return (
    <>
      {/*loading ? (
                <LoadingScreen />
           ) : (*/}
      <ThemeProvider theme={theme}>
        <Grid container component="main" flexDirection='row' sx={{ width: "sm", height: "md" }}>
          {/*Left Content*/}
          <Grid item xs={8} sm={8} md={5} component={Paper} elevation={1}
            sx={{
              width: "100%",
              display: "flex",
              borderRadius: "10px",
              background: "rgba(217, 217, 217, 0.10)",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              margin: " 0 auto"
            }}>
            <Box
              sx={{
                color: "white",
                display: "flex",
                width: "100%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px",
              }}
            >
              <Typography variant='h4' sx={useStyles.bodyH2}>
                Crear evento
              </Typography>

              <Divider variant="middle" />
              <Avatar
                sx={useStyles.profileImage}
                /*    src={`${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${user.profileImage}`}*/
                alt={'Imagen del evento'}
              />
              <Grid item xs={12}>
                <label htmlFor="image-upload">
                  <Button
                    component="span"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{mt: 2}}
                  >
                    Imagen del Evento
                  </Button>
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  style={{ display: 'none' }}
                /* onChange={handleImageChange}*/
                />
              </Grid>

              <Box
                component="form"
                noValidate
                /*  onSubmit={handleSubmit(onSubmit)}*/
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2} >
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Nombre del evento </Typography>
                    <TextField
                      sx={{backgroundColor: "white", borderRadius: "10px"}}
                      required
                      fullWidth
                      variant='standard'
                      id="event-name"
                      label=""
                      autoComplete="email"

                    /*   {...register("email", { required: true, minLength: 4 })}*/
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Descripción del evento </Typography>
                    <TextField
                      sx={{backgroundColor: "white", borderRadius: "10px"}}
                      required
                      fullWidth
                      multiline
                      rows={rows}
                      variant='standard'
                      id="description"
                      label=""
                      autoComplete=""
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    /*   {...register("username", {
                         required: true,
                         minLength: 3,
                       })}*/
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2"> Tipo de evento </Typography>
                    <EventSelect value={selectedEvent} onChange={handleEventChange} />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={useStyles.button}
                ///  disabled={!isValid} 
                >
                  Crear evento
                </Button>
              </Box>

              <Grid item xs={12} width={"100%"} mt={4}>
                <Stack  flexDirection={"row"} justifyContent={"space-between"}>

                  <Button variant="outlined" sx={{}} >
                    Buscar Contacto
                  </Button>

                  <Button variant="outlined" color='secondary' sx={{}} >
                    Crear Actividad
                  </Button>
                </Stack>
              </Grid>

            </Box>
          </Grid>

          {/*Right Content*/}
          <Grid item xs={12} sm={8} md={5} component={Paper} sx={{
            
            width: "100%",
            display: "flex",
            borderRadius: "10px",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            margin: " 0 auto",
            flexDirection: "column",
            background: "none"
          }}>

            <Grid item xs={12} component={Paper} elevation={1} sx={{
            width: "100%",
            display: "flex",
            borderRadius: "10px",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            margin: " 0 auto",
            background: "rgba(217, 217, 217, 0.10)",
            mb: 2,
          }}>
              <Box
                sx={useStyles.boxPaper}
              >

                <Card >
                  <CardHeader
                    title={
                      <>
                        Contactos del evento
                        <Badge badgeContent={/*contacts.length*/ 1} color="secondary" sx={{ ml: 2 }}>
                        </Badge>
                      </>
                    }
                  />
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {/*contacts.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  marginRight: 1,
                                }}
                                src={`${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${item.profileImage}`}
                                alt={item.name}
                              />
                              {item.name}
                            </div>
                          </TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>
                            <Button variant="outlined" onClick={() => null}>
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                            ))*/}
                    </TableBody>
                  </Table>
                </Card>


              </Box>
            </Grid>

            <Grid item xs={12} component={Paper} elevation={1}
              sx={{            
              width: "100%",
              display: "flex",
              borderRadius: "10px",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              margin: " 0 auto",
              background: "rgba(217, 217, 217, 0.10)",
              mb: 2,}}>
              <Box
                sx={useStyles.boxPaper}
              >
                <Card >
                  <CardHeader
                    title={
                      <>
                        Actividades del evento
                        <Badge badgeContent={/*contacts.length*/ 1} color="secondary" sx={{ ml: 2 }}>
                        </Badge>
                      </>
                    }
                  />
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {/*contacts.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  marginRight: 1,
                                }}
                                src={`${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${item.profileImage}`}
                                alt={item.name}
                              />
                              {item.name}
                            </div>
                          </TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>
                            <Button variant="outlined" onClick={() => null}>
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                            ))*/}
                    </TableBody>
                  </Table>
                </Card>
              </Box>
            </Grid>

            <Grid item xs={12} component={Paper} elevation={1} sx={{
            width: "100%",
            display: "flex",
            borderRadius: "10px",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            margin: " 0 auto",
            background: "rgba(217, 217, 217, 0.10)",
          }}>
              <Box
                sx={useStyles.boxPaper}
              >
                <Card >
                  <CardHeader
                    title={
                      <>
                        Invitaciones pendientes   
                        <Badge badgeContent={/*contacts.length*/ 1} color="secondary" sx={{ ml: 2 }}>
                        </Badge>
                      </>
                    }
                  />
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Acciones</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {/*contacts.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  marginRight: 1,
                                }}
                                src={`${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${item.profileImage}`}
                                alt={item.name}
                              />
                              {item.name}
                            </div>
                          </TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>
                            <Button variant="outlined" onClick={() => null}>
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                            ))*/}
                    </TableBody>
                  </Table>
                </Card>
              </Box>
            </Grid>

          </Grid>
        </Grid>
      </ThemeProvider>

    </>
  );
};

export default EventsForm;
