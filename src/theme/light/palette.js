/* eslint-disable linebreak-style */
import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

const palette = {
  type: "light",
  // black,
  // white,
  primary: {
    contrastText: black,
    dark: '#CCCCCC',
    main: white,
    light: white,
  },
  secondary: {
    contrastText: black,
    dark: '#CCCCCC',
    main: '#E5E6Eb',
    light: white,
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: "rgba(0,0,0,1.0)",
    secondary: "rgba(0,0,0,0.54)",
    disabled: "rgba(0,0,0,0.38)",
    link: colors.blue[600],
    podcast: black
  },
  background: {
    default: white,
    card: "#F4F4F4",
    article: "#F4F4F4",
    main: "#F4F4F4",
    light: "#F4F4F4",
    dark: "#E0E0E0",
    podcast: "#1878F4",
  },
  icon: "#7289DA",
  divider: colors.grey[200]
};

export default palette;