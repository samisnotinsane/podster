import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#F9CDB4',
    },
    secondary: {
        main: '#ae8f7d'
    },
  },
  status: {
    danger: 'red',
  },
});

export default theme;