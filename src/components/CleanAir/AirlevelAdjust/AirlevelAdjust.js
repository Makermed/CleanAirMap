import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography } from "@material-ui/core";
import {
  get_adjusted_co2_level,
  get_adjusted_ach_level,
} from "../../../utility/cleanair";

const styles = (theme) => ({
  root: {
    position: "relative",
    width: 280,
    cursor: "pointer",
    padding: theme.spacing(1),
    border: `2px solid ${theme.palette.text.primary}`,
  },
  label: {
    fontSize: "14px",
    lineHeight: "16px",
    textAlign: "left",
    color: theme.palette.text.primary,
  },
  unit: {
    fontSize: "14px",
    lineHeight: "16px",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  levelinput: {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.card,
    padding: 4,
    border: 0,
    marginTop: theme.spacing(1),
    fontSize: 14,
    fontFamily: "Roboto",
    cursor: "text",
    textAlign: "right",
    "&:focus": {
      outline: "0px",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
      textAlign: "left",
    },
    "&::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
      textAlign: "left",
    },
    "&:-ms-input-placeholder": {
      color: theme.palette.text.secondary,
      textAlign: "left",
    },
  },
  levelinput_error: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.card,
    padding: 4,
    border: "1px solid red",
    marginTop: theme.spacing(1),
    fontSize: 16,
    fontFamily: "Roboto",
    cursor: "text",
    textAlign: "center",
    "&:focus": {
      outline: "0px",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
      textAlign: "center",
    },
    "&::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
      textAlign: "center",
    },
    "&:-ms-input-placeholder": {
      color: theme.palette.text.secondary,
      textAlign: "center",
    },
  },
  activity: {
    width: 70,
    height: 28,
    backgroundColor: theme.palette.background.card,
    padding: 4,
    border: 0,
    "&:focus": {
      outline: "0px",
    },
    borderRadius: 0,
    textTransform: "none",
  },
  activitylabel: {
    color: theme.palette.text.secondary,
    fontFamily: "Roboto",
  },
});

class AirlevelAdjust extends React.Component {
  render() {
    const {
      classes,
      co2_in,
      activity,
      people_no,
      room_volume,
      hepa_cadr,
      uvgi_cap,
      onChange,
      onAcitivityMenu,
    } = this.props;

    const adjustedCO2 = Math.floor(
      get_adjusted_co2_level(
        co2_in,
        activity.cfm,
        people_no,
        hepa_cadr,
        uvgi_cap
      )
    );
    const adjustedACH =
      Math.floor(
        get_adjusted_ach_level(
          co2_in,
          activity.cfm,
          people_no,
          room_volume,
          hepa_cadr,
          uvgi_cap
        ) * 10
      ) / 10;

    return (
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="baseline"
        >
          <Grid item xs={6}>
            <Typography className={classes.label}>CO2 Reading</Typography>
          </Grid>
          <Grid item xs={4}>
            <input
              type="number"
              name="co2_in"
              min={400}
              max={9999}
              value={co2_in === -1 ? "" : co2_in}
              className={classes.levelinput}
              style={{ width: 80 }}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.unit}>ppm</Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography className={classes.label}>Activity</Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              className={classes.activity}
              onClick={(e) => onAcitivityMenu(e.currentTarget)}
            >
              <Typography className={classes.activitylabel}>
                {activity.label}
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.label} style={{ marginLeft: 8 }}>
              #People
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <input
              type="number"
              name="people_no"
              min={0}
              max={9999}
              value={people_no < 0 ? 1 : people_no}
              className={classes.levelinput}
              style={{ width: 60 }}
              onChange={(e) => onChange(e)}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography className={classes.label}>Room volume</Typography>
          </Grid>
          <Grid item xs={4}>
            <input
              type="number"
              name="room_volume"
              min={0}
              max={999999}
              value={room_volume === -1 ? "" : room_volume}
              className={classes.levelinput}
              style={{ width: 80 }}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.unit}>CuFt</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography className={classes.label}>HEPA CADR total</Typography>
          </Grid>
          <Grid item xs={4}>
            <input
              type="number"
              name="hepa_cadr"
              min={0}
              max={999999}
              value={hepa_cadr === -1 ? "" : hepa_cadr}
              className={classes.levelinput}
              style={{ width: 80 }}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.unit}>CFM</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography className={classes.label}>UVGI Capacity</Typography>
          </Grid>
          <Grid item xs={4}>
            <input
              type="number"
              name="uvgi_cap"
              min={0}
              max={9999}
              value={uvgi_cap < 0 ? 0 : uvgi_cap}
              className={classes.levelinput}
              style={{ width: 80 }}
              onChange={(e) => onChange(e)}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.unit}>mW</Typography>
          </Grid>

          <Grid item xs={12}>
            <div
              style={{
                marginTop: 8,
                marginBottom: 8,
                marginLeft: 16,
                marginRight: 16,
                border: 0,
                borderTop: "1px solid gray",
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography className={classes.label}>
              Adjusted CO2/ACH =
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              className={classes.label}
              style={{ textAlign: "right" }}
            >
              {adjustedCO2 === -1 ? "" : `${adjustedCO2} ppm/`}
              {adjustedACH === -1 ? "" : `${adjustedACH} ACH`}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

AirlevelAdjust.propTypes = {
  classes: PropTypes.object,
  co2_in: PropTypes.number,
  activity: PropTypes.object,
  people_no: PropTypes.number,
  room_volume: PropTypes.number,
  hepa_cadr: PropTypes.number,
  uvgi_cap: PropTypes.number,
  onChange: PropTypes.func,
  onAcitivityMenu: PropTypes.func,
};

export default withStyles(styles)(AirlevelAdjust);
