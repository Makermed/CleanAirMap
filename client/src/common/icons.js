import { Icon } from '@iconify/react';
import { useTheme } from '@emotion/react'
import Badge, { badgeClasses } from '@mui/joy/Badge';

export const LocationIcon = ({location_type}) => {
    const theme = useTheme();
    const color = `${theme.palette.location[location_type].main}`;
    var icon = ""
    switch(location_type) {
        case "arena":
            icon = "mdi:arena";
            break;
        case "shop":
            icon = "grommet-icons:shop";
            break;
        case "museum":
            icon = "mdi:museum";
            break;
        case "bar":
            icon = "maki:bar";
            break;
        case "cafe":
            icon = "fa-solid:coffee";
            break;
        case "hospital":
            icon = "mdi:medical-bag";
            break;
        case "train":
            icon = "mdi:train";
            break;
        case "restaurant":
            icon = "mdi:food";
            break;
        case "worship":
            icon = "mdi:hands-pray";
            break;
        case "library":
            icon = "ion:library-sharp";
            break;
        case "arts":
            icon = "mdi:drama-masks";
            break;
        case "hotel":
            icon = "mdi:hotel";
            break;
        case "gasstation":
            icon = "mdi:gas-station";
            break;
        case "parking":
            icon = "fluent:vehicle-car-parking-24-filled";
            break;
        case "movie":
            icon = "mdi:movie-role"
            break;
        case "park":
            icon = "ph:park-fill";
            break;
        case "camera":
            icon = "mdi:camera";
            break;
        case "pharmacy":
            icon = "mdi:local-pharmacy";
            break;
        case "school":
            icon = "maki:school";
            break;
        case "fitness":
            icon = "mdi:weights";
            break;
        case "seniors":
            icon = "healthicons:old-woman";
            break;
        case "professional":
            icon = "mdi:briefcase";
            break;
        case "dentists":
            icon = "mdi:dentist";
            break;
        case "dining":
            icon = "mdi:local-dining";
            break;
        default:
            icon = "ph:wind-bold";
            break;
    }
    return (
        <Badge
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}>
            <Icon icon={icon} fontSize="lg" color={color} aria-label={location_type} />
        </Badge>);
    
};

