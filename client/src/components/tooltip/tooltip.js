import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import styles from './tooltip.module.css';
import { LOCATION_TYPE_DATA } from 'common/constants';
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import addresser from 'addresser';

const Tooltip = ({location, show, x, y}) => {
  const theme = useTheme();
  if (!show) { return; }
  const img = `/static/images/${LOCATION_TYPE_DATA[location.locationTypeName].icon}`;
  const color = `${theme.light.palette.location[location.locationTypeName].color}`;
  let address = location.address;

  try {
    address = addresser.parseAddress(location.address).addressLine1;
  } catch (e) {
      //TODO: Find a better way to deal with this formatting.
  }
    
  return (
    <Card className={styles.card} style={{ position: 'absolute', 'zIndex': 100, top: `${y - 35}px`, left: `${x + 15}px` }}>
      <CardHeader
          title={location.name}
          subheader={address}
          avatar={<Avatar src={img} sx={{bgcolor: color}} />}
      /> 
    </Card>);
}

export default Tooltip;