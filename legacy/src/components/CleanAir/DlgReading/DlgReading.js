import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import {
  MaskOption
} from "components";
import {
  MASK_NOT_REQUIRED,
  MASK_STAFF,
  MASK_REQUIRED,
  CO2_MIN,
  CO2_MAX,
  ACH_MIN,
  ACH_MAX
} from "constants/maplocation";
import {
  ToastError
} from "utility/toast";
import {
  get_current_local_datetime_string,
  gen_random_int
} from "utility/utils";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  appBar: {
    position: "relative",
  },
  alerticon: {
    padding: 4,
    width: 32,
    height: 32,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    width: 160,
    fontSize: 18,
    fontWeight: 500,
  },
  actionbutton: {
    padding: 0,
    margin: 0,
  },
  actionbutton_disabled: {
    padding: 0,
    margin: 0,
    opacity: 0.38,
  },
  actionimg: {
    padding: 2,
    width: 32,
    height: 32,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 0,
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
  airlevel: {
    flex: 1,
    color: theme.palette.text.primary,
    margin: 0,
    padding: 4,
    paddingLeft: 8,
    backgroundColor: theme.palette.background.dark,
    "& input": {
      fontSize: "14px",
      lineHeight: "18px",
      backgroundColor: theme.palette.background.dark,
    },
  },
  image: {
    width: 32,
    height: 32,
  },
  photoinput: {
    display: "none"
  },
  comment: {
    flex: 1,
    color: theme.palette.text.primary,
    margin: 0,
    marginTop: theme.spacing(1),
    padding: 4,
    backgroundColor: theme.palette.background.dark,
    "& input": {
      fontSize: "14px",
      lineHeight: "18px",
      backgroundColor: theme.palette.background.dark,
    },
  },
  dateofreading: {
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.dark,
  },
  maskcontainer: {
    marginTop: theme.spacing(1),
  },
  buttoncontainer: {
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
  },
  applybtn: {
    bottom: theme.spacing(1),
    zIndex: 1100,
    backgroundColor: "#1878F3",
    color: "#FFFFFF",
    borderRadius: "30px",
    padding: "8px 8px",
    fontSize: "16px",
    width: 260,
    textTransform: "initial",
    marginTop: 10,
    marginBottom: 10,
    "&:hover": {
      backgroundColor: "#1878F3",
      color: "#FFFFFF",
    }
  },
  applybtn_disabled: {
    bottom: theme.spacing(1),
    zIndex: 1100,
    backgroundColor: "#1878F3",
    color: "#FFFFFF",
    borderRadius: "30px",
    padding: "8px 8px",
    fontSize: "16px",
    width: 260,
    textTransform: "initial",
    marginTop: 10,
    marginBottom: 10,
    "&:hover": {
      backgroundColor: "#3AB54A",
      color: "#FFFFFF",
    },
    opacity: 0.38,
  },
});

class DlgReading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      co2: "",
      ach: "",
      image: "",
      imageUpload: "",
      comment: "",
      readingat: get_current_local_datetime_string(),
      mask: MASK_NOT_REQUIRED
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSelectMask = this.handleSelectMask.bind(this);

    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount = () => {
    const { reading } = this.props;
    if (reading) {
      this.setState({
        ...this.state,
        id: reading.id,
        co2: reading.co2,
        ach: reading.ach,
        image: reading.image,
        comment: reading.comment,
        readingat: reading.reading_at,
        mask: reading.mask
      });
    }
  }

  componentDidUpdate = (prevProps) => {
    const { reading } = this.props;
    if (!prevProps.reading && reading) {
      this.setState({
        ...this.state,
        id: reading.id,
        co2: reading.co2,
        ach: reading.ach,
        image: reading.image,
        comment: reading.comment,
        readingat: reading.reading_at.substring(0, 16),
        mask: reading.mask
      });
      return;
    }
    if (prevProps.reading && reading &&
      (prevProps.reading.co2 !== reading.co2 ||
        prevProps.reading.ach !== reading.ach ||
        prevProps.reading.comment !== reading.comment ||
        prevProps.reading.mask !== reading.mask ||
        prevProps.reading.reading_at !== reading.reading_at
      )
    ) {
      this.setState({
        ...this.state,
        id: reading.id,
        co2: reading.co2,
        ach: reading.ach,
        image: reading.image,
        comment: reading.comment,
        readingat: reading.reading_at.substring(0, 16),
        mask: reading.mask
      });
    }
  }

  handleChange = (event) => {
    event.persist();
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  handleImageChange = ({ target }) => {
    if (target.files.length === 0) {
      return;
    }
    const fileReader = new FileReader();

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => {
      this.setState({
        ...this.state,
        image: e.target.result,
        imageUpload: target.files[0],
      });
    };
  }

  handleChangeDate = (event) => {
    event.persist();
    // console.log("date :", event.target.value);
    this.setState({
      ...this.state,
      readingat: event.target.value
    });
  }

  handleSelectMask = (mask) => {
    this.setState({
      ...this.state,
      mask: mask
    });
  }

  setError = (message) => {
    ToastError(message);
  }

  handleSave = () => {
    const { 
      id, 
      co2, 
      ach,
      image,
      imageUpload,
      comment, 
      readingat, 
      mask
    } = this.state;

    if (!co2 && !ach) {
      this.setError("CO2 or ACH level must be given");
      return;
    }

    let co2_value = null;
    let ach_value = null;
    if (co2) {
      co2_value = parseInt(co2.trim());
      if (co2_value < CO2_MIN || co2_value > CO2_MAX) {
        this.setError(`CO2 level is invalid, it should be between ${CO2_MIN} and ${CO2_MAX}`);
        return;
      }
    }
    if (ach) {
      ach_value = parseInt(ach.trim());
      if (ach_value < ACH_MIN || ach_value > ACH_MAX) {
        this.setError(`ACH is invalid, it should be between ${ACH_MIN} and ${ACH_MAX}`);
        return;
      }
    }

    let reading_ts = Date.parse(readingat);
    if (reading_ts > Date.now()) {
      this.setError("Reading time shouldn't be future");
      return;
    }

    const reading_dt = new Date(reading_ts);

    const reading = {
      id: id,
      co2: co2_value,
      ach: ach_value,
      image: image,
      imageUpload: imageUpload,
      comment: comment,
      readingat: reading_dt.toISOString(),
      mask: mask
    };

    this.props.onSave(reading);
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  render() {
    const { 
      classes, 
      open,
      loggedIn,
      title, 
      theme 
    } = this.props;
    const { 
      co2, 
      ach,
      comment,
      readingat,
      mask
    } = this.state;

    let apply_enabled = false;
    if (co2 > 0 || ach > 0) {
      apply_enabled = true;
    }

    const photo_id = `image-file-${gen_random_int(1000)}`;

    return (
      <div className={classes.root}>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth={"xs"}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
              <IconButton
                onClick={this.handleCancel}
                className={classes.actionbutton}
              >
                <img
                  className={classes.actionimg}
                  alt="close"
                  src="/static/images/delete.png"
                />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <InputBase
                  id="co2"
                  className={classes.airlevel}
                  fullWidth
                  type="number"
                  name="co2"
                  value={co2 || ""}
                  placeholder={"CO2 level"}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <InputBase
                  id="ach"
                  className={classes.airlevel}
                  fullWidth
                  type="number"
                  name="ach"
                  value={ach || ""}
                  placeholder={"HEPA ACH"}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Grid container 
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item xs={2}>
                <input
                  accept="image/*"
                  className={classes.photoinput}
                  id={photo_id}
                  onChange={this.handleImageChange}
                  type="file"
                />
                <label htmlFor={photo_id}>
                  <IconButton 
                    aria-label="upload picture" 
                    component="span"
                  > 
                    <img 
                      className={classes.image} 
                      alt="camera"
                      src={`/static/images/icons/${theme}/camera.png`} 
                    />
                  </IconButton>
                </label>
              </Grid>
              <Grid item xs={10}>
                <InputBase
                  id="comment"
                  className={classes.comment}
                  multiline
                  fullWidth
                  rows="4"
                  name="comment"
                  value={comment || ""}
                  readOnly={!loggedIn}
                  placeholder={"Comment"}
                  onChange={loggedIn ? this.handleChange : null}
                />
              </Grid>
            </Grid>
            <Grid container 
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item xs={2}>
                <IconButton 
                  aria-label="pick calendar" 
                  component="span"
                > 
                  <img 
                    className={classes.image} 
                    alt="calendar"
                    src={`/static/images/icons/${theme}/calendar.png`} 
                  />
                </IconButton>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  id="datetime-local"
                  label="Date of Reading"
                  type="datetime-local"
                  fullWidth
                  defaultValue={readingat}
                  className={classes.dateofreading}
                  name="readingat"
                  onChange={this.handleChangeDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container spacing={1}
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              className={classes.maskcontainer}
            >
              <Grid item>
                <MaskOption
                  id={MASK_NOT_REQUIRED}
                  selected={mask === MASK_NOT_REQUIRED}
                  image={`/static/images/icons/${theme}/mask-not.png`}
                  text1={"Masks not"}
                  text2={"required"}
                  onSelect={this.handleSelectMask}
                />
              </Grid>
              <Grid item>
                <MaskOption
                  id={MASK_STAFF}
                  selected={mask === MASK_STAFF}
                  image={`/static/images/icons/${theme}/mask-half.png`}
                  text1={"Staff"}
                  text2={"masked"}
                  onSelect={this.handleSelectMask}
                />
              </Grid>
              <Grid item>
                <MaskOption
                  id={MASK_REQUIRED}
                  selected={mask === MASK_REQUIRED}
                  image={`/static/images/icons/${theme}/mask.png`}
                  text1={"Masks"}
                  text2={"Required"}
                  onSelect={this.handleSelectMask}
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.buttoncontainer}>
            {apply_enabled &&
              <Button
                className={classes.applybtn}
                onClick={this.handleSave}
              >
                Save
              </Button>
            }
            {!apply_enabled &&
              <Button
                className={classes.applybtn}
                style={{opacity: 0.38}}
              >
                Save
              </Button>
            }
          </div>

        </Dialog>
      </div>
    );
  }
}

DlgReading.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  mode: PropTypes.bool,
  reading: PropTypes.object,
  loggedIn: PropTypes.bool,
  title: PropTypes.string,
  theme: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
};

export default withStyles(styles)(DlgReading);
