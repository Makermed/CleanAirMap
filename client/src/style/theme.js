import { extendTheme } from '@mui/joy/styles';

const air_quality_palette = {
        bad: 'red',
        moderate: 'orange',
        good: 'green',
        unknown: 'grey',
};

export default extendTheme({
    colorSchemes: {
        light: {
          air_quality_palette: air_quality_palette,
        },
        dark: {
          air_quality_palette: air_quality_palette,
        }
    }
});
