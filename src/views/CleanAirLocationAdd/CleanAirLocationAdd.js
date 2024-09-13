import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../actions";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
  Tabs,
  Tab,
  IconButton,
  Button,
  Typography,
  Grid,
  TextField,
  Menu,
} from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { ToastContainer } from "react-toastify";
import { geolocated } from "react-geolocated";
import Slider from "react-slick";
import {
  BasicAppBar,
  WaitingSpinner,
  DlgConfirm,
  AirlevelInput,
  AirlevelAdjust,
  MaskOption,
  PopMenuRoom,
  PopMenuActivity,
  DlgRoom,
  DlgAboutCalculator,
  MapTagsSingleSelect,
} from "../../components";
import * as ROUTES from "../../constants/routes";
import {
  MIN_CARD_WIDTH,
  MAX_ARTICLE_WIDTH,
  THEME_MODE_DARK,
} from "../../constants/types";
import {
  CONF_LOCATION_TYPES,
  LOCATION_TYPE_SHOP,
  CONF_ADJUST_ACTIVITIES,
  MASK_NOT_REQUIRED,
  MASK_REQUIRED,
  MASK_STAFF,
  CO2_MIN,
  CO2_MAX,
  ACH_MIN,
  ACH_MAX,
} from "../../constants/maplocation";
import { ToastError, ToastSuccess } from "../../utility/toast";
import {
  address_from_geolocation,
  position_from_mapresult,
} from "../../utility/mapbox";
import {
  slugify,
  gen_random_int,
  get_local_datetime_string,
} from "../../utility/utils";
import { logger } from "../../utility/logging";
import MaskFriendlyHours from "../../components/SharedControls/MaskFriendlyHours";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh)`,
    width: MAX_ARTICLE_WIDTH,
    maxWidth: "100%",
    margin: "0 auto",
    backgroundColor: theme.palette.background.default,
    paddingBottom: "1rem",
  },
  appbar: {
    width: theme.breakpoints.lg,
    maxWidth: "100%",
    height: "56px",
    [theme.breakpoints.up("sm")]: {
      height: "64px",
    },
  },
  infocontainer: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  name: {
    display: "block",
    color: theme.palette.text.primary,
    border: "3px solid #1A71E5",
    backgroundColor: " rgba(26, 113, 229, 0.2)",
    padding: 10,
    marginBottom: theme.spacing(1),
    fontSize: 18,
    fontFamily: "Roboto",
    height: 45,
    borderRadius: 8,
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
    "@media (max-width: 650px)": {
      width: "auto",
    },
  },
  photoinput: {
    display: "none",
  },
  imagecontainer: {
    float: "left",
    height: 100,
    width: 32,
    marginRight: theme.spacing(1),
    border: "3px solid #1A71E5",
    backgroundColor: " rgba(26, 113, 229, 0.2)",
    borderRadius: 9,
  },
  photobtn: {
    width: 24,
    height: 24,
  },
  description: {
    height: 100,
    color: theme.palette.text.primary,
    border: "3px solid #1A71E5",
    backgroundColor: " rgba(26, 113, 229, 0.2)",
    fontSize: 18,
    padding: 10,
    fontFamily: "Roboto",
    overflowWrap: "anywhere",
    borderRadius: 9,
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
    marginRight: 4,
    border: "3px solid #1A71E5",
    backgroundColor: " rgba(26, 113, 229, 0.2)",
    borderRadius: 8,
    height: 45,
    "&:hover, &.Mui-focusVisible, &:active": {
      backgroundColor: theme.palette.background.card,
    },
  },
  positionimg: {
    width: 24,
    height: 24,
  },
  room: {
    width: 100,
    color: theme.palette.text.secondary,
    border: "3px solid #1A71E5",
    backgroundColor: " rgba(26, 113, 229, 0.2)",
    padding: 4,
    marginRight: 4,
    height: 45,
    borderRadius: 8,
    fontFamily: "Roboto",
    "&:focus": {
      outline: "0px",
    },
    lineHeight: 1.0,
    marginBottom: 4,
    textTransform: "none",
  },
  roomtxt_active: {
    color: theme.palette.text.primary,
  },
  roomtxt: {
    color: theme.palette.text.secondary,
    fontSize: 18,
  },
  address: {
    display: "inline",
    color: theme.palette.text.primary,
    border: "3px solid #1A71E5",
    backgroundColor: " rgba(26, 113, 229, 0.2)",
    padding: 4,
    height: 45,
    fontSize: 18,
    fontFamily: "Roboto",
    borderRadius: 8,
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
    float: "left",
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
  socialcontainer: {
    marginBottom: theme.spacing(1),
  },
  socialiconcontainer: {
    float: "left",
    height: 24,
    width: 32,
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.background.card,
  },
  socialbtn: {
    width: 24,
    height: 24,
  },
  dateofreading: {
    border: "3px solid #1A71E5",
    backgroundColor: " rgba(26, 113, 229, 0.2)",
    height: 45,
    borderRadius: 8,
    padding: 4,
    "& input": {
      padding: 0,
    },
  },
  typecontainer: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    border: "3px solid #8000FF",
    borderRadius: 15,
    width: "95%",
    margin: "auto",
  },
  typename: {
    fontSize: "16px",
    lineHeight: "20px",
    margin: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  typetabs: {
    margin: 0,
    minHeight: 36,
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
    paddingBottom: 2,
    backgroundColor: "transparent",
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
    color: theme.palette.primary.text,
  },
  tagscontainer: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  selectcontainer: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textAlign: "center",
  },
  title: {
    fontSize: "16px",
    lineHeight: "20px",
  },
  calculator: {
    padding: 0,
    marginLeft: theme.spacing(4),
  },
  calculatoricon: {
    margin: 0,
    padding: 0,
    width: 24,
    height: 24,
    color: theme.palette.text.primary,
  },
  airlevelcontainer: {
    marginTop: theme.spacing(2),
  },
  maskcontainer: {
    marginTop: theme.spacing(2),
  },
  adjustbtn: {
    padding: 0,
  },
  adjusticon: {
    color: theme.palette.text.primary,
  },
  bottomspace: {
    paddingBottom: theme.spacing(8),
  },
  applybtn: {
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
    display: "block",
    margin: "auto",
    "&:hover": {
      backgroundColor: "#1878F3",
      color: "#FFFFFF",
    },
  },
  applybtn_disabled: {
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
    display: "block",
    margin: "auto",
    "&:hover": {
      backgroundColor: "#3AB54A",
      color: "#FFFFFF",
    },
    opacity: 0.38,
  },
  co2ReadingButton: {
    width: "60%",
    marginBottom: 8,
    height: 45,
    borderRadius: 10,
    background: "#8053e5",
    color: "#fff",
    textTransform: "inherit",
    "@media (max-width: 767px)": {
      width: "100%",
    },
  },
  maskRuleButton: {
    width: "60%",
    marginBottom: 8,
    height: 45,
    borderRadius: 10,
    background: "#1a71e5",
    color: "#fff",
    textTransform: "inherit",
    "@media (max-width: 767px)": {
      width: "100%",
    },
  },
  maskFriendlyButton: {
    width: "60%",
    marginBottom: 8,
    height: 45,
    borderRadius: 10,
    background: "#7289da",
    color: "#fff",
    textTransform: "inherit",
    "@media (max-width: 767px)": {
      width: "100%",
    },
  },
  addCommentButton: {
    width: "60%",
    marginBottom: 8,
    height: 45,
    borderRadius: 10,
    background: "#ee675c",
    color: "#fff",
    textTransform: "inherit",
    "@media (max-width: 767px)": {
      width: "100%",
    },
  },
  maskcontairChild: {
    width: "60%",
    margin: "auto",
    padding: 8,
    marginBottom: 8,
    border: "3px solid #1A71E5",
    borderRadius: 12,
    background: "rgba(176, 224, 230, 0.2)",
    "@media (max-width: 767px)": {
      width: "100%",
    },
  },
  maskingRuleText: {
    width: "100%",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 18,
    color: "#1A71E5",
    marginBottom: 8,
    cursor: "pointer",
  },
  co2ReadingChild: {
    width: "60%",
    margin: "auto",
    padding: 8,
    borderRadius: 12,
    marginBottom: 8,
    background: "rgba(221, 160, 221, 0.2)",
    border: "3px solid #DDA0DD",
    boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
    "@media (max-width: 767px)": {
      width: "100%",
    },
  },
  co2ReadingText: {
    width: "100%",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 18,
    color: "#8053E5",
    marginBottom: 8,
    cursor: "pointer",
  },
  morefieldsButton: {
    marginLeft: "auto",
    cursor: "pointer",
    display: "flex",
  },
  MuiInputFormControl: {
    marginTop: 7,
  },
  openCommentDiv: {
    width: "60%",
    margin: "auto",
    "@media (max-width: 767px)": {
      width: "100%",
    },
  },
  text_field_input: {
    width: "100%",
    background: "rgba(238, 103, 92, 0.1)",
    border: "2px solid #EE675C",
    boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
    borderRadius: 11,
    padding: 8,
    color: theme.palette.text.primary,
  },
});

class CleanAirLocationAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      image: "",
      imageUpload: "",
      imageGPSVerified: false,
      description: "",
      rooms: [],
      room: null,
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
      co2_in: -1,
      activity: CONF_ADJUST_ACTIVITIES[0],
      people_no: 1,
      room_volume: -1,
      hepa_cadr: -1,
      uvgi_cap: 0,
      selected_level: "co2",
      readingat: get_local_datetime_string(),
      loctype: LOCATION_TYPE_SHOP,
      mask: MASK_NOT_REQUIRED,
      maptags: [],
      selectedTag: null,
      adjusted: false,
      anchorRoomMenu: null,
      showConfirmDlg: false,
      showNewRoomDlg: false,
      room2delete: null,
      showDeleteRoomDlg: false,
      anchorActivityMenu: null,
      showAboutCalculator: false,
      maskRule: false,
      co2Reading: false,
      morefields: false,
      openComment: false,
      openMaskFriend: false,
      isScroll: false,
      selectedTime: {},
      comment: "",
    };

    this.slideRef = React.createRef();

    this.handleNavBack = this.handleNavBack.bind(this);

    this.handleCancel = this.handleCancel.bind(this);
    this.handleApply = this.handleApply.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.showRoomMenu = this.showRoomMenu.bind(this);

    this.handleSelectRoom = this.handleSelectRoom.bind(this);
    this.handleDeleteRoom = this.handleDeleteRoom.bind(this);
    this.showNewRoomDlg = this.showNewRoomDlg.bind(this);
    this.handleCreateNewRoom = this.handleCreateNewRoom.bind(this);
    this.showDeleteRoomDlg = this.showDeleteRoomDlg.bind(this);
    this.handleConfirmDeleteRoom = this.handleConfirmDeleteRoom.bind(this);

    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleClickPosition = this.handleClickPosition.bind(this);
    this.handleSelectTag = this.handleSelectTag.bind(this);

    this.handleSelectLevel = this.handleSelectLevel.bind(this);
    this.handleChangeCO2 = this.handleChangeCO2.bind(this);
    this.handleChangeAch = this.handleChangeAch.bind(this);

    this.showAboutCalculator = this.showAboutCalculator.bind(this);
    this.handleClickAdjust = this.handleClickAdjust.bind(this);
    this.handleChangeAdjust = this.handleChangeAdjust.bind(this);
    this.showActivityMenu = this.showActivityMenu.bind(this);
    this.handleSelectActivity = this.handleSelectActivity.bind(this);

    this.handleSelectMask = this.handleSelectMask.bind(this);

    this.handleSubmitLocation = this.handleSubmitLocation.bind(this);
    this.handleMaskRules = this.handleMaskRules.bind(this);
    this.handleco2Reading = this.handleco2Reading.bind(this);
    this.handleMorefields = this.handleMorefields.bind(this);
    this.handleOpenComment = this.handleOpenComment.bind(this);
    this.handleMaskFriendlyHours = this.handleMaskFriendlyHours.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.onObjectChange = this.onObjectChange.bind(this);
    this.onChangeComments = this.onChangeComments.bind(this);
  }

  setError = (message) => {
    ToastError(message);
    this.props.requestDataFinished();
  };

  showSuccess = (message) => {
    ToastSuccess(message);
  };

  setWaiting = (waiting) => {
    if (waiting) {
      this.props.requestDataPending();
    } else {
      this.props.requestDataFinished();
    }
  };

  componentDidMount = async () => {
    const { geo_lat, geo_lng } = this.props;
    const { loctype } = this.state;

    if (!geo_lat || !geo_lng) {
      return;
    }

    await this._getAddress(geo_lng, geo_lat);
    await this._getMaptags(loctype);
  };

  _getAddress = async (lng, lat) => {
    const result = await address_from_geolocation(lng, lat);
    if (result.error) {
      this.setError(result.message);
      this.props.history.goBack();
      return;
    }

    const location = position_from_mapresult(result.address[0]);

    this.setState({
      ...this.state,
      name: location.name,
      room: null,
      address: location.address,
      latitude: location.latitude,
      longitude: location.longitude,
      postcode: location.postcode,
      locality: location.locality,
      place: location.place,
      district: location.district,
      region: location.region,
      country: location.country,
    });
  };

  _getMaptags = async (loctype) => {};

  handleLogin = () => {
    const location = {
      pathname: ROUTES.SIGN_IN,
      state: { animation: "bottom" },
    };
    this.props.history.push(location);
  };

  handleNavBack = () => {
    this.props.history.goBack();
  };

  handleCancel = () => {
    this.setState({
      ...this.state,
      showConfirmDlg: false,
    });
  };

  handleApply = () => {
    this.setState({
      ...this.state,
      showConfirmDlg: true,
    });
  };

  handleChange = (event) => {
    event.persist();
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  handleImageChange = async ({ target }) => {
    if (target.files.length === 0) {
      return;
    }
    const fileReader = new FileReader();

    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = async (e) => {
      this.setState({
        ...this.state,
        image: e.target.result,
        imageUpload: target.files[0],
      });
    };
  };

  handleChangeDate = (event) => {
    event.persist();
    logger.log("date :", event.target.value);
    this.setState({
      ...this.state,
      readingat: event.target.value,
    });
  };

  showRoomMenu = (anchor) => {
    this.setState({
      ...this.state,
      anchorRoomMenu: anchor,
    });
  };

  handleSelectRoom = (room) => {
    logger.log("select room :", room.name);
    this.setState({
      ...this.state,
      room: room,
      anchorRoomMenu: null,
    });
  };

  handleDeleteRoom = (room) => {
    logger.log("delete room :", room.name);
    this.showDeleteRoomDlg(true, room);
  };

  handleConfirmDeleteRoom = () => {
    const { rooms, room, room2delete } = this.state;
    const new_rooms = rooms.filter((room) => room.name !== room2delete.name);
    this.setState({
      ...this.state,
      rooms: new_rooms,
      room: room2delete.name === room.name ? null : room,
      showDeleteRoomDlg: false,
      room2delete: null,
    });
  };

  showNewRoomDlg = (show) => {
    logger.log("new room");
    this.setState({
      ...this.state,
      showNewRoomDlg: show,
      anchorRoomMenu: null,
    });
  };

  handleCreateNewRoom = (title) => {
    let new_rooms = this.state.rooms.slice();
    const new_room = {
      name: title,
    };

    new_rooms.push(new_room);

    this.setState({
      ...this.state,
      showNewRoomDlg: false,
      rooms: new_rooms,
      room: new_room,
    });
  };

  showDeleteRoomDlg = (show, room2delete = null) => {
    this.setState({
      ...this.state,
      showDeleteRoomDlg: show,
      anchorRoomMenu: null,
      room2delete: room2delete,
    });
  };

  handleChangeType = async (event, newValue) => {
    if (newValue === null) return;
    const { loctype } = this.state;
    if (loctype === newValue) return;

    await this._getMaptags(newValue);

    this.setState({
      ...this.state,
      loctype: newValue,
    });
  };

  handleClickPosition = async () => {
    if (!this.props.isGeolocationAvailable) {
      this.setError("Browser does not support Geolocation");
    } else if (!this.props.isGeolocationEnabled) {
      this.setError("Geolocation is not enabled");
    } else if (this.props.coords) {
      this._getAddress(this.props.coords.longitude, this.props.coords.latitude);
    }
  };

  handleSelectTag = (tag) => {
    const { selectedTag } = this.state;
    if (selectedTag.tag_name === tag.tag_name) {
      return;
    }

    logger.log("selected tag :", tag);

    this.setState({
      ...this.state,
      selectedTag: tag,
    });
  };

  handleSelectLevel = (name) => {
    this.setState({
      ...this.state,
      selected_level: name,
    });
  };

  handleChangeCO2 = (level) => {
    logger.log("CO2 level :", level);
    const value = parseInt(level);
    this.setState({
      ...this.state,
      co2: isNaN(value) ? -1 : value,
    });
  };

  handleChangeAch = (level) => {
    logger.log("ACH level :", level);
    const value = parseInt(level);
    this.setState({
      ...this.state,
      ach: isNaN(value) ? -1 : value,
    });
  };

  showAboutCalculator = (show) => {
    this.setState({
      ...this.state,
      showAboutCalculator: show,
    });
  };

  handleClickAdjust = (adjust) => {
    if (adjust) {
      this.slideRef.current.slickNext();
    } else {
      this.slideRef.current.slickPrev();
    }

    this.setState({
      ...this.state,
      adjusted: adjust,
    });
  };

  handleChangeAdjust = (event) => {
    event.persist();

    let value = parseInt(event.target.value);
    if (isNaN(value)) {
      value = -1;
    }
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };

  showActivityMenu = (anchor) => {
    this.setState({
      ...this.state,
      anchorActivityMenu: anchor,
    });
  };

  handleSelectActivity = (activity) => {
    if (activity.value === this.state.activity.value) {
      return;
    }
    this.setState({
      ...this.state,
      activity: activity,
    });
  };

  handleSelectMask = (mask_id) => {
    this.setState({
      ...this.state,
      mask: mask_id,
    });
  };

  handleSubmitLocation = async () => {
    const {
      name,
      description,
    } = this.state;
    console.log("location detailsssss", name, description);
    ToastSuccess("Location Added Successfully");
  };

  handleMaskRules = () => {
    const { maskRule } = this.state;
    this.setState({
      ...this.state,
      maskRule: !maskRule,
      co2Reading: false,
      openComment: false,
      openMaskFriend: false,
    });
  };

  onObjectChange = (value) => {
    this.setState({
      ...this.state,
      selectedTime: value,
    });
  };

  handleMaskFriendlyHours = () => {
    const { openMaskFriend } = this.state;
    this.setState({
      ...this.state,
      openMaskFriend: !openMaskFriend,
      maskRule: false,
      co2Reading: false,
      openComment: false,
    });
  };

  handleMouseEnter = () => {
    this.setState({
      ...this.state,
      isScroll: true,
    });
    document.body.classList.add("hide-class");
  };

  handleMouseLeave = () => {
    this.setState({
      ...this.state,
      isScroll: false,
    });
    document.body.classList.remove("hide-class");
  };

  handleco2Reading = () => {
    const { co2Reading } = this.state;
    this.setState({
      ...this.state,
      co2Reading: !co2Reading,
      maskRule: false,
      openComment: false,
      openMaskFriend: false,
    });
  };
  handleMorefields = () => {
    const { morefields } = this.state;
    this.setState({
      ...this.state,
      morefields: !morefields,
    });
  };
  handleOpenComment = () => {
    const { openComment } = this.state;
    this.setState({
      ...this.state,
      openComment: !openComment,
      maskRule: false,
      co2Reading: false,
      openMaskFriend: false,
    });
  };

  onChangeComments = (event) => {
    this.setState({ comment: event.target.value });
  };

  render() {
    const { classes, theme_mode, requesting } = this.props;
    const {
      name,
      imageUpload,
      description,
      rooms,
      room,
      address,
      socialurl,
      loctype,
      maptags,
      selectedTag,
      co2,
      ach,
      co2_in,
      activity,
      people_no,
      room_volume,
      hepa_cadr,
      uvgi_cap,
      selected_level,
      mask,
      readingat,
      anchorRoomMenu,
      showConfirmDlg,
      showNewRoomDlg,
      showDeleteRoomDlg,
      anchorActivityMenu,
      showAboutCalculator,
      maskRule,
      co2Reading,
      morefields,
      openComment,
      openMaskFriend,
    } = this.state;

    const locationType = Object.keys(CONF_LOCATION_TYPES).find((key) => {
      return CONF_LOCATION_TYPES[key].value === loctype;
    });

    let locationTypeName = null;
    if (locationType) {
      locationTypeName = (
        <Typography className={classes.typename}>
          {CONF_LOCATION_TYPES[locationType].name}
        </Typography>
      );
    }

    let width =
      document.documentElement.clientWidth ||
      document.body.clientWidth ||
      window.innerWidth;
    // const applyButtonPos = (width - 260) / 2;

    const text_width =
      width > MAX_ARTICLE_WIDTH ? MAX_ARTICLE_WIDTH - 32 : width - 32;
    const desc_width =
      width > MAX_ARTICLE_WIDTH ? MAX_ARTICLE_WIDTH - 72 : width - 72;
    const address_width =
      width > MAX_ARTICLE_WIDTH ? MAX_ARTICLE_WIDTH - 180 : width - 180;
    const innerWidth = width > MAX_ARTICLE_WIDTH ? MAX_ARTICLE_WIDTH : width;

    let apply_enabled = false;
    if (name && address) {
      apply_enabled = true;
    }

    const photo_id = `image-file-${gen_random_int(1000)}`;

    // room menu position
    let roomMenuPos = { top: -1000, left: -1000 };
    if (anchorRoomMenu) {
      let rect = anchorRoomMenu.getBoundingClientRect();
      roomMenuPos = { top: rect.top, left: rect.left };
    }

    // activity menu position
    let activityMenuPos = { top: -1000, left: -1000 };
    if (anchorActivityMenu) {
      let rect = anchorActivityMenu.getBoundingClientRect();
      activityMenuPos = { top: rect.top, left: rect.left };
    }

    // slider for adjust
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      draggable: false,
      swipe: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };

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
            style={{ width: text_width }}
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
                  style={{ padding: 1, marginTop: 36 }}
                >
                  <img
                    className={classes.photobtn}
                    style={{ opacity: imageUpload ? 1.0 : 0.38 }}
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
              style={{ width: desc_width }}
              onChange={this.handleChange}
            />
          </div>
          {morefields && (
            <div>
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
                <Button
                  className={classes.room}
                  onClick={(e) => this.showRoomMenu(e.currentTarget)}
                >
                  <Typography
                    className={room ? classes.roomtxt_active : classes.roomtxt}
                  >
                    {room ? room.name : "Room"}
                  </Typography>
                </Button>
                <input
                  name="address"
                  placeholder="Address"
                  value={address || ""}
                  className={classes.address}
                  style={{ width: address_width }}
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
                  style={{ width: desc_width }}
                  name="readingat"
                  onChange={this.handleChangeDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>

              <div className={classes.socialcontainer}>
                <div className={classes.socialiconcontainer}>
                  <IconButton
                    aria-label="social"
                    className={classes.icon_button}
                  >
                    <img
                      className={classes.socialbtn}
                      alt="social"
                      src={`/static/images/icons/${theme_mode}/wifi-signal.png`}
                    />
                  </IconButton>
                </div>
                <input
                  name="socialurl"
                  placeholder="Twitter/Instagram URL"
                  value={socialurl || ""}
                  className={classes.name}
                  style={{ width: desc_width, height: 45 }}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          )}
        </div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-haspopup="true"
          className={classes.morefieldsButton}
          onClick={this.handleMorefields}
        >
          <MoreHorizIcon />
        </IconButton>
        <div
          className={classes.typecontainer}
          style={{
            background: `${theme_mode} === 'light' ? '#F4F4F4': '#190033'`,
          }}
        >
          <Typography className={classes.typename}>
            Choose a Category
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
                    style={{
                      backgroundColor:
                        theme_mode === THEME_MODE_DARK
                          ? item.color.dark.stroke
                          : item.color.light.stroke,
                    }}
                  />
                }
              />
            ))}
          </Tabs>
          {locationTypeName}
        </div>

        {maptags.length > 0 && (
          <div className={classes.tagscontainer}>
            <MapTagsSingleSelect
              width={innerWidth - 16}
              tags={maptags}
              selecteditem={selectedTag}
              onSelect={this.handleSelectTag}
            />
          </div>
        )}

        <div className={classes.selectcontainer}>
          {!co2Reading && (
            <Button
              variant="contained"
              className={classes.co2ReadingButton}
              onClick={this.handleco2Reading}
            >
              Add a CO2 Reading
            </Button>
          )}
          {co2Reading && (
            <div className={classes.co2ReadingChild}>
              <p
                className={classes.co2ReadingText}
                onClick={this.handleco2Reading}
              >
                Add a CO2 Reading
              </p>

              <Slider {...settings} ref={this.slideRef}>
                <div>
                  <Typography className={classes.title}>
                    {"How is the location protecting visitors?"}
                  </Typography>
                  <div className={classes.airlevelcontainer}>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Grid item>
                        <AirlevelInput
                          name="co2"
                          min={CO2_MIN}
                          max={CO2_MAX}
                          selected={selected_level === "co2"}
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
                          selected={selected_level === "ach"}
                          image={`/static/images/icons/${theme_mode}/hepa-filter.png`}
                          text1={"HEPA"}
                          text2={"filters"}
                          placeholder={"ACH"}
                          level={ach}
                          onSelect={this.handleSelectLevel}
                          onChange={this.handleChangeAch}
                        />
                      </Grid>
                      <Grid item>
                        <IconButton
                          aria-label="adjust"
                          className={classes.adjustbtn}
                          onClick={(e) => this.handleClickAdjust(true)}
                        >
                          <ArrowForwardIosIcon className={classes.adjusticon} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    spaing={2}
                  >
                    <Grid item>
                      <Typography className={classes.title}>
                        {"Advanced Calculator (for expert use)"}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        className={classes.calculator}
                        aria-label={`Advanced Calculator`}
                        color="inherit"
                        onClick={(e) => this.showAboutCalculator(true)}
                      >
                        <HelpOutlineIcon className={classes.calculatoricon} />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <div className={classes.airlevelcontainer}>
                    <Grid
                      container
                      spacing={1}
                      direction="row"
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Grid item>
                        <IconButton
                          aria-label="adjust"
                          className={classes.adjustbtn}
                          onClick={(e) => this.handleClickAdjust(false)}
                        >
                          <ArrowBackIosIcon className={classes.adjusticon} />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <AirlevelAdjust
                          co2_in={co2_in}
                          activity={activity}
                          people_no={people_no < 0 ? 1 : people_no}
                          room_volume={room_volume}
                          hepa_cadr={hepa_cadr}
                          uvgi_cap={uvgi_cap < 0 ? 0 : uvgi_cap}
                          onChange={this.handleChangeAdjust}
                          onAcitivityMenu={this.showActivityMenu}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Slider>
            </div>
          )}
          {!maskRule && (
            <Button
              variant="contained"
              className={classes.maskRuleButton}
              onClick={this.handleMaskRules}
            >
              Add Masking Rules
            </Button>
          )}
          {maskRule && (
            <div className={classes.maskcontainer}>
              <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                className={classes.maskcontairChild}
              >
                <p
                  className={classes.maskingRuleText}
                  onClick={this.handleMaskRules}
                >
                  Add Masking Rules
                </p>
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
          )}

          {!openMaskFriend && (
            <Button
              variant="contained"
              className={classes.maskFriendlyButton}
              onClick={this.handleMaskFriendlyHours}
            >
              Add Mask Friendly Hours
            </Button>
          )}
          {openMaskFriend && (
            <div>
              <MaskFriendlyHours
                handleMaskFriendlyHours={this.handleMaskFriendlyHours}
                onObjectChange={this.onObjectChange}
                selectedDates={
                  this.state.selectedTime.length > 0
                    ? this.state.selectedTime
                    : null
                }
              />
            </div>
          )}

          {!openComment && (
            <Button
              variant="contained"
              className={classes.addCommentButton}
              onClick={this.handleOpenComment}
            >
              Add a Comment
            </Button>
          )}
          {openComment && (
            <div className={classes.openCommentDiv}>
              <textarea
                name="comment"
                placeholder="Write your post here"
                className={classes.text_field_input}
                rows={8}
                value={this.state.comment}
                onChange={this.onChangeComments}
              />
            </div>
          )}
        </div>

        <div className={classes.bottomspace} />

        {apply_enabled && (
          <Button className={classes.applybtn} onClick={this.handleApply}>
            Save
          </Button>
        )}
        {!apply_enabled && (
          <Button className={classes.applybtn_disabled}>Save</Button>
        )}

        <Menu
          id="room-menu"
          anchorReference="anchorPosition"
          anchorPosition={{ top: roomMenuPos.top, left: roomMenuPos.left }}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          open={anchorRoomMenu !== null}
          onClose={(e) => this.showRoomMenu(null)}
        >
          <PopMenuRoom
            rooms={rooms}
            onRoom={this.handleSelectRoom}
            onDeleteRoom={this.handleDeleteRoom}
            onNewRoom={(e) => this.showNewRoomDlg(true)}
          />
        </Menu>
        <Menu
          id="activity-menu"
          anchorReference="anchorPosition"
          anchorPosition={{
            top: activityMenuPos.top,
            left: activityMenuPos.left,
          }}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          open={anchorActivityMenu !== null}
          onClose={(e) => this.showActivityMenu(null)}
        >
          <PopMenuActivity onActivity={this.handleSelectActivity} />
        </Menu>

        <DlgRoom
          open={showNewRoomDlg}
          theme={theme_mode}
          onClose={(e) => this.showNewRoomDlg(false)}
          onSubmit={this.handleCreateNewRoom}
        />
        <DlgConfirm
          open={showDeleteRoomDlg}
          title={"Delete Room?"}
          content={"Do you really want to delete the room?"}
          onOK={this.handleConfirmDeleteRoom}
          onCancel={(e) => this.showDeleteRoomDlg(false)}
        />
        <DlgConfirm
          open={showConfirmDlg}
          title={"Create a Location"}
          content={"Do you really want to add this location?"}
          onOK={this.handleSubmitLocation}
          onCancel={this.handleCancel}
        />
        <DlgAboutCalculator
          open={showAboutCalculator}
          onClose={(e) => this.showAboutCalculator(false)}
        />
        <WaitingSpinner open={requesting} />
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
  geo_lng: state.mapState.geo_lng,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withRouter,
  geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  }),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CleanAirLocationAdd);
