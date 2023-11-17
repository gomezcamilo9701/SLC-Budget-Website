import { Box, styled} from '@mui/material';
import { TableCell, TableRow, createTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const getStyles = (theme: Theme) => ({
  MuiTableCell: {
    styleOverrides: {
      root: {
        '&.MuiTableCell-head': {
          backgroundColor: theme.palette.secondary.dark,
          whiteSpace: 'nowrap',
          color: theme.palette.common.white,
        },
        '&.MuiTableCell-body': {
          maxWidth: '180px', 
          wordWrap: 'break-word',
          fontSize: 14,
        },
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      },
    },
  },
});


export const theme = createTheme({
  components: getStyles(createTheme()),
  typography: {
    fontFamily: 'Nunito, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#77EBEB',
      light: '#FFFFFF',
      dark: '#060606',
    },
    secondary: {
      main: '#9A40E0',
      light: '#F5EBFF',
      dark: '#0F3E3C',
    },
    background: {
      default: '#060606',
    },
  },
});




export const Root = styled(Box)({
  minHeight: '100vh',
  minWidth: '100vw',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
});

export const Footer = styled('footer')({
  backgroundColor: 'whitesmoke',
  color: 'black',
  padding: 2,
  textAlign: 'center',
  marginTop: 4,
});
