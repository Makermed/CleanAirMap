import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  InputBase,
  TextField,
  Grid,
  Button,
  Menu,
} from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Slider from "react-slick";
import DlgRoom from "../DlgRoom";
import DlgAboutCalculator from "../DlgAboutCalculator";
import { DlgConfirm } from "../../Dialogs";
import PopMenuActivity from "../PopMenuActivity";
import PopMenuRoom from "../PopMenuRoom";
import AirlevelAdjust from "../AirlevelAdjust";
import AirlevelInput from "../AirlevelInput";
import {
  THEME_MODE_DARK,
  MIN_CARD_WIDTH,
  MAX_CARD_WIDTH,
} from "../../../constants/types";
import {
  MASK_NOT_REQUIRED,
  MASK_STAFF,
  MASK_REQUIRED,
  CO2_MIN,
  CO2_MAX,
  ACH_MIN,
  ACH_MAX,
  CONF_ADJUST_ACTIVITIES,
} from "../../../constants/maplocation";
import { ToastError } from "../../../utility/toast";
import {
  get_local_datetime_string,
  gen_random_int,
} from "../../../utility/utils";
import { get_adjusted_co2_level } from "../../../utility/cleanair";
import { logger } from "../../../utility/logging";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import MaskFriendlyHours from "../../SharedControls/MaskFriendlyHours";
import MaskOption from "../MaskOption";
const styles = (theme) => ({
  caption: {
    fontSize: 16,
    fontWeight: 500,
  },
  actionbutton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    padding: 0,
    margin: 0,
  },
  actionbutton_disabled: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    padding: 0,
    margin: 0,
    opacity: 0.38,
  },
  actionimg: {
    padding: 0,
    width: 32,
    height: 32,
  },
  dialogPaper: {
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_CARD_WIDTH,
    margin: 16,
  },
  image: {
    width: 24,
    height: 24,
    padding: 1,
    marginTop: 36,
  },
  photoinput: {
    display: "none",
  },
  comment: {
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
    "& #comment": {
      height: "auto !important",
      overflow: "auto !important",
    },
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
  selectcontainer: {
    textAlign: "center",
  },
  selecttitle: {
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
    marginTop: theme.spacing(1),
  },
  adjustbtn: {
    padding: 0,
  },
  adjusticon: {
    color: theme.palette.text.primary,
  },
  maskcontainer: {
    marginTop: theme.spacing(1),
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
    },
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
  infocontainer: {
    margin: theme.spacing(0),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  desccontainer: {
    // height: 100,
    marginBottom: theme.spacing(1),
    display: "flex",
  },
  imagecontainer: {
    float: "left",
    // height: 100,
    width: 32,
    marginRight: theme.spacing(1),
    border: "3px solid #1A71E5",
    backgroundColor: " rgba(26, 113, 229, 0.2)",
    borderRadius: 9,
  },
  room: {
    width: "100%",
    color: theme.palette.text.secondary,
    border: "3px solid #1A71E5",
    backgroundColor: " rgba(26, 113, 229, 0.2)",
    padding: 4,
    marginRight: 4,
    height: 45,
    borderRadius: 9,
    fontFamily: "Roboto",
    "&:focus": {
      outline: "0px",
    },
    lineHeight: 1.0,
    marginBottom: 4,
    textTransform: "none",
    marginTop: 8,
  },
  roomtxt_active: {
    color: theme.palette.text.primary,
  },
  roomtxt: {
    color: theme.palette.text.secondary,
    fontSize: 18,
  },

  co2ReadingButton: {
    width: "100%",
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
    width: "100%",
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
    width: "100%",
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
    width: "100%",
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
    width: "100%",
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
    width: "100%",
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
  inputbox: {
    width: "100%",
  },
  upload_picture: {
    padding: 1,
  },
  morefieldsButton: {
    marginLeft: "auto",
    cursor: "pointer",
    display: "flex",
  },
});

class DlgReading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      room_id: null,
      comment: "",
      readingat: get_local_datetime_string(),
      selected_level: "",
      co2: null,
      ach: null,
      image: "",
      imageUpload: "",
      imageGPSVerified: false,
      adjusted: false,
      co2_in: null,
      activity: CONF_ADJUST_ACTIVITIES[0],
      people_no: -1,
      room_volume: -1,
      hepa_cadr: -1,
      uvgi_cap: -1,
      mask: MASK_NOT_REQUIRED,
      anchorActivityMenu: null,
      showAboutCalculator: false,
      co2Reading: false,
      maskRule: false,
      anchorRoomMenu: null,
      rooms: [],
      room: null,
      showDeleteRoomDlg: false,
      room2delete: null,
      showNewRoomDlg: false,
      morefields: false,
      openMaskFriend: false,
      isScroll: false,
      selectedTime: {},
    };

    this.slideRef = React.createRef();

    this.handleChangeRoom = this.handleChangeRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);

    this.handleSelectLevel = this.handleSelectLevel.bind(this);
    this.handleChangeCO2 = this.handleChangeCO2.bind(this);
    this.handleChangeAch = this.handleChangeAch.bind(this);

    this.showAboutCalculator = this.showAboutCalculator.bind(this);
    this.handleClickAdjust = this.handleClickAdjust.bind(this);
    this.handleChangeAdjust = this.handleChangeAdjust.bind(this);
    this.showActivityMenu = this.showActivityMenu.bind(this);
    this.handleSelectActivity = this.handleSelectActivity.bind(this);

    this.handleSelectMask = this.handleSelectMask.bind(this);

    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleco2Reading = this.handleco2Reading.bind(this);
    this.handleMaskRules = this.handleMaskRules.bind(this);

    this.showRoomMenu = this.showRoomMenu.bind(this);
    this.handleSelectRoom = this.handleSelectRoom.bind(this);
    this.handleDeleteRoom = this.handleDeleteRoom.bind(this);
    this.showDeleteRoomDlg = this.showDeleteRoomDlg.bind(this);
    this.handleConfirmDeleteRoom = this.handleConfirmDeleteRoom.bind(this);
    this.showNewRoomDlg = this.showNewRoomDlg.bind(this);
    this.handleCreateNewRoom = this.handleCreateNewRoom.bind(this);
    this.handleMorefields = this.handleMorefields.bind(this);
    this.handleMaskFriendlyHours = this.handleMaskFriendlyHours.bind(this);
  }

  componentDidMount = () => {
    const { reading } = this.props;
    if (reading) {
      this.setState({
        ...this.state,
        id: reading.id,
        room_id: reading.room_id,
        co2: reading.co2 ? reading.co2 : null,
        ach: reading.ach ? reading.ach : null,
        image: reading.image,
        imageGPSVerified: reading.gps_verified,
        comment: reading.comment,
        readingat: get_local_datetime_string(
          reading.reading_at.substring(0, 16)
        ),
        adjusted: reading.adjusted ? reading.adjusted : false,
        co2_in: reading.co2_in ? reading.co2_in : null,
        activity: reading.activity
          ? CONF_ADJUST_ACTIVITIES[reading.activity]
          : 0,
        people_no: reading.people_no ? reading.people_no : -1,
        room_volume: reading.room_volume ? reading.room_volume : -1,
        hepa_cadr: reading.hepa_cadr ? reading.hepa_cadr : -1,
        uvgi_cap: reading.uvgi_cap ? reading.uvgi_cap : -1,
        mask: reading.mask,
      });
    }
  };

  componentDidUpdate = (prevProps) => {
    const { reading } = this.props;
    if (!prevProps.reading && reading) {
      this.setState({
        ...this.state,
        id: reading.id,
        room_id: reading.room_id,
        co2: reading.co2 ? reading.co2 : null,
        ach: reading.ach ? reading.ach : null,
        image: reading.image,
        imageGPSVerified: reading.gps_verified,
        comment: reading.comment,
        readingat: get_local_datetime_string(
          reading.reading_at.substring(0, 16)
        ),
        adjusted: reading.adjusted ? reading.adjusted : false,
        co2_in: reading.co2_in ? reading.co2_in : null,
        activity: reading.activity
          ? CONF_ADJUST_ACTIVITIES[reading.activity]
          : CONF_ADJUST_ACTIVITIES[0],
        people_no: reading.people_no ? reading.people_no : -1,
        room_volume: reading.room_volume ? reading.room_volume : -1,
        hepa_cadr: reading.hepa_cadr ? reading.hepa_cadr : -1,
        uvgi_cap: reading.uvgi_cap ? reading.uvgi_cap : -1,
        mask: reading.mask,
      });
      return;
    }

    if (
      prevProps.reading &&
      reading &&
      (prevProps.reading.room_id !== reading.room_id ||
        (reading.co2 && prevProps.reading.co2 !== reading.co2) ||
        (reading.ach && prevProps.reading.ach !== reading.ach) ||
        (reading.comment && prevProps.reading.comment !== reading.comment) ||
        prevProps.reading.mask !== reading.mask ||
        prevProps.reading.reading_at !== reading.reading_at ||
        prevProps.reading.adjusted !== reading.adjusted ||
        (reading.co2_in && prevProps.reading.co2_in !== reading.co2_in) ||
        prevProps.reading.activity !== reading.activity ||
        (reading.people_no &&
          prevProps.reading.people_no !== reading.people_no) ||
        (reading.room_volume &&
          prevProps.reading.room_volume !== reading.room_volume) ||
        (reading.hepa_cadr &&
          prevProps.reading.hepa_cadr !== reading.hepa_cadr) ||
        (reading.uvgi_cap && prevProps.reading.uvgi_cap !== reading.uvgi_cap))
    ) {
      this.setState({
        ...this.state,
        id: reading.id,
        room_id: reading.room_id,
        co2: reading.co2 ? reading.co2 : null,
        ach: reading.ach ? reading.ach : null,
        image: reading.image,
        imageGPSVerified: reading.gps_verified,
        comment: reading.comment,
        readingat: get_local_datetime_string(
          reading.reading_at.substring(0, 16)
        ),
        adjusted: reading.adjusted ? reading.adjusted : false,
        co2_in: reading.co2_in ? reading.co2_in : null,
        activity: reading.activity
          ? CONF_ADJUST_ACTIVITIES[reading.activity]
          : CONF_ADJUST_ACTIVITIES[0],
        people_no: reading.people_no ? reading.people_no : -1,
        room_volume: reading.room_volume ? reading.room_volume : -1,
        hepa_cadr: reading.hepa_cadr ? reading.hepa_cadr : -1,
        uvgi_cap: reading.uvgi_cap ? reading.uvgi_cap : -1,
        mask: reading.mask,
      });
    }
  };

  handleChangeRoom = (event) => {
    event.persist();
    this.setState({
      ...this.state,
      room_id: event.target.value,
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
    if (target?.files?.length === 0) {
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
  };

  handleChangeDate = (event) => {
    event.persist();
    logger.log("date :", event.target.value);
    this.setState({
      ...this.state,
      readingat: event.target.value,
    });
  };

  handleSelectLevel = (name) => {
    this.setState({
      ...this.state,
      selected_level: name,
    });
  };
  handleMaskRules = () => {
    const { maskRule } = this.state;
    this.setState({
      ...this.state,
      maskRule: !maskRule,
      co2Reading: false,
      openMaskFriend: false,
    });
  };

  handleChangeCO2 = (level) => {
    const value = parseInt(level);
    this.setState({
      ...this.state,
      co2: isNaN(value) ? null : value,
    });
  };
  handleMorefields = () => {
    const { morefields } = this.state;
    this.setState({
      ...this.state,
      morefields: !morefields,
    });
  };

  handleMaskFriendlyHours = () => {
    const { openMaskFriend } = this.state;
    this.setState({
      ...this.state,
      openMaskFriend: !openMaskFriend,
      co2Reading: false,
      maskRule: false,
    });
  };

  handleMouseEnter = () => {
    this.setState({
      ...this.state,
      isScroll: true,
    });
    var dayPicker = document.getElementById("dayPickerScroller");
    dayPicker.style.overflow = "hidden";
  };

  handleMouseLeave = () => {
    this.setState({
      ...this.state,
      isScroll: false,
    });
    var dayPicker = document.getElementById("dayPickerScroller");
    dayPicker.style.overflow = "auto";
  };

  onObjectChange = (value) => {
    this.setState({
      ...this.state,
      selectedTime: value,
    });
  };

  handleChangeAch = (level) => {
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

  handleSelectMask = (mask) => {
    this.setState({
      ...this.state,
      mask: mask,
    });
  };

  setError = (message) => {
    ToastError(message);
  };

  handleco2Reading = () => {
    const { co2Reading } = this.state;
    this.setState({
      ...this.state,
      co2Reading: !co2Reading,
      maskRule: false,
      openMaskFriend: false,
    });
  };
  handleSave = () => {
    const {
      id,
      room_id,
      comment,
      readingat,
      selected_level,
      co2,
      ach,
      image,
      imageUpload,
      imageGPSVerified,
      adjusted,
      co2_in,
      activity,
      people_no,
      room_volume,
      hepa_cadr,
      uvgi_cap,
      mask,
      room,
      rooms,
      selectedTime,
    } = this.state;

    if (adjusted) {
      if (co2_in <= 0) {
        this.setError("Calculation parameters must be given");
        return;
      }
      const adjusted_people_no = people_no < 0 ? 1 : people_no;
      const adjusted_uvgi_cap = uvgi_cap < 0 ? 0 : uvgi_cap;
      const adjusted_hepa_cadr = hepa_cadr < 0 ? 0 : hepa_cadr;
      const adjusted_co2 = get_adjusted_co2_level(
        co2_in,
        activity.cfm,
        adjusted_people_no,
        adjusted_hepa_cadr,
        adjusted_uvgi_cap
      );
      if (adjusted_co2 < 420) {
        this.setError(
          "Invalid parameters for advanced calculator, adjusted CO2 must be greater than 420ppm."
        );
        return;
      }
    } else {
      if (selected_level === "co2") {
        if (co2 < 0) {
          this.setError("CO2 level must be given");
          return;
        }
        if (co2 < CO2_MIN || co2 > CO2_MAX) {
          this.setError(
            `CO2 level is invalid, it should be between ${CO2_MIN} and ${CO2_MAX}`
          );
          return;
        }
      }
      if (selected_level === "ach") {
        if (ach < 0) {
          this.setError("ACH level must be given");
          return;
        }
        if (ach < ACH_MIN || ach > ACH_MAX) {
          this.setError(
            `ACH is invalid, it should be between ${ACH_MIN} and ${ACH_MAX}`
          );
          return;
        }
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
      room_id: room_id,
      comment: comment,
      readingat: reading_dt.toISOString(),
      co2: co2,
      ach: ach,
      image: image,
      imageUpload: imageUpload,
      gps_verified: imageGPSVerified,
      adjusted: adjusted,
      co2_in: co2_in,
      activity: activity,
      people_no: people_no < 0 ? 1 : people_no,
      room_volume: room_volume,
      hepa_cadr: hepa_cadr,
      uvgi_cap: uvgi_cap < 0 ? 0 : uvgi_cap,
      mask: mask,
      room: room,
      rooms: rooms,
      selectedTime: selectedTime,
    };

    this.props.onSave(reading);
  };

  handleCancel = () => {
    this.props.onCancel();
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

  showDeleteRoomDlg = (show, room2delete = null) => {
    this.setState({
      ...this.state,
      showDeleteRoomDlg: show,
      anchorRoomMenu: null,
      room2delete: room2delete,
    });
  };
  handleConfirmDeleteRoom = () => {
    const { room, rooms, room2delete } = this.state;
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
  render() {
    const {
      classes,
      open,
      loggedIn,
      title,

      theme,
    } = this.props;
    const {
      comment,
      readingat,
      selected_level,
      co2,
      ach,
      adjusted,
      co2_in,
      activity,
      people_no,
      room_volume,
      hepa_cadr,
      uvgi_cap,
      mask,
      anchorActivityMenu,
      showAboutCalculator,
      co2Reading,
      maskRule,
      rooms,
      room,
      anchorRoomMenu,
      showNewRoomDlg,
      showDeleteRoomDlg,
      morefields,
      openMaskFriend,
      selectedTime,
    } = this.state;
    let apply_enabled = false;
    if (
      (adjusted && co2_in > 0 && room_volume > 0 && hepa_cadr > 0) ||
      (!adjusted &&
        ((selected_level === "co2" && co2 > 0) ||
          (selected_level === "ach" && ach > 0))) ||
      Object.keys(selectedTime).length > 0 ||
      comment.trim() !== "" ||
      mask >= 0
    ) {
      apply_enabled = true;
    }

    const photo_id = `image-file-${gen_random_int(1000)}`;
    const bgColor = theme === THEME_MODE_DARK ? "black" : "white";

    // activity menu position
    let activityMenuPos = { top: -1000, left: -1000 };
    if (anchorActivityMenu) {
      var rect = anchorActivityMenu.getBoundingClientRect();
      activityMenuPos = { top: rect.top, left: rect.left };
    }
    let imageMarginTop = morefields ? 54 : 28;

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

    // room menu position
    let roomMenuPos = { top: -1000, left: -1000 };
    if (anchorRoomMenu) {
      let rect = anchorRoomMenu.getBoundingClientRect();
      roomMenuPos = { top: rect.top, left: rect.left };
    }

    return (
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
        PaperProps={{
          style: {
            borderRadius: 0,
            border: `1px solid`,
            backgroundColor: bgColor,
          },
        }}
      >
        <DialogTitle>
          <Typography className={classes.caption} align="center">
            {title}
          </Typography>
          <IconButton
            onClick={this.handleCancel}
            className={classes.actionbutton}
          >
            <img
              className={classes.actionimg}
              alt="apply"
              src="/static/images/delete.png"
            />
          </IconButton>
        </DialogTitle>

        <DialogContent id="dayPickerScroller">
          <div className={classes.infocontainer}>
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
                    className={classes.upload_picture}
                  >
                    <img
                      className={classes.image}
                      alt="camera"
                      src={`/static/images/icons/${theme}/camera_upload.png`}
                      style={{ marginTop: imageMarginTop }}
                    />
                  </IconButton>
                </label>
              </div>
              <div className={classes.inputbox}>
                <InputBase
                  id="comment"
                  className={classes.comment}
                  multiline
                  fullWidth
                  minRows="4"
                  name="comment"
                  value={comment || ""}
                  readOnly={!loggedIn}
                  placeholder={"Write your post here"}
                  onChange={loggedIn ? this.handleChange : null}
                />
                {morefields && (
                  <Button
                    className={classes.room}
                    onClick={(e) => this.showRoomMenu(e.currentTarget)}
                  >
                    <Typography
                      className={
                        room ? classes.roomtxt_active : classes.roomtxt
                      }
                    >
                      {room ? room.name : "Room"}
                    </Typography>
                  </Button>
                )}
              </div>
            </div>
            {morefields && (
              <Grid item xs={12}>
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
                    <Typography className={classes.selecttitle}>
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
                            image={`/static/images/icons/${theme}/cleanair.png`}
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
                            image={`/static/images/icons/${theme}/hepa-filter.png`}
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
                            <ArrowForwardIosIcon
                              className={classes.adjusticon}
                            />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  <div>
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Grid item>
                        <Typography className={classes.selecttitle}>
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
                        justifyContent="space-between"
                        alignItems="center"
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
              <div
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
              >
                <MaskFriendlyHours
                  handleMaskFriendlyHours={this.handleMaskFriendlyHours}
                  onObjectChange={this.onObjectChange}
                  selectedDates={
                    Object.keys(selectedTime).length > 0 ? selectedTime : null
                  }
                />
              </div>
            )}
          </div>
        </DialogContent>

        <DialogActions style={{ justifyContent: "center" }}>
          {apply_enabled && (
            <Button className={classes.applybtn} onClick={this.handleSave}>
              Save
            </Button>
          )}
          {!apply_enabled && (
            <Button className={classes.applybtn} style={{ opacity: 0.38 }}>
              Save
            </Button>
          )}
        </DialogActions>

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
        <DlgAboutCalculator
          open={showAboutCalculator}
          onClose={(e) => this.showAboutCalculator(false)}
        />
        <DlgConfirm
          open={showDeleteRoomDlg}
          title={"Delete Room?"}
          content={"Do you really want to delete the room?"}
          onOK={this.handleConfirmDeleteRoom}
          onCancel={(e) => this.showDeleteRoomDlg(false)}
        />
        <DlgRoom
          open={showNewRoomDlg}
          theme={theme}
          onClose={(e) => this.showNewRoomDlg(false)}
          onSubmit={this.handleCreateNewRoom}
        />
      </Dialog>
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
  rooms: PropTypes.array,
  theme: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default withStyles(styles)(DlgReading);
