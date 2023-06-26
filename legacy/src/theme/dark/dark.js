import { createTheme } from '@material-ui/core/styles'
import palette from './palette';
import typography from './typography';

const theme = createTheme({
  palette,
  typography,
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: '0 0 rgba(63,63,68,0.05), 0 0 rgba(63,63,68,0.15)'
      },
      elevation4: {
        boxShadow: '0 0 rgba(63,63,68,0.05), 0 0 rgba(63,63,68,0.15)'
      },      
    },
    MuiTab: {
      wrapper: {
        flexDirection:'row',
      },
      labelIcon: {
        minHeight: 16,
      },
    },
    MuiFormControlLabel: {
      root: {
        alignItems: 'top',
      },
    },
    MuiTabScrollButton: {
      root: {
        color: palette.text.primary
      }
    },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export default theme;
