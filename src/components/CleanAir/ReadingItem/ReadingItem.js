import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  MAX_CARD_WIDTH,
  MIN_CARD_WIDTH,
  BLANK_USER_IMAGE,
} from "../../../constants/types";
import {
  CONF_ADJUST_ACTIVITIES,
  CONF_MASKS,
  MASK_NOT_REQUIRED,
  MASK_STAFF,
  MASK_REQUIRED,
} from "../../../constants/maplocation";
import { ToastError } from "../../../utility/toast";
import { get_elapsed_time } from "../../../utility/utils";
import { get_adjusted_co2_level } from "../../../utility/cleanair";

const styles = (theme) => ({
  card: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
    minWidth: MIN_CARD_WIDTH - 16,
    maxWidth: MAX_CARD_WIDTH - 16,
  },
  carddiv: {
    margin: 3,
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: 10,
    borderColor: theme.palette.feedstroke.default,
    borderWidth: 2,
    borderStyle: "solid",
    backgroundColor: theme.palette.feedbackground.default,
    boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
    borderTopLeftRadius: 49,
  },
  readerimage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 54,
    height: 54,
    borderRadius: "50%",
  },
  header: {
    padding: 0,
  },
  expand: {
    position: "absolute",
    top: 4,
    right: 8,
    padding: 4,
    width: 24,
    height: 24,
    zIndex: 100,
    color: theme.palette.text.primary,
  },
  titleline: {
    position: "relative",
    marginLeft: 8,
    marginRight: 40,
    marginTop: -47,
    marginBottom: 0,
  },
  name: {
    fontFamily: "Roboto, sans-serif",
    fontStyle: "normal",
    fontSize: 20,
    fontWeight: 700,
    color: theme.palette.text.primary,
    cursor: "pointer",
  },
  biography: {
    fontFamily: "Roboto, sans-serif",
    fontStyle: "normal",
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 4,
    color: theme.palette.text.primary,
    cursor: "pointer",
  },
  posted: {
    position: "absolute",
    top: 16,
    right: 40,
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
  },
  content: {
    paddingTop: theme.spacing(1),
    paddingBottom: 0,
    marginLeft: 16,
    marginRight: 10,
    marginTop: -56,
  },
  airlevel_titlebox: {
    marginLeft: 24,
    alignItems: "center",
  },
  airlevel_title: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "20px",
    lineHeight: "24px",
    color: theme.palette.text.primary,
    padding: 0,
    marginBottom: 16,
  },
  airlevel_description: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    color: theme.palette.text.primary,
  },
  descriptionblock: {
    marginBottom: 0,
  },
  description: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    lineHeight: "18px",
    color: theme.palette.text.primary,
    whiteSpace: "pre-wrap",
    width: "inherit",
    wordBreak: "break-word",
    paddingLeft: 24,
  },
  maskblock: {
    textAlign: "center",
  },
  maskimg: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  masknote: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    color: theme.palette.text.primary,
    padding: 0,
  },
  imageblock: {
    margin: theme.spacing(1),
    marginLeft: 24,
    marginRight: 24,
    textAlign: "right",
  },
  image: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  verifiedimage: {
    position: "absolute",
    bottom: 72,
    right: 32,
    padding: 2,
    width: 28,
    height: 28,
    background: "white",
    borderRadius: 14,
  },
  verifiedtext: {
    fontWeight: 200,
  },
  actionbtn: {
    position: "absolute",
    let: 40,
    textTransform: "inherit",
    color: theme.palette.text.secondary,
  },
  comments: {
    cursor: "pointer",
  },
  recommends: {
    cursor: "pointer",
  },
  reactionimg: {
    float: "left",
    marginLeft: 11,
    width: 20,
    height: 20,
    marginTop: 18,
  },
  reactionvalue: {
    float: "left",
    marginLeft: 16,
    fontFamily: "Arial",
    fontSize: "12px",
    lineHeight: "14px",
    color: theme.palette.text.secondary,
  },
  cleanairimg: {
    position: "absolute",
    top: 60,
    left: 14,
    width: 20,
    height: 20,
  },
  nodescription: {
    display: "flex",
    justifyContent: "start",
    marginLeft: 18,
  },
  maskFriendlyHourday: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto, sans-serif",
    color: theme.palette.text.primary,
  },
  maskFriendlyHourtext: {
    fontSize: 15,
    fontFamily: "Roboto, sans-serif",
    color: theme.palette.text.primary,
  },
  mapairimg: {
    width: 18,
    height: 18,
    marginRight: "auto",
    display: "block",
  },
  mapairimgclock: {
    width: 18,
    height: 18,
    marginRight: "auto",
    display: "block",
    marginTop: 8,
  },
  airlevel_description_room: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    color: theme.palette.text.primary,
    marginLeft: "20px",
  },
  description_comment: {
    margin: "12px 0",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    lineHeight: "18px",
    color: theme.palette.text.primary,
    whiteSpace: "pre-wrap",
    width: "inherit",
    wordBreak: "break-word",
    paddingLeft: 24,
  },
  commentsblock: {
    marginLeft: "auto",
    marginRight: "38px",
    marginBottom: "16px",
  },
  mt4: {
    marginTop: "4rem",
  },
  maskfriendlyblock: {
    marginLeft: 18,
  },
});

class ReadingItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      showComments: false,
      maskFriendlyHours: "",
    };

    this.handleExpand = this.handleExpand.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);

    this.handleReport = this.handleReport.bind(this);
    this.handleShare = this.handleShare.bind(this);

    this.handleClickComments = this.handleClickComments.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  setError = (message) => {
    ToastError(message);
  };

  handleExpand = (event) => {
    this.setState({
      ...this.state,
      anchorEl: event.currentTarget,
    });
  };

  handleCloseMenu = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
    });
  };

  handleReport = () => {
    const { reading } = this.props;
    this.handleCloseMenu();
    this.props.onReport(reading);
  };

  handleShare = () => {
    const { reading } = this.props;
    this.handleCloseMenu();
    this.props.onShare(reading);
  };

  handleClickComments = () => {
    this.setState({
      ...this.state,
      showComments: !this.state.showComments,
    });
  };

  getMaskFriendlyHours = async () => {};

  render() {
    const { classes, theme, reading, onRecommends } = this.props;
    const { anchorEl } = this.state;

    let reader_image = reading.reader.image;
    if (!reading.reader.image) {
      reader_image = BLANK_USER_IMAGE;
    }

    let width =
      document.documentElement.clientWidth ||
      document.body.clientWidth ||
      window.innerWidth;
    width -= 16;
    if (width > MAX_CARD_WIDTH - 16) width = MAX_CARD_WIDTH - 16;
    if (width < MIN_CARD_WIDTH - 16) width = MIN_CARD_WIDTH - 16;

    let menuPos = { top: -1000, left: -1000 };
    if (anchorEl) {
      var rect = anchorEl.getBoundingClientRect();
      menuPos = { top: rect.top, left: rect.left };
    }

    let air_title = "";
    let air_description = "";
    if (reading.adjusted) {
      const adjusted_co2 = get_adjusted_co2_level(
        reading.co2_in,
        CONF_ADJUST_ACTIVITIES[reading.activity].cfm,
        reading.people_no,
        reading.hepa_cadr,
        reading.uvgi_cap
      );
      air_title = `${parseInt(adjusted_co2)} ppm (adjusted)`;
      air_description = "";
    } else {
      if (reading.co2) {
        air_title = `${reading.co2} ppm`;
        air_description = "";
      } else if (reading.ach) {
        air_title = "HEPA filters";
        air_description = `${reading.ach} Air Changes an Hour`;
      }
    }

    let mask_note1 = "";
    let mask_note2 = "";
    if (reading.mask === MASK_NOT_REQUIRED) {
      mask_note1 = "Masks not";
      mask_note2 = "required";
    } else if (reading.mask === MASK_STAFF) {
      mask_note1 = "Staff";
      mask_note2 = "masked";
    } else if (reading.mask === MASK_REQUIRED) {
      mask_note1 = "Masks";
      mask_note2 = "required";
    }

    return (
      <>
        <Card className={classes.card} style={{ width: width }}>
          <div className={classes.carddiv}>
            <CardHeader
              className={classes.header}
              avatar={
                <div className={classes.mt4}>
                  <LazyLoadImage
                    className={classes.readerimage}
                    alt={reading.reader.name}
                    src={reader_image}
                  />
                  <img
                    alt={"cleanair location"}
                    src={`/static/images/icons/${theme}/cleanair.png`}
                    className={classes.cleanairimg}
                  />
                  <div
                    className={classes.recommends}
                    onClick={(e) => onRecommends(reading)}
                  >
                    <img
                      alt={"Recommend"}
                      src={`/static/images/icons/${theme}/thumbsup.png`}
                      className={classes.reactionimg}
                    />
                    <br />
                    <Typography className={classes.reactionvalue}>
                      {reading.recommends === 0 ? "" : reading.recommends}
                    </Typography>
                  </div>
                </div>
              }
              title={
                <div className={classes.titleline}>
                  <Typography className={classes.name}>
                    {reading.reader.name.slice(0, 32)}
                  </Typography>
                  {reading.reader.biography && (
                    <Typography className={classes.biography}>
                      {reading.reader.biography?.slice(0, 32)}
                    </Typography>
                  )}
                </div>
              }
            />
            <div>
              <Typography className={classes.posted}>
                {get_elapsed_time(reading.reading_at)}
              </Typography>
            </div>
            <CardContent className={classes.content}>
              <div className={classes.airlevel_titlebox}>
                <Typography className={classes.airlevel_title}>
                  {air_title}
                </Typography>
                {reading.location_room && (
                  <Typography className={classes.airlevel_title}>
                    {reading.location_room.name}
                  </Typography>
                )}
              </div>
              <Typography className={classes.airlevel_description}>
                {air_description}
              </Typography>
              <Grid
                container
                direction="row"
                spacing={1}
                className={classes.descriptionblock}
              >
                <Grid item xs={9}>
                  {reading.comment && (
                    <Typography className={classes.description}>
                      {reading.comment}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={reading.comment ? 3 : 12}>
                  <div
                    className={
                      reading.comment
                        ? classes.maskblock
                        : classes.nodescription
                    }
                  >
                    <img
                      alt={"cleanair location"}
                      src={`/static/images/icons/${theme}/${
                        CONF_MASKS[reading.mask + 1].image
                      }`}
                      className={classes.maskimg}
                    />
                    <Typography className={classes.masknote}>
                      {mask_note1}
                    </Typography>
                    <Typography className={classes.masknote}>
                      {" "}
                      &nbsp;{mask_note2}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
              {reading.location_mask_friendly_hours.length > 0 && (
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.maskfriendlyblock}
                >
                  <Grid item xs={1}>
                    <img
                      alt={"cleanair location"}
                      src={`/static/images/icons/${theme}/stopwatch_night.png`}
                      className={classes.mapairimgclock}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    {reading.location_mask_friendly_hours.length > 0 && (
                      <Typography className={classes.maskFriendlyHourtext}>
                        Mask Friendly Hours
                      </Typography>
                    )}
                    {reading.location_mask_friendly_hours.length > 0 &&
                      reading.location_mask_friendly_hours.map((item) => {
                        const dayTime = `${
                          item?.day
                        } ${item?.time.toLowerCase()}`;
                        return (
                          <Typography className={classes.maskFriendlyHourday}>
                            {dayTime}
                          </Typography>
                        );
                      })}
                  </Grid>
                </Grid>
              )}
            </CardContent>

            {reading.image && (
              <div className={classes.imageblock}>
                <LazyLoadImage
                  alt={"reading"}
                  src={reading.image}
                  className={classes.image}
                />
                {reading.gps_verified && (
                  <>
                    <img
                      alt={"verified"}
                      src={`/static/images/icons/${theme}/shield.png`}
                      className={classes.verifiedimage}
                    />
                    <Typography className={classes.verifiedtext}>
                      GPS Verified
                    </Typography>
                  </>
                )}
              </div>
            )}
          </div>
        </Card>
      </>
    );
  }
}

ReadingItem.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.string,
  reading: PropTypes.object,
  pending: PropTypes.bool,
  onNeedLogin: PropTypes.func,
  onMemberTrial: PropTypes.func,
  onRecommends: PropTypes.func,
  onReport: PropTypes.func,
  onShare: PropTypes.func,
  onClickReading: PropTypes.func,
};

export default withStyles(styles)(ReadingItem);
