import React, {useState} from 'react'
import {
  Badge,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Grid,
  Button,
  TablePagination
} from "@mui/material";
import { useStyles } from './ActivitiesTableStyle';
import Paper from "@mui/material/Paper";
import { TActivityResponse } from '../../types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type TActivitiesTableProps = {
  activities: TActivityResponse[];
}

export const ActivitiesTable:React.FC<TActivitiesTableProps> = ({
  activities,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (_: unknown, newPage: number) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, activities.length);

  return (
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
                  badgeContent={activities.length}
                  color="secondary"
                  sx={{ ml: 2 }}
                ></Badge>
              </>
            }
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Descripción</TableCell>
                <TableCell>Valor de la actividad</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {activities
              .slice(startIndex, endIndex)
              .map((activity, index) => (
              <TableRow key={index}>
                <TableCell>{activity.description}</TableCell>
                <TableCell>{activity.value}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => null}>
                    <EditIcon />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => null}>
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
              </TableRow>
                  ))}
            </TableBody>
          </Table>
          <TablePagination
                rowsPerPageOptions={[3, 5, 10]}
                component="div"
                count={activities.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
      </Box>
    </Grid>
  )
}
