import React, {useState} from 'react'
import {
  Avatar,
  Badge,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  CardContent,
  Grid,
  Typography,
  Button
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { IUserWithId, TInvitationResponse } from '../../types';
import CONSTANTS from '../../constants';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import PendingSharpIcon from '@mui/icons-material/PendingSharp';

type IInvitationsProps = {
  contacts: IUserWithId[];
  handleInvitation: (contactId: number) => Promise<void>;
  invitations: TInvitationResponse[] | null;
  setOpenModalInvitation: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancelInvitation: (invitationId: number) => Promise<void>;
}

const Invitations:React.FC<IInvitationsProps> = ({
  contacts,
  handleInvitation,
  invitations,
  setOpenModalInvitation,
  handleCancelInvitation
}) => {
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 2,
  });

  return (
    <>
    {invitations ? (
      <Card style={{ width: '80%', margin: 'auto', marginTop: 100, padding: 16, textAlign: "center" }}>
        <CardHeader
            title="Invita a tus amigos"
        />
        <CardContent>
          <Grid container>
            <Grid item xs={12} md={6} lg={6}>
              <TableContainer component={Paper}>
                  <Typography variant="h6" component="div">
                      Tus contactos
                      <Badge badgeContent={contacts.length} color="secondary" sx={{ ml: 2 }}>
                      </Badge>
                  </Typography>
                  
                  <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Agregar</TableCell>
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
                              src={contact.profileImage
                                ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${contact.profileImage}`
                                : ''}
                              alt={contact.name}
                            />
                            {contact.name}
                          </div>
                        </TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>
                          <Button variant="outlined" onClick={() => handleInvitation(contact.id)}>
                            <PersonAddIcon />
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
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TableContainer component={Paper}>
                <Typography variant="h6" component="div">
                      Invitaciones a tu evento
                      <Badge badgeContent={contacts.length} color="secondary" sx={{ ml: 2 }}>
                      </Badge>
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell>Cancelar</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {invitations
                      .slice(pagination.page * pagination.rowsPerPage, pagination.page
                        * pagination.rowsPerPage + pagination.rowsPerPage)
                      .map((invitation, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                marginRight: 1,
                              }}
                              src={invitation.contactProfileImage
                                ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${invitation.contactProfileImage}`
                                : ''}
                              alt={invitation.contactEmail}
                            />
                            {invitation.contactEmail}
                          </div>
                        </TableCell>
                        <TableCell>{invitation.contactName}</TableCell>
                        <TableCell >
                          <PendingSharpIcon color='success'/>
                        </TableCell>
                        <TableCell>
                          <Button variant="outlined" onClick={() => handleCancelInvitation(invitation.invitation_id)}>
                            <DoDisturbIcon color='error'/>
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
            </Grid>
          </Grid>
          <Button variant="contained" onClick={() => setOpenModalInvitation(false)}>
            <CloseIcon />
          </Button>
        </CardContent>
      </Card>
    ) : (
      <Typography> No hay invitaciones </Typography>
    )}
    </>
)}

export default Invitations