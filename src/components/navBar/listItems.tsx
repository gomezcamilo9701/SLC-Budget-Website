import * as React from 'react';
import { theme } from '../materialUI-common';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (
  
  <React.Fragment>
    <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}>
      <ListItemIcon>
        <DashboardIcon sx={{color: theme.palette.primary.light}}/>
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItemButton>
    <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}>
      <ListItemIcon>
        <ShoppingCartIcon sx={{color: theme.palette.primary.light}}/>
      </ListItemIcon>
      <ListItemText primary="Mi Perfil" />
    </ListItemButton>
    <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}>
      <ListItemIcon>
        <PeopleIcon sx={{color: theme.palette.primary.light}}/>
      </ListItemIcon>
      <ListItemText primary="Contactos" />
    </ListItemButton>
    <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}>
      <ListItemIcon>
        <BarChartIcon sx={{color: theme.palette.primary.light}}/>
      </ListItemIcon>
      <ListItemText primary="Eventos" />
    </ListItemButton>
    <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}>
      <ListItemIcon>
        <LayersIcon sx={{color: theme.palette.primary.light}}/>
      </ListItemIcon>
      <ListItemText primary="Actividades" />
    </ListItemButton>
    <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}>
      <ListItemIcon>
        <LayersIcon sx={{color: theme.palette.primary.light}}/>
      </ListItemIcon>
      <ListItemText primary="Saldos" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Eventos recientes
    </ListSubheader>
    <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.secondary.main}}}>
      <ListItemIcon>
        <AssignmentIcon sx={{color: theme.palette.primary.light}}/>
      </ListItemIcon>
      <ListItemText primary="Mes actual" />
    </ListItemButton>
    <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.secondary.main}}}>
      <ListItemIcon>
        <AssignmentIcon sx={{color: theme.palette.primary.light}}/>
      </ListItemIcon>
      <ListItemText primary="Último trimestre" />
    </ListItemButton>
  </React.Fragment>
);
