import * as React from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Slider from "@mui/material/Slider";

const ControlPanel = ({position}) => {
    return (
      <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
      <React.Fragment>
        <CardContent>
          <Avatar src="/broken-image.jpg" />
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Logout
          </Typography>
        </CardContent>
        <Slider defaultValue={30} aria-label="Disabled slider" />
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </React.Fragment>
    </Box>
      );
    }

export default React.memo(ControlPanel);