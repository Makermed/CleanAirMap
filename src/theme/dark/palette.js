/* eslint-disable linebreak-style */
import { colors } from "@material-ui/core";

const white = "#FFFFFF";
const black = "#000000";

const palette = {
  type: "dark",
  // black,
  // white,
  primary: {
    contrastText: white,
    dark: "#000000",
    main: "#000000",
    light: "#2C2C2C",
  },
  secondary: {
    contrastText: white,
    dark: "#000000",
    main: "#484848",
    light: "#484848",
  },
  success: {
    contrastText: white,
    dark: colors.teal[200],
    main: colors.teal[500],
    light: colors.teal[700],
  },
  info: {
    contrastText: white,
    dark: colors.grey[200],
    main: colors.grey[500],
    light: colors.grey[700],
  },
  warning: {
    contrastText: black,
    dark: colors.orange[200],
    main: colors.orange[500],
    light: colors.orange[700],
  },
  error: {
    contrastText: black,
    dark: colors.red[200],
    main: colors.red[500],
    light: colors.red[700],
  },
  text: {
    primary: "rgba(255,255,255,1.0)",
    secondary: "rgba(255,255,255,0.54)",
    disabled: "rgba(255,255,255,0.38)",
    link: colors.indigo[600],
    podcast: black,
  },
  background: {
    default: black,
    card: "#303030",
    article: "#404040",
    main: "#303030",
    light: "#404040",
    dark: "#191919",
    podcast: "#FFFFFF",
  },
  feedbackground: {
    default: "#141419",
    news: "#0B0E16",
    youtube: "#160101",
    reddit: "#191404",
    twitter: "#021214",
    rss: "#07120D",
    medium: "#191214",
    instagram: "#332E2D",
    podcast: "#151105",
    substack: "#1A1204",
    mastodon: "#040E15",
  },
  feedstroke: {
    default: "#CCCCFF",
    news: "#7289DA",
    youtube: "#D30404",
    reddit: "#FFCA28",
    twitter: "#12B5CB",
    rss: "#43B581",
    medium: "#FFB0CB",
    instagram: "#FFE5DF",
    podcast: "#D4AF37",
    substack: "#FAA61A",
    mastodon: "#2A8CD3",
  },
  icon: "#7289DA",
  divider: colors.grey[900],
};

export default palette;
