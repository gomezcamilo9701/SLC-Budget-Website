import { useEffect, useState } from "react";
import { useStyles } from "./EventsStyles";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../materialUI-common";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardHeader,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
import LoadingScreen from "../loading_screen/LoadingScreen";
import { IEventWithId } from "../../types";
import { useAppSelector } from "../../hooks/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getEventsByOwner } from "../../services/user/UserService";
import { startLoading, stopLoading } from "../../store/loading/loadingSlice";
import CONSTANTS from "../../constants";
import EditIcon from '@mui/icons-material/Edit';
import { useEventActions } from "../../store/event/useEventActions";

const MyEvents: React.FC = () => {
  const navigate = useNavigate();

  // #region Estados
  const [events, setEvents] = useState<IEventWithId[] | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 3,
    totalElements: 0,
    totalPages: 0,
  });
  
  // #endregion

  // #region Store
  // Slice
  const user = useAppSelector((state) => state.user);
  const isLoading = useAppSelector((state) => state.loading);

  // Actions
  const {updateEvent} = useEventActions();
  const dispatch = useDispatch();
  // #endregion

  // #region useEffect inicial

  const fetchUserData = async () => {
    dispatch(startLoading());
    try {
      const responseData = await getEventsByOwner(user.id);
      if (responseData) {
        const { content, pageable } = responseData;
        const events: IEventWithId[] | null = content;
        setEvents(events);
        setPagination({
          page: pageable.pageNumber,
          rowsPerPage: pageable.pageSize,
          totalElements: responseData.totalElements,
          totalPages: responseData.totalPages,
        });
      }
    } catch (err) {
      console.error("Error al obetener los datos del servidor", err);
    } finally {
      dispatch(stopLoading());
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  // #endregion

  // #region handleEditEvent
  const handleEditEvent = (event: IEventWithId) => {
    dispatch(startLoading());
    updateEvent(event);
    navigate('/event-details');
    dispatch(stopLoading());
  } 
  // #endregion

  useEffect(() => {
    console.log('eve', events);
    console.log('Longitud de events:', events?.length);
  }, [events])

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
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              component={Paper}
              elevation={1}
              sx={useStyles.paper}
            >
              <Box>
                {events ? (
                  <Card>
                    <CardHeader
                      title={
                        <>
                          Eventos que creé
                          <Badge
                            badgeContent={events?.length}
                            color="secondary"
                            sx={{ ml: 2 }}
                          ></Badge>
                        </>
                      }
                    />
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Tipo de evento</TableCell>
                            <TableCell>Editar</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {events
                            .slice(
                              pagination.page * pagination.rowsPerPage,
                              (pagination.page + 1) * pagination.rowsPerPage
                            )
                            .map((event, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Avatar
                                      sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: "50%",
                                        marginRight: 1,
                                      }}
                                      src={
                                        event.picture
                                          ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${event.picture}`
                                          : ""
                                      }
                                      alt={event.name}
                                    />
                                    {event.name}
                                  </div>
                                </TableCell>
                                <TableCell>{event.description}</TableCell>
                                <TableCell>{event.type}</TableCell>
                                <TableCell>
                                  <Button
                                    variant="outlined"
                                    onClick={() => handleEditEvent(event)}
                                  >
                                    <EditIcon />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      <TablePagination
                        component="div"
                        count={pagination.totalElements}
                        page={pagination.page}
                        onPageChange={(_, newPage) =>
                          setPagination({
                            ...pagination,
                            page: newPage,
                          })
                        }
                        rowsPerPage={pagination.rowsPerPage}
                        onRowsPerPageChange={(e) => {
                          const newRowsPerPage = parseInt(e.target.value, 10);
                          setPagination({
                            ...pagination,
                            rowsPerPage: newRowsPerPage,
                            page: 0,
                          });
                        }}
                      />
                    </TableContainer>
                  </Card>
                ) : (
                  <Typography> No hay eventos </Typography>
                )
                }
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              component={Paper}
              elevation={1}
              sx={useStyles.paper}
            >
              <Box>
                <Card>
                  <CardHeader
                    title={
                      <>
                        Eventos que soy parte
                        <Badge
                          badgeContent={events?.length}
                          color="secondary"
                          sx={{ ml: 2 }}
                        ></Badge>
                      </>
                    }
                  />
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Descripción</TableCell>
                          <TableCell>Tipo de evento</TableCell>
                          <TableCell>Editar</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {events
                          ?.slice(
                            pagination.page * pagination.rowsPerPage,
                            pagination.page * pagination.rowsPerPage +
                              pagination.rowsPerPage
                          )
                          .map((event, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Avatar
                                    sx={{
                                      width: 32,
                                      height: 32,
                                      borderRadius: "50%",
                                      marginRight: 1,
                                    }}
                                    src={
                                      event.picture
                                        ? `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${event.picture}`
                                        : ""
                                    }
                                    alt={event.name}
                                  />
                                  {event.name}
                                </div>
                              </TableCell>
                              <TableCell>{event.description}</TableCell>
                              <TableCell>{event.type}</TableCell>
                              <TableCell>
                                <Button
                                  variant="outlined"
                                  onClick={() => null}
                                >
                                  Ir al evento
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      component="div"
                      count={2}
                      page={pagination.page}
                      onPageChange={(_, newPage) =>
                        setPagination({
                          ...pagination,
                          page: newPage,
                        })
                      }
                      rowsPerPage={pagination.rowsPerPage}
                      onRowsPerPageChange={(e) => {
                        setPagination({
                          ...pagination,
                          rowsPerPage: parseInt(e.target.value, 10),
                          page: 0,
                        });
                      }}
                    />
                  </TableContainer>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
};

export default MyEvents;
