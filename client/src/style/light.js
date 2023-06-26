import { createTheme } from '@mui/material/styles';
import colors from './colors.js';

console.log(colors);
export default createTheme(colors, {
    palette: {
        location: {
            "all": {
                color: colors.palette.lightblue,
                contrast: "#F7FCFD",
            },
            "shop": {
                color: colors.palette.lightblue,
                contrast: "#F7FCFD",
            },
            "museum": {
                color: colors.palette.pink,
                contrast: "#FEFAFB",
            },
            "bar": {
                color: colors.palette.lightred,
                contrast: "#FEFAFA",
            },
            "cafe": {
                color: colors.palette.green,
                contrast: "#FAFDFB",
            },
            "hospital": {
                color: colors.palette.purple,
                contrast: "#FBFCFE",
            },
            "train": {
                color: colors.palette.blue,
                contrast: "#FAFCFE",
            },
            "restaurant": {
                color: colors.palette.orange,
                contrast: "#191208",
            },
            "worship": {
                color: colors.palette.green,
                contrast: "#FAFDFB",
            },
            "library": {
                color: colors.palette.grey,
                contrast: "#101213",
            },
            "arts": {
                color: colors.palette.lightblue,
                contrast: "#F7FCFD",
            },
            "hotel": {
                color: colors.palette.pink,
                contrast: "#FEFAFB",
            },
            "gasstation": {
                color: colors.palette.lightred,
                contrast: "#FEFAFA",
            },
            "parking": {
                color: colors.palette.green,
                contrast: "#FAFDFB",
            },
            "movie": {
                color: colors.palette.purple,
                contrast: "#FBFCFE",
            },
            "park": {
                color: colors.palette.blue,
                contrast: "#FAFCFE",
            },
            "camera": {
                color: colors.palette.orange,
                contrast: "#191208",
            },
            "arena": {
                color: colors.palette.grey,
                contrast: "#101213",
            },
            "pharmacy": {
                color: colors.palette.lightblue,
                contrast: "#FAFCFE",
            },
            "school": {
                color: colors.palette.grey,
                contrast: "#101213",
            },
            "scissors": {
                color: colors.palette.lightred,
                contrast: "#FEFAFA",
            },
            "fitness": {
                color: colors.palette.green,
                contrast: "#FAFDFB",
            },
            "seniors": {
                color: colors.palette.purple,
                contrast: "#FBFCFE",
            },
            "professional": {
                color: colors.palette.blue,
                contrast: "#FAFCFE",
            },
            "dentists": {
                color: colors.palette.orange,
                contrast: "#191208",
            },
            "dining": {
                color: colors.palette.grey,
                contrast: "#101213",
            }
        },
    }
});
