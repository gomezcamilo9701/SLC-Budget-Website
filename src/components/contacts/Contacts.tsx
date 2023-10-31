import { useState, useEffect } from 'react';
import { Avatar, Badge, Button, Card, CardContent, CardHeader, Grid, Modal, Alert, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector } from '../../hooks/store'
import { useContactsActions } from '../../store/contacts/useContactsActions'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { TContactState, IUserWithId } from '../../types';
import { getContactsByUserId, getUserByEmail } from '../../services/user/UserService';
import CONSTANTS from '../../constants';
import LoadingScreen from '../loading_screen/LoadingScreen';
import CloseIcon from '@mui/icons-material/Close';

function Contacts () {
  
  // Slices recuperados de la store
  const contacts = useAppSelector((state) => state.contacts)
  const user = useAppSelector((state) => state.user)

  // Actions para actualizar slice contacts en la store
  const { addContact, refreshContacts } = useContactsActions();

  // State para gestionar todo el componente
  const [contactState, setContactState] = useState<TContactState>({
    loading: true,
    email: '',
    contactInfo: null,
    modalOpen: false,
  })

  // State para manejar alertas
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  // Fetch para recuperar de la bd y actualizar la store
  const fetchUserData = async () => {
    try {
      const contacts: IUserWithId[] = await getContactsByUserId(user.id);
      refreshContacts(contacts);
      setContactState({
        ...contactState,
        loading: false,
      })
    } catch (err) {
      console.error('Error al obetener los datos del servidor', err);
      setContactState({
        ...contactState,
        loading: false,
      })
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSearch = async () => {
    try {
      const foundContact: IUserWithId = await getUserByEmail(contactState.email);
      const foundEmail = contacts.find(contact => contact.email === contactState.email);
      if (foundEmail) {
        setAlert({
          type: "error",
          message: "Este usuario ya está en tu lista de contactos"
        })
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
      setAlert({
        type: "error",
        message: "Este usuario no existe"
      })
    }
  };

  return (
    <>
      {contactState.loading ? (
          <LoadingScreen />
        ) : (
          <Grid container >
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                sx={{backgroundColor: 'whitesmoke'}}
                label="Correo electrónico del amigo"
                value={contactState.email}
                onChange={(e) => 
                  setContactState({
                    ...contactState,
                    email: e.target.value,
                  })
                }
              />
              <Button variant="contained" onClick={handleSearch}>
                Buscar amigo
              </Button>
              <Modal open={contactState.modalOpen} onClose={() => 
                setContactState({
                  ...contactState,
                  modalOpen: false,
                })}>
                <Card style={{ width: 400, margin: 'auto', marginTop: 100, padding: 16 }}>
                  <CardHeader title="Información del amigo" />
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
                      <Button variant="contained" onClick={
                        () => {
                          setAlert({
                            type: "success",
                            message: "Usuario agregado"
                          })
                          addContact(contactState.contactInfo)
                          setContactState({
                            ...contactState,
                            modalOpen: false,
                          })
                        }}>
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
              {alert.type === "success" && (
                <Alert severity="success">{alert.message}</Alert>
              )}
              {alert.type === "error" && (
                <Alert severity="error">{alert.message}</Alert>
              )}
            </Grid>
            
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <CardHeader
                  title={
                    <>
                      Contactos
                      <Badge badgeContent={contacts.length} color="primary">
                        {contacts.length}
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
                    {contacts.map((item, index) => (
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
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </Grid>
            
          </Grid>
        )}
    </>
  )
}

export default Contacts;