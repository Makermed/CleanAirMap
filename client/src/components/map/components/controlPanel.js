import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';

/* A placeholder control panel. */
const ControlPanel = () => {
    return (
      <Card sx={{ position: 'absolute', top: 20, left: 20, zIndex: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <CardContent>
          
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Logout
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      );
    }

export default React.memo(ControlPanel);