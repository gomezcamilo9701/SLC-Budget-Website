import {
  AppBar,
  Box,
  Container,
  Toolbar,
} from "@mui/material";
import React from "react";

export const NavBar: React.FC = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
