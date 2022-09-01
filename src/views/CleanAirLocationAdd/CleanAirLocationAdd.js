import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Tabs,
  Tab,
  IconButton,
  Button,
  Typography,
  Grid,
  TextField
} from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { geolocated } from "react-geolocated";
import { 
  withAuthentication, 
  withAuthorization 
} from "session";
import {
  BasicAppBar,
  WaitingDialog,
  DlgConfirm,
  AirlevelInput,
  MaskOption
} from "components";
import { 
  withFirebase,
  GraphqlService 
} from "services";
import * as ROUTES from "constants/routes";
import {
  MIN_CARD_WIDTH,
  MAX_ARTICLE_WIDTH,
  GRAPHQL_ERROR,
} from "constants/types";
import { 
  CONF_LOCATION_TYPES,
  LOCATION_TYPE_MUSEUM, 
  MASK_NOT_REQUIRED, 
  MASK_REQUIRED,
  MASK_STAFF,
  CO2_MIN,
  CO2_MAX,
  ACH_MIN,
  ACH_MAX
} from "constants/maplocation";
import { 
  ACTIVITY_TYPE_CLEANAIRMAP,
  ACTIVITY_ADD
} from "constants/activity";
import { 
  ToastError,
  ToastSuccess
} from "utility/toast";
import { 
  ARTICLE_BRANCH_TWITTER,
  ARTICLE_BRANCH_INSTAGRAM
} from "constants/branches";
import { 
  NOTIFICATION_MAP_LOCATION_APPLY_MODERATOR
} from "constants/notification";
import {
  address_from_geolocation,
  address_from_georesult
} from "utility/mapbox";
import {
  get_region_name
} from "utility/cleanair";
import {
  check_source_link
} from "utility/checklink";
import {
  slugify,
  gen_random_int,
  get_current_local_datetime_string
} from "utility/utils";
import { 
  moderate_image 
} from "utility/ravenapi";
import {
  resizeImageFile
} from "utility/resizeimage";


const condition = (authUser) => !!authUser && authUser.uid !== "";


const styles = (theme) => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh)`,
    width: MAX_ARTICLE_WIDTH,
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme.palette.background.default,
  },
  appbar: {
    width: theme.breakpoints.lg,
    maxWidth: "100%",
    height: "56px",
    [theme.breakpoints.up('sm')]: {
      height: "64px",
    },
  },
  infocontainer: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  name: {
    display: 'block',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.card,
    padding: 4,
    marginBottom: theme.spacing(1),
    border: 0,
    fontSize: 18,
    fontFamily: "Roboto",
    "&:focus": {
      outline: "0px",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
    },
    "&::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
    },
    "&:-ms-input-placeholder": {
      color: theme.palette.text.secondary,
    },
  },
  desccontainer: {
    height: 100,
    marginBottom: theme.spacing(1),
  },
  photoinput: {
    display: "none"
  },
  imagecontainer: {
    float: 'left',
    height: 100,
    width: 32,
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.background.card,
  },
  photobtn: {
    width: 24,
    height: 24,
    marginTop: 36,
  },  
  description: {
    height: 100,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.card,
    border: 0,
    fontSize: 18,
    padding: 4,
    fontFamily: "Roboto",
    overflowWrap: "anywhere",
    "&:focus": {
      outline: "0px",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
    },
    "&::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
    },
    "&:-ms-input-placeholder": {
      color: theme.palette.text.secondary,
    },
  },
  addresscontainer: {
    marginBottom: theme.spacing(1),
  },
  icon_button: {
    float: "left",
    padding: 4,
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.background.card,
    borderRadius: 8,
    "&:hover, &.Mui-focusVisible, &:active": {
      backgroundColor: theme.palette.background.card,
    },
  },
  positionimg: {
    width: 24,
    height: 24,
  },
  suite: {
    display: 'inline',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.card,
    padding: 4,
    marginRight: theme.spacing(1),
    border: 0,
    fontSize: 18,
    fontFamily: "Roboto",
    "&:focus": {
      outline: "0px",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
    },
    "&::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
    },
    "&:-ms-input-placeholder": {
      color: theme.palette.text.secondary,
    },
  },
  address: {
    display: 'inline',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.card,
    padding: 4,
    border: 0,
    fontSize: 18,
    fontFamily: "Roboto",
    "&:focus": {
      outline: "0px",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
    },
    "&::-webkit-input-placeholder": {
      color: theme.palette.text.secondary,
    },
    "&:-ms-input-placeholder": {
      color: theme.palette.text.secondary,
    },
  },
  datecontainer: {
    height: 48,
    marginBottom: theme.spacing(1),
  },
  calendarcontainer: {
    float: 'left',
    height: 48,
    width: 32,
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.background.card,
  },
  calendarbtn: {
    width: 24,
    height: 24,
    marginTop: 8,
  }, 
  dateofreading: {
    backgroundColor: theme.palette.background.dark,
  },
  typecontainer: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  typename: {
    fontSize: "16px",
    lineHeight: "20px",
    margin: theme.spacing(1),
  },
  typetabs: {
    margin: 0,
    minHeight: 36,
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
    paddingBottom: 2,
    backgroundColor: theme.palette.background.default,
  },
  typetab: {
    marginRight: 4,
    padding: 0,
    paddingTop: 2,
    minWidth: 32,
    minHeight: 32,
    fontFamily: "Arial",
    fontSize: 14,
    textTransform: "inherit",
    fullWidth: false,
    backgroundColor: theme.palette.background.default
  },
  typeimg: {
    margin: 0,
    padding: 2,
    width: 32,
    height: 32,
    borderRadius: "50%",
  },
  indicator: {
    backgroundColor: "transparent",
  },
  scrollbtn: {
    color: theme.palette.primary.text
  },
  selectcontainer: {
    marginTop: theme.spacing(1),
    margin: theme.spacing(2),
    textAlign: "center",
  },
  title: {
    fontSize: "16px",
    lineHeight: "20px",
  },
  airlevelcontainer: {
    marginTop: theme.spacing(2),
  },
  maskcontainer: {
    marginTop: theme.spacing(2),
  },
  bottomspace: {
    paddingBottom: theme.spacing(8),
  },
  applybtn: {
    //position: "absolute",
    position: "fixed",
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
    position: "fixed",
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


class CleanAirLocationAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      image: "",
      imageUpload: "",
      description: "",
      suite: "",
      address: "",
      locality: "",
      place: "",
      district: "",
      postcode: "",
      region: "",
      country: "",
      socialurl: "",
      latitude: "",
      longitude: "",
      co2: -1,
      ach: -1,
      selected_level: "co2",
      readingat: get_current_local_datetime_string(),
      loctype: LOCATION_TYPE_MUSEUM,
      mask: MASK_NOT_REQUIRED,
      showConfirmDlg: false,
    };

    this.handleNavBack = this.handleNavBack.bind(this);

    this.handleCancel = this.handleCancel.bind(this);
    this.handleApply = this.handleApply.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);

    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleClickPosition = this.handleClickPosition.bind(this);
    
    this.handleSelectLevel = this.handleSelectLevel.bind(this);
    this.handleChangeCO2 = this.handleChangeCO2.bind(this);
    this.handleChangeAch = this.handleChangeAch.bind(this);
    this.handleSelectMask = this.handleSelectMask.bind(this);

    this.handleSubmitLocation = this.handleSubmitLocation.bind(this);
  }

  setError = (message) => {
    ToastError(message);
    this.props.requestDataFinished();
  }

  showSuccess = (message) => {
    ToastSuccess(message);
  }

  setWaiting = (waiting) => {
    if (waiting) {
      this.props.requestDataPending();
    } else {
      this.props.requestDataFinished();
    }
  }

  componentDidMount = async () => {
    const { geo_lat, geo_lng } = this.props;

    if (!geo_lat || !geo_lng) {
      return;
    }

    this._getAddress(geo_lng, geo_lat);
  }


  _getAddress = async (lng, lat) => {
    const result = await address_from_geolocation(lng, lat);
    if (result.error) {
      this.setError(result.message);
      this.props.history.goBack();
      return;
    }

    const location = address_from_georesult(result.address[0]);

    this.setState({
      ...this.state,
      name: location.name,
      suite: location.suite,
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
      postcode: location.postcode,
      locality: location.locality,
      place: location.place,
      district: location.district,
      region: location.region,
      country: location.country
    });
  }

  _getAuthToken = async () => {
    const { authUser } = this.props;
    let token = authUser.token;
    if (Date.now() >= authUser.expiredTS) {
      const result = await this.props.firebase.refreshToken();
      if (result.error) {
        this.setError(result.msg);
        token = null;
      } else {
        token = result.token;
      }
    }
    return token;
  };

  handleLogin = () => {
    const location = {
      pathname: ROUTES.SIGN_IN,
      state: { animation: "bottom" },
    };
    this.props.history.push(location);
  };

  handleNavBack = () => {
    this.props.history.goBack();
  }


  handleCancel = () => {
    this.setState({
      ...this.state,
      showConfirmDlg: false,
    });
  }

  handleApply = () => {
    this.setState({
      ...this.state,
      showConfirmDlg: true
    });
  }

  handleChange = (event) => {
    event.persist();
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

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

  handleChangeType = (event, newValue) => {
    if (newValue === null) return;
    const { loctype } = this.state;
    if (loctype === newValue) return;

    this.setState({
      ...this.state,
      loctype: newValue
    });
  }

  handleClickPosition = async () => {
    if (!this.props.isGeolocationAvailable) {
      this.setError("Browser does not support Geolocation");
    } else if (!this.props.isGeolocationEnabled) {
      this.setError("Geolocation is not enabled");
    } else if (this.props.coords) {
      this._getAddress(this.props.coords.longitude, this.props.coords.latitude);
      this.props.setMapCenterPos(this.props.coords.longitude, this.props.coords.latitude);
    }
  }

  handleSelectLevel = (name) => {
    this.setState({
      ...this.state,
      selected_level: name
    });
  }

  handleChangeCO2 = (level) => {
    // console.log("CO2 level :", level);
    const value = parseInt(level);
    this.setState({
      ...this.state,
      co2: isNaN(value) ? -1 : value
    });  
  }

  handleChangeAch = (level) => {
    // console.log("ACH level :", level);
    const value = parseInt(level);
    this.setState({
      ...this.state,
      ach: isNaN(value) ? -1 : value
    });  
  }

  handleSelectMask = (mask_id) => {
    this.setState({
      ...this.state,
      mask: mask_id
    });
  }

  handleSubmitLocation = async () => {
    const { authUser } = this.props;
    const {
      name,
      description,
      imageUpload,
      suite,
      address,
      locality,
      place,
      district,
      postcode,
      region,
      country,
      socialurl,
      latitude,
      longitude,
      co2,
      ach,
      loctype,
      readingat,
      mask
    } = this.state;

    if (name.trim() === "") {
      this.setError("Name should be given");
      return;
    }
    if (co2 !== -1 && (co2 < CO2_MIN || co2 > CO2_MAX)) {
      this.setError(`CO2 level is invalid, it should be between ${CO2_MIN} and ${CO2_MAX}`);
      return;
    }
    if (ach !== -1 && (ach < ACH_MIN || ach > ACH_MAX)) {
      this.setError(`ACH is invalid, it should be between ${ACH_MIN} and ${ACH_MAX}`);
      return;
    }
    if (socialurl.length > 0) {
      const source_link = check_source_link(socialurl.trim());
      if (!source_link) {
        this.setError("Twitter/Instagram Url is invalid");
        return;
      }
      if (source_link.branch !== ARTICLE_BRANCH_TWITTER && source_link.branch !== ARTICLE_BRANCH_INSTAGRAM) {
        this.setError("Url should be either twitter or instagram url");
        return;
      }
    }

    let reading_ts = Date.parse(readingat);
    if (reading_ts > Date.now()) {
      this.setError("Reading time shouldn't be future");
      return;
    }

    let new_image = "";
    if (imageUpload) {
      const resized_image = await resizeImageFile(imageUpload);
      const result = await this.props.firebase.uploadImage(resized_image, "readings");
      if (result.error) {
        this.setError("Failed to upload image.");
        return;
      }
      new_image = result.url;
      const modresult = moderate_image(new_image);
      console.log("image moderation result :", modresult);
      if (modresult.result) {
        this.setError("Image not allowed, because it contains adults or racy content.");
        await this.props.firebase.deleteImage(new_image);
        return;
      }
    }

    const gqlservice = new GraphqlService();
    const token = await this._getAuthToken();
    if (!token) {
      this.handleLogin();
      return;
    }
    gqlservice.set_auth_jwt(token);

    this.setWaiting(true);

    const slug = slugify(name.trim());
    const currentTime = new Date().toISOString();

    // region
    let regionInfo = {
      locality: locality,
      place: place,
      district: district,
      region: region,
      country: country,
      created_at: currentTime,
      created_by: authUser.uid
    };
    const region_name = get_region_name(regionInfo);
    const region_slug = slugify(`${region_name}-${regionInfo.country}`);
    regionInfo.slug = region_slug;

    let result = await gqlservice.map_region_by_slug(region_slug);
    if (result.status_code === GRAPHQL_ERROR) {
      this.setError(result.msg);
      return;
    }

    let region_id = null;
    if (result.data.region.length > 0) {
      region_id = result.data.region[0].id;
    } else {
      // register this region
      result = await gqlservice.insert_map_region(regionInfo);
      if (result.status_code === GRAPHQL_ERROR) {
        this.setError(result.msg);
        return;
      }
      if (result.data.insert_region.affected_rows === 0) {
        this.setError(`Failed to add the region ${region_name}`);
        return;
      }
      region_id = result.data.insert_region.returning[0].id;

      // register region moderator
      const region_moderator = {
        user_id: authUser.uid,
        region_id: region_id,
        approved: true,
        approved_by: authUser.uid,
        approved_at: currentTime
      };

      await gqlservice
        .insert_map_region_moderator(region_moderator)
        .then(
          (result) => {
            if (result.data.insert_region_moderators.affected_rows > 0) {
              this.props.insertRegionModerator(moderator);
            } else {
              this.setError("Failed to moderate region");
              return;
            }
          },
          (reason) => {
            this.setError(reason.msg);
            return;
          }
        )
        .catch((err) => {
          this.setError(JSON.stringify(err));
          return;
        });
    }
    // console.log("region id :", region_id);

    // location
    const location = {
      region_id: region_id,
      type: loctype,
      suite: suite ? suite.trim() : null,
      address: address.trim(),
      postcode: postcode,
      latitude: latitude,
      longitude: longitude,
      name: name.trim(),
      description: description ? description.trim() : null,
      slug: slug,
      social_link: socialurl ? socialurl.trim() : null,
      created_at: currentTime,
      created_by: authUser.uid,
      approved: true,
      approved_at: currentTime,
      approved_by: authUser.uid
    };

    // reading to this location
    const reading_dt = new Date(reading_ts);
    let reading = {
      location_id: -1,
      co2: co2 === -1 ? null : co2,
      ach: ach === -1 ? null : ach,
      mask: mask,
      image: new_image,
      reading_at: reading_dt.toISOString(),
      reading_by: authUser.uid,
      approved: true,
      approved_at: currentTime,
      approved_by: authUser.uid
    };

    let location_id = -1;

    await gqlservice
      .insert_map_location(location)
      .then((result) => {
        const locations = result.data.insert_locations.returning;
        if (locations.length > 0) {
          location_id = locations[0].id;
          reading.location_id = location_id;
          return gqlservice.insert_map_reading(reading);
        } else {
          this.setError("Failed to add location");
          return;
        }
      })
      .then((result) => {
        const readings = result.data.insert_readings.returning;
        if (readings.length > 0) {
          this.showSuccess("Location added successfully");
        } else {
          this.setError("Failed to add reading");
          return
        }
      }, (reason) => {
        this.setError(reason.msg);
        return;
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
        return;
      });

    // make moderator of this location
    const moderator = {
      user_id: authUser.uid,
      location_id: location_id,
      approved: true,
      approved_by: authUser.uid,
      approved_at: currentTime
    };

    await gqlservice
      .insert_map_location_moderator(moderator)
      .then(result => {
        if (result.data.insert_location_moderators.affected_rows === 0) {
          this.setError("Failed to register as a moderator");
          return;
        }
      }, (reason) => {
          this.setError(reason.msg);
          return;
      })
      .catch((err) => {
        this.setError(JSON.stringify(err));
        return;
      });

    // insert notification
    const notification = {
      type: NOTIFICATION_MAP_LOCATION_APPLY_MODERATOR,
      object: location_id.toString(),
      in_which: "cleanairmap",
      to: location.created_by,
      created_by: authUser.uid
    }

    await gqlservice
      .insert_notification(notification)
      .then(result => {}, reason => {
        this.setError(reason.msg);
        return;
      })
      .catch(err => {
        this.setError(JSON.stringify(err));
        return;
      });

    // log this activity
    const activity = {
      user_id: authUser.uid,
      type: ACTIVITY_TYPE_CLEANAIRMAP,
      type_id: reading.location_id.toString(),
      action: ACTIVITY_ADD,
      object: `the location ${location.name}`,
      fromto: `to the cleanairmap`,
      reason: "",
    };
    await gqlservice
      .insert_activitylog(activity)
      .then(
        (result) => {
        },
        (reason) => {
          this.setError(reason.msg);
        }
      )
      .catch((err) => {
        this.setError(JSON.stringify(err));
      });

    this.setWaiting(false);

    const path = {
      pathname: ROUTES.CLEANAIRMAP,
      state: { animation: "bottom" },
    };
    this.props.history.push(path);
  }


  render() {
    const { 
      classes,
      theme_mode,
      requesting
    } = this.props;
    const {
      name,
      description,
      suite,
      address,
      socialurl,
      loctype,
      co2,
      ach,
      selected_level,
      mask,
      readingat,
      showConfirmDlg,
    } = this.state;

    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    const applyButtonPos = (width - 260) / 2;

    let text_width = width > MAX_ARTICLE_WIDTH ? MAX_ARTICLE_WIDTH - 32 : width - 32;
    let desc_width = width > MAX_ARTICLE_WIDTH ? MAX_ARTICLE_WIDTH - 72 : width - 72;
    let address_width = width > MAX_ARTICLE_WIDTH ? MAX_ARTICLE_WIDTH - 150 : width - 150;

    let apply_enabled = false;
    if (name && address && ((co2 >= CO2_MIN && co2 <= CO2_MAX ) || (ach >= ACH_MIN && ach <= ACH_MAX))) {
      apply_enabled = true;
    }

    const photo_id = `image-file-${gen_random_int(1000)}`;

    return (
      <div className={classes.root}>
        <div className={classes.appbar}>
          <BasicAppBar
            title={"Add a Location"}
            width={MAX_ARTICLE_WIDTH}
            onNavBack={this.handleNavBack}
          />
        </div>

        <div className={classes.infocontainer}>
          <input
            name="name"
            placeholder="Name"
            value={name || ""}
            className={classes.name}
            style={{width: text_width}}
            onChange={this.handleChange}
          />
          
          <div className={classes.desccontainer}>
            <div className={classes.imagecontainer}>
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
                  style={{padding: 4}}
                > 
                  <img 
                    className={classes.photobtn} 
                    alt="camera"
                    src={`/static/images/icons/${theme_mode}/camera.png`} 
                  />
                </IconButton>
              </label>
            </div>
            <textarea
              name="description"
              placeholder="Description"
              value={description || ""}
              className={classes.description}
              style={{width: desc_width}}
              onChange={this.handleChange}
            />
          </div>

          <div className={classes.addresscontainer}>
            <IconButton
              className={classes.icon_button}
              onClick={this.handleClickPosition}
            >
              <img
                alt={"current position"}
                src={`/static/images/icons/${theme_mode}/gps.png`}
                className={classes.positionimg}
              />
            </IconButton>
            <input 
              name="suite"
              placeholder="Suite"
              value={suite || ""}
              className={classes.suite}
              style={{width: 70}}
              onChange={this.handleChange}
            />
            <input 
              name="address"
              placeholder="Address"
              value={address || ""}
              className={classes.address}
              style={{width: address_width}}
              onChange={this.handleChange}
            />
          </div>

          <div className={classes.datecontainer}>
            <div className={classes.calendarcontainer}>
              <IconButton 
                aria-label="pick calendar"
                className={classes.icon_button}
              > 
                <img 
                  className={classes.calendarbtn} 
                  alt="calendar"
                  src={`/static/images/icons/${theme_mode}/calendar.png`} 
                />
              </IconButton>
            </div>
            <TextField
              id="datetime-local"
              label="Date of Reading"
              type="datetime-local"
              defaultValue={readingat}
              className={classes.dateofreading}
              style={{width: desc_width}}
              name="readingat"
              onChange={this.handleChangeDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <input
            name="socialurl"
            placeholder="Twitter/Instagram URL"
            value={socialurl || ""}
            className={classes.name}
            style={{width: text_width}}
            onChange={this.handleChange}
          />

        </div>

        <div className={classes.typecontainer}>
          <Typography className={classes.typename}>
            {CONF_LOCATION_TYPES[loctype+1].name}
          </Typography>
          <Tabs
            className={classes.typetabs}
            classes={{ indicator: classes.indicator }}
            value={loctype}
            onChange={this.handleChangeType}
            variant="scrollable"
            scrollButtons="auto"
          >
            {CONF_LOCATION_TYPES.slice(1).map((item, index) => (
              <Tab
                value={item.value}
                key={item.name}
                className={classes.typetab}
                icon={
                  <img
                    alt={item.name}
                    src={`/static/images/icons/loc_types/${item.image}`}
                    className={classes.typeimg}
                    style={{backgroundColor: `${item.color}`}}
                  />
                }
              />
            ))}
          </Tabs>
        </div>

        <div className={classes.selectcontainer}>
          <Typography className={classes.title}>
            How is the location protecting visitors?
          </Typography>

          <div className={classes.airlevelcontainer}>
            <Grid
              container spacing={1}
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Grid item>
                <AirlevelInput
                  name="co2"
                  min={CO2_MIN}
                  max={CO2_MAX}
                  selected={selected_level==="co2"}
                  image={`/static/images/icons/${theme_mode}/cleanair.png`}
                  text1={"Fresh"}
                  text2={"Air"}
                  placeholder={"CO2 level"}
                  level={co2}
                  onSelect={this.handleSelectLevel}
                  onChange={this.handleChangeCO2}
                />
              </Grid>
              <Grid item>
                <AirlevelInput
                  name="ach"
                  min={ACH_MIN}
                  max={ACH_MAX}
                  selected={selected_level==="ach"}
                  image={`/static/images/icons/${theme_mode}/hepa-filter.png`}
                  text1={"HEPA"}
                  text2={"filters"}
                  placeholder={"ACH"}
                  level={ach}
                  onSelect={this.handleSelectLevel}
                  onChange={this.handleChangeAch}
                />
              </Grid>
            </Grid>
          </div>

          <div className={classes.maskcontainer}>
            <Grid
              container spacing={1}
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Grid item>
                <MaskOption
                  id={MASK_NOT_REQUIRED}
                  selected={mask === MASK_NOT_REQUIRED}
                  image={`/static/images/icons/${theme_mode}/mask-not.png`}
                  text1={"Masks not"}
                  text2={"required"}
                  onSelect={this.handleSelectMask}
                />
              </Grid>
              <Grid item>
                <MaskOption
                  id={MASK_STAFF}
                  selected={mask === MASK_STAFF}
                  image={`/static/images/icons/${theme_mode}/mask-half.png`}
                  text1={"Staff"}
                  text2={"masked"}
                  onSelect={this.handleSelectMask}
                />
              </Grid>
              <Grid item>
                <MaskOption
                  id={MASK_REQUIRED}
                  selected={mask === MASK_REQUIRED}
                  image={`/static/images/icons/${theme_mode}/mask.png`}
                  text1={"Masks"}
                  text2={"Required"}
                  onSelect={this.handleSelectMask}
                />
              </Grid>
            </Grid>
          </div>
        </div>

        <div className={classes.bottomspace} />

        {apply_enabled &&
          <Button
            className={classes.applybtn}
            style={{left: applyButtonPos}}
            onClick={this.handleApply}
          >
            Save
          </Button>
        }
        {!apply_enabled &&
          <Button
            className={classes.applybtn_disabled}
            style={{left: applyButtonPos}}
          >
            Save
          </Button>
        }

        <DlgConfirm
          open={showConfirmDlg}
          title={"Create a Location"}
          content={"Do you really want to add this location?"}
          onOK={this.handleSubmitLocation}
          onCancel={this.handleCancel}
        />
        <WaitingDialog open={requesting} />
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.sessionState.loggedIn,
  authUser: state.sessionState.authUser,
  theme_mode: state.uiState.theme_mode,
  requesting: state.uiState.requesting,
  geo_lat: state.mapState.geo_lat,
  geo_lng: state.mapState.geo_lng
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withRouter,
  withFirebase,
  withAuthentication,
  withAuthorization(condition),
  geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  }),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CleanAirLocationAdd);
