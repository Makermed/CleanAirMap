import { Icon } from '@iconify/react';
import { useTheme } from '@mui/material/styles';
import addresser from 'addresser';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';

const Tooltip = ({info}) => {
  const theme = useTheme();
  if (!info.object) { return; }

  if  (info.object.cluster) {
    return(<Card style={{ position: 'absolute', 'zIndex': 100, top: `${info.y - 35}px`, left: `${info.x + 15}px` }} >
    object.point_count
    </Card>);
  }
  const airQualityLabel = info.object.avgAirQualityRating.label;
  let address = info.object.address;
  try {
    address = addresser.parseAddress(info.object.address).addressLine1;
  } catch (e) {
      //TODO: Find a better way to deal with this formatting.
  }
    
  return (
      <Card style={{ position: 'absolute', 'zIndex': 100, top: `${info.y - 35}px`, left: `${info.x + 15}px` }} >
        <Typography level="title-lg" startDecorator={
              <Icon icon={info.object.locationType.icon}
                fontSize="lg"
                color={theme.air_quality_palette[airQualityLabel.toLowerCase()]}
                aria-label={airQualityLabel} />}>
          {info.object.name}
        </Typography>
        <Divider inset="none" />
        <Typography level="title-md">{address}</Typography>
      </Card>);
}

export default Tooltip;