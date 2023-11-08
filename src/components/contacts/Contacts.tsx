import { useState, useEffect } from 'react';
import { Avatar, Badge, Button, Card, CardContent, CardHeader, Grid, Modal, Table, TablePagination, TableContainer, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector } from '../../hooks/store'
import { useContactsActions } from '../../store/contacts/useContactsActions'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { TContactState, IUserWithId } from '../../types';
import { getContactsByUserId, getUserByEmail } from '../../services/user/UserService';
import CONSTANTS from '../../constants';
import LoadingScreen from '../loading_screen/LoadingScreen';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Paper } from '@mui/material';
import { useStyles } from './ContactsStyles';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../materialUI-common';
import { Toaster, toast } from 'sonner';
import { startLoading, stopLoading } from '../../store/loading/loadingSlice';
import { useDispatch } from 'react-redux';

function Contacts() {

  // #region Estados
  //Configuración de paginación para las tablas
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 2,
  });

  // State para gestionar todo el componente
  const [contactState, setContactState] = useState<TContactState>({
    email: '',
    contactInfo: null,
    modalOpen: false,
  })

  // #endregion

  // #region Store
  // Slices
  const contacts = useAppSelector((state) => state.contacts)
  const user = useAppSelector((state) => state.user)
  const isLoading = useAppSelector((state) => state.loading)

  // Actions
  const { addContact, refreshContacts } = useContactsActions();
  const dispatch = useDispatch();

  // #endregion

  // #region Fetch inicial
  const fetchUserData = async () => {
    try {
      const contactsData = await getContactsByUserId(user.id);
      const contacts: IUserWithId[] | null | undefined = contactsData?.contacts;
      refreshContacts(contacts);
    } catch (err) {
      console.error('Error al obetener los datos del servidor', err);
    } finally {
      dispatch(stopLoading());
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);
  // #endregion

  useEffect(() => {
    console.log('contacts', contacts);
  }, [contacts]);

  const handleSearch = async () => {
    try {
      const foundContact: IUserWithId = await getUserByEmail(contactState.email);
      const foundEmail = contacts.find(contact => contact.email === contactState.email);
      if (foundEmail) {
        toast.error("Este usuario ya está en tu lista de contactos")
      } else {
        setContactState({
          ...contactState,
          contactInfo: foundContact,
          modalOpen: !!foundContact,
        })
      }
    } catch (error) {
      setContactState({
        ...contactState,
        contactInfo: null,
        modalOpen: false,
      })
      toast.error("Este usuario no existe")

    }
  };

  const handleAddContact = (contactState: TContactState) =>  {
    dispatch(startLoading());
    setContactState({
      ...contactState,
      modalOpen: false,
    })
    addContact(contactState.contactInfo);
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ThemeProvider theme={theme}>
          <Grid container component="main" /*justifyContent={'space-between'} */ sx={{ width: "sm", height: "md" }}>
            <Grid item xs={12} sm={4} md={5} component={Paper} elevation={1}
              sx={useStyles.paperLeft}>
              <Box
                sx={useStyles.boxPaperLeft}
              >
                <Typography variant="h6" component="h2" sx={useStyles.bodyH2}>
                  Nuevo contacto
                </Typography>
                <Typography variant="body2" component="p" sx={useStyles.bodyP}>
                  Ingresa el correo electrónico de tu amigo para agregarlo a tu lista de contactos
                </Typography>

                <Grid item xs={12}>
                  <TextField
                    sx={useStyles.textField}
                    fullWidth
                    variant='standard'
                    label="Correo electrónico a buscar"
                    value={contactState.email}
                    onChange={(e) =>
                      setContactState({
                        ...contactState,
                        email: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Button variant="contained" sx={useStyles.button} onClick={handleSearch}>
                  Buscar contacto
                </Button>

                <Modal open={contactState.modalOpen} onClose={() =>
                  setContactState({
                    ...contactState,
                    modalOpen: false,
                  })}>
                  <Card style={{ width: 400, margin: 'auto', marginTop: 100, padding: 16, textAlign: "center" }}>

                    <CardHeader title="Información de contacto" />
                    {contactState.contactInfo && (
                      <CardContent>
                        <Avatar
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            marginRight: 2,
                          }}
                          src={`${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${contactState.contactInfo.profileImage}`}
                          alt={contactState.contactInfo.name}
                        />
                        <p>Nombre: {contactState.contactInfo.name}</p>
                        <p>Apellido: {contactState.contactInfo.lastName}</p>
                        <p>Correo electrónico: {contactState.contactInfo.email}</p>
                        <Button variant="contained" onClick={() => handleAddContact(contactState)}>
                          <PersonAddIcon />
                        </Button>
                        <Button variant="contained" onClick={() =>
                          setContactState({
                            ...contactState,
                            modalOpen: false,
                          })}>
                          <CloseIcon />
                        </Button>
                      </CardContent>
                    )}
                  </Card>
                </Modal>

              </Box>
            </Grid>



            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={1}
              sx={useStyles.paperRight}>
              <Box
                sx={useStyles.boxPaperRight}
              >
                <Card >
                  <CardHeader
                    title={
                      <>
                        Contactos
                        <Badge badgeContent={contacts.length} color="secondary" sx={{ ml: 2 }}>
                        </Badge>
                      </>
                    }
                  />
                  <TableContainer component={Paper}>
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
                        {contacts
                          .slice(pagination.page * pagination.rowsPerPage, pagination.page
                            * pagination.rowsPerPage + pagination.rowsPerPage)
                          .map((contact, index) => (
                          <TableRow key={index}>
                            <TableCell>{contact.id}</TableCell>
                            <TableCell>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    marginRight: 1,
                                  }}
                                  src={`${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${contact.profileImage}`}
                                  alt={contact.name}
                                />
                                {contact.name}
                              </div>
                            </TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>
                              <Button variant="outlined" onClick={() => null}>
                                <DeleteIcon />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      component="div"
                      count={contacts.length}
                      page={pagination.page}
                      onPageChange={(_, newPage) => setPagination({
                        ...pagination,
                        page: newPage
                      })}
                      rowsPerPage={pagination.rowsPerPage}
                      onRowsPerPageChange={(e) => {
                        setPagination({
                          ...pagination,
                          rowsPerPage: parseInt(e.target.value, 10),
                          page: 0
                        })
                      }}
                    />
                  </TableContainer>
                  
                </Card>
              </Box>
            </Grid>
          </Grid>
          <Toaster />
        </ThemeProvider>
      )}
    </>
  )
}

export default Contacts;