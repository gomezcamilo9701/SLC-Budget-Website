import { useEffect, useState } from "react";
import { useStyles } from "./EventsStyles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../components/materialUI-common";
import {
  Avatar,
  Badge,
  Card,
  CardHeader,
  CssBaseline,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Modal,
  Grid,
  TextField,
  Button
} from "@mui/material";
import Divider from "@mui/material/Divider";
import LoadingScreen from "../../components/loading_screen/LoadingScreen";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IEvent, IEventWithId, IUserWithId, TEventContactsResponse, TEventDataEdit, TInvitationCreate, TInvitationContactInfoResponse } from "../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../hooks/store";
import { useEventActions } from "../../store/event/useEventActions";
import { editEvent } from "../../services/event/EventService";
import CONSTANTS from "../../constants";
import { getContactsByUserId } from "../../services/user/UserService";
import { useContactsActions } from "../../store/contacts/useContactsActions";
import { createInvitationInBd, getInvitationsByEvent, updateInvitation } from "../../services/invitation/InvitationService";
import { SelectEventType } from "../../components/select_event_type/SelectEventType";
import useImageUploader from "../../hooks/useImageUploader";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loading/loadingSlice";
import Invitations from "../invitations/Invitations";
import { ContactsTable } from "../../components/contacts_table/ContactsTable";
import { getEventContactsByEventId } from "../../services/eventContacts/EventContactsService";

const EventDetails: React.FC = () => {

  // #region Estados
  //Imagen
  const { selectedFile, previewImage, handleImageChange } = useImageUploader();

  //Modal para invitaciones
  const [openModalInvitation, setOpenModalInvitation] = useState(false);

  // Estado local para invitations recuperadas de la bd

  const [eventData, setEventData] = useState({
    invitations: [] as TInvitationContactInfoResponse[],
    eventContacts: [] as TEventContactsResponse[],
  });

  // Select de evento
  const [selectedEvent, setSelectedEvent] = useState("");

  // #endregion

  // #region Store
  const event = useAppSelector((state) => state.event);
  const user = useAppSelector((state) => state.user);
  const contacts = useAppSelector((state) => state.contacts);
  const isLoading = useAppSelector((state) => state.loading);

  const dispatch = useDispatch();
  const { updateEvent } = useEventActions();
  const { refreshContacts } = useContactsActions();
  // #endregion

  // #region useEffect inicial
  const fetchUserData = async () => {
    dispatch(startLoading());
    try {
      setSelectedEvent(event.type);
      const contactsResponse = await getContactsByUserId(user.id);
      const contacts: IUserWithId[] | null | undefined = contactsResponse?.contacts;
      refreshContacts(contacts);

      const invitationsResponse = await getInvitationsByEvent(event.event_id);
      const updatedInvitations: TInvitationContactInfoResponse[] | null | undefined = invitationsResponse?.invitations;
      if (updatedInvitations) {
        setEventData(prevState => ({
          ...prevState,
          invitations: updatedInvitations,
        }));
      console.log('invi', contacts)
      }

      const eventContactsResponse = await getEventContactsByEventId(event.event_id);
      const updatedEventContacts: TEventContactsResponse[] | null | undefined = eventContactsResponse?.content;
      if (updatedEventContacts) {
        setEventData(prevState => ({
          ...prevState,
          eventContacts: updatedEventContacts,
        }));
      }
      console.log('contac', updatedEventContacts)
      reset(event);
    } catch (err) {
      console.error('Error al obtener los datos de evento desde el servidor', err);
    } finally {
      dispatch(stopLoading());
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);
  // #endregion

  // #region react-hook-form y onSubmit
    const {
      register,
      handleSubmit,
      formState: {isValid},
      reset,
    } = useForm<IEvent>();
  
    // botón Guardar Cambios, se edita en la bd y se actualiza el event en la store
    const onSubmit: SubmitHandler<IEvent> = async (data) => {
      const { name, description, type } = data;
      try {
        if (data) {
          let renamedFile = null;
          if (selectedFile) {
            const fileExtension = selectedFile.name.split(".").pop();
            const newFileName = `${name}${type}.${fileExtension}`;
            renamedFile = new File([selectedFile], newFileName);
          } else {
            console.error("No se seleccionó una imagen para tu evento");
          }
          const eventDataEdit: TEventDataEdit = {
            editForm: {
              name,
              description,
              type: selectedEvent,
            },
            eventId: event.event_id,
            picture: renamedFile,
          }
          const responseEventEdited: IEventWithId = await editEvent(eventDataEdit);
          updateEvent(responseEventEdited);
          toast.success("Actualización satisfactoria del evento")
        }
      } catch (e) {
        toast.error("Error en la edición del evento")
  
      }
    };
    // #endregion
  
  // #region funciones
  const handleInvitation = async (contactId: number) => {
    const invitation: TInvitationCreate = {
      eventId: event.event_id,
      contactId: `${contactId}`,
    }
    const isAlreadyInvited = eventData.invitations.some(invitation => invitation.contactId === contactId);
    if (isAlreadyInvited) {
      toast.error("El contacto ya tiene una invitación pendiente o aceptada.");
      return
    }
      try {
      const response: TInvitationContactInfoResponse | null = await createInvitationInBd(invitation);
      if (response) {
        setEventData(prevState => ({
          ...prevState,
          invitations: [...eventData.invitations, response]
        }))
        toast.success('Invitación enviada')
      } else {
        console.error('Error enviando la invitación')
        toast.error('El contacto ya tiene una invitación pendiente o aceptada')
      }
    } catch (e) {
      console.error('Error enviando la invitación', e)
      toast.error('El contacto ya tiene una invitación pendiente o aceptada')
    }
  }

  const handleCancelInvitation = async (invitationId: number) => {
    try {
      const response: TInvitationContactInfoResponse | null = await updateInvitation(invitationId, "REJECTED");
      if (response) {
        const updatedInvitations = eventData.invitations.filter(invitation => invitation.invitation_id !== invitationId);
        setEventData(prevState => ({
          ...prevState,
          invitations: updatedInvitations,
        }));        
        toast.success('Invitación eliminada')
      } else {
        console.error('Error eliminando la invitación')
        toast.error('Error eliminando la invitación')
      }
    } catch (e) {
      console.error('error', e);
      toast.error('Error eliminando la invitación');
    }
  }

  // #endregion

  useEffect(() => {
    console.log('eventData.eventContacts', eventData.eventContacts);
  }, [eventData.eventContacts])

  return (
    <>
      <CssBaseline />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ThemeProvider theme={theme}>
          <Grid
            container
            component="main"
            flexDirection="row"
            sx={{ width: "sm", height: "md" }}
          >
            {/*Left Content*/}
            <Grid
              item
              xs={8}
              sm={8}
              md={5}
              component={Paper}
              elevation={1}
              sx={useStyles.paper}
            >
              <Box
                sx={useStyles.boxPaper}
              >
                <Typography variant="h4" sx={useStyles.bodyH2}>
                  Crear evento
                </Typography>

                <Divider variant="middle" />
                <Avatar
                  sx={useStyles.profileImage}
                  src={previewImage ?? (event.picture
                    ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${event.picture}`
                    : '') }
                  alt={'Imagen del evento'}
                />
                <Grid item xs={12}>
                  <label htmlFor="image-upload">
                    <Button
                      component="span"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      sx={useStyles.profileButton}
                    >
                      {selectedFile ? 'Subir de nuevo' : 'Seleccionar imagen'}
                    </Button>
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </Grid>

                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        Nombre del evento
                      </Typography>
                      <TextField
                        sx={{
                          ...useStyles.textField,
                          "& .MuiInputBase-input": { paddingLeft: "10px" },
                        }}
                        required
                        fullWidth
                        variant="standard"
                        id="event-name"
                        label=""
                        autoComplete=""
                        {...register("name", { required: true, minLength: 4 })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        Descripción del evento{" "}
                      </Typography>
                      <TextField
                        sx={{
                          ...useStyles.textField,
                          "& .MuiInputBase-input": { paddingLeft: "10px" },
                        }}
                        required
                        fullWidth
                        multiline
                        rows={3}
                        variant="standard"
                        id="description"
                        label=""
                        autoComplete=""
                        {...register("description", {
                           required: true,
                           minLength: 3,
                         })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        {" "}
                        Tipo de evento{" "}
                      </Typography>
                      <SelectEventType
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={useStyles.button}
                    disabled={!isValid}
                  >
                    Editar evento
                  </Button>
                  <Toaster />
                </Box>

                <Grid item xs={12} width={"100%"} mt={4}>
                  <Stack flexDirection={"row"} justifyContent={"space-between"}>
                    <Button
                      variant="outlined"
                      sx={useStyles.button3}
                      onClick={() => setOpenModalInvitation(true)}
                    >
                      Enviar invitación
                    </Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={useStyles.button2}
                    >
                      Crear Actividad
                    </Button>
                  </Stack>
                </Grid>
              </Box>
            </Grid>

            {/*Right Content*/}
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              sx={useStyles.paper2}
            >
              <ContactsTable
                contacts={eventData.eventContacts}
              />

              <Grid
                item
                xs={12}
                component={Paper}
                elevation={1}
                sx={useStyles.paper3}
              >
                <Box sx={useStyles.boxPaper}>
                  <Card>
                    <CardHeader
                      title={
                        <>
                          Actividades del evento
                          <Badge
                            badgeContent={/*activities.length*/ 1}
                            color="secondary"
                            sx={{ ml: 2 }}
                          ></Badge>
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

            <Modal open={openModalInvitation} onClose={() => setOpenModalInvitation(false)}>
              <>
                <Invitations
                  contacts={contacts}
                  invitations={eventData.invitations}
                  handleInvitation={handleInvitation}
                  setOpenModalInvitation={setOpenModalInvitation}
                  handleCancelInvitation={handleCancelInvitation}
                />
              </>
            </Modal>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
};

export default EventDetails;