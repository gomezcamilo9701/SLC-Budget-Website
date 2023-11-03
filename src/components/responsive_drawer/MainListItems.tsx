import React from 'react';
import { theme } from '../materialUI-common';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const MainListItems = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}
        onClick={() => navigate('/')}>
        <ListItemIcon>
          <DashboardIcon sx={{color: theme.palette.primary.light}}/>
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItemButton>
  
      <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}
      onClick={() => navigate('/profile')}>
        <ListItemIcon>
          <ShoppingCartIcon sx={{color: theme.palette.primary.light}}/>
        </ListItemIcon>
        <ListItemText primary="Mi Perfil" />
      </ListItemButton>
      
      <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}
      onClick={() => navigate('/contacts')}>
        <ListItemIcon>
          <PeopleIcon sx={{color: theme.palette.primary.light}}/>
        </ListItemIcon>
        <ListItemText primary="Contactos" />
      </ListItemButton>
  
      <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}
      onClick={() => navigate('/events')}>
        <ListItemIcon>
          <BarChartIcon sx={{color: theme.palette.primary.light}}/>
        </ListItemIcon>
        <ListItemText primary="Eventos" />
      </ListItemButton>
  
      <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}
      onClick={() => navigate('/')}>
        <ListItemIcon>
          <LayersIcon sx={{color: theme.palette.primary.light}}/>
        </ListItemIcon>
        <ListItemText primary="Actividades" />
      </ListItemButton>
  
      <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}
      onClick={() => navigate('/')}>
        <ListItemIcon>
          <LayersIcon sx={{color: theme.palette.primary.light}}/>
        </ListItemIcon>
        <ListItemText primary="Saldos" />
      </ListItemButton>
    </React.Fragment>
  );
}
