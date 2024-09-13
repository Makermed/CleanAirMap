import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Typography,
  IconButton,
  Menu,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  BLANK_USER_IMAGE,
  MAX_CARD_WIDTH,
  MIN_CARD_WIDTH,
} from "../../../constants/types";
import {
  CONF_ADJUST_ACTIVITIES,
  CONF_MASKS,
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
  },
  readerimage: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 32,
    height: 32,
    borderRadius: "50%",
  },
  header: {
    padding: 0,
  },
  share: {
    position: "absolute",
    top: 4,
    right: 4,
    padding: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    color: theme.palette.info.contrastText,
    backgroundColor: "#7289DA",
    zIndex: 100,
  },
  shareicon: {
    width: 16,
    height: 16,
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
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    marginBottom: 0,
  },
  name: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    color: theme.palette.text.primary,
    cursor: "pointer",
  },
  biography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
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
  },
  airlevel_description: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    color: theme.palette.text.primary,
  },
  descriptionblock: {
    marginTop: 8,
    marginBottom: 8,
  },
  description: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    lineHeight: "18px",
    color: theme.palette.text.primary,
  },
  maskblock: {
    position: "absolute",
    right: 40,
    top: 64,
    textAlign: "center",
  },
  maskimg: {
    width: 24,
    height: 24,
  },
  masknote: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    color: theme.palette.text.primary,
  },
  imageblock: {
    margin: theme.spacing(1),
    marginLeft: 24,
    marginRight: 24,
  },
  image: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "20px",
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
  reaction: {
    left: "50%",
    transform: "translate(-50%)",
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  reactiondiv: {
    marginLeft: 16,
  },
  reactionimg: {
    float: "left",
    marginLeft: theme.spacing(2),
    width: 12,
    height: 12,
  },
  reactionvalue: {
    float: "left",
    marginLeft: 5,
    fontFamily: "Arial",
    fontSize: "12px",
    lineHeight: "14px",
    color: theme.palette.text.secondary,
  },
});

class ReadingItemMod extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      showComments: false,
    };

    this.handleExpand = this.handleExpand.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);

    this.handleEditComment = this.handleEditComment.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleMakeModerator = this.handleMakeModerator.bind(this);
    this.handleBanUser = this.handleBanUser.bind(this);

    this.handleClickComments = this.handleClickComments.bind(this);
    this.handleDeleteBan1d = this.handleDeleteBan1d.bind(this);
    this.handleDeleteBan7d = this.handleDeleteBan7d.bind(this);
    this.handleDeleteBanPerm = this.handleDeleteBanPerm.bind(this);
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

  handleEditComment = () => {
    const { reading } = this.props;
    this.handleCloseMenu();
    this.props.onEdit(reading);
  };

  handleDeleteComment = () => {
    const { reading } = this.props;
    this.handleCloseMenu();
    this.props.onDelete(reading);
  };

  handleShare = () => {
    const { reading } = this.props;
    this.handleCloseMenu();
    this.props.onShare(reading);
  };

  handleMakeModerator = () => {
    const { reading } = this.props;
    this.handleCloseMenu();
    this.props.onMakeModerator(reading);
  };

  handleBanUser = () => {
    const { reading } = this.props;
    this.handleCloseMenu();
    this.props.onBanUser(reading);
  };

  handleClickComments = () => {
    this.setState({
      ...this.state,
      showComments: !this.state.showComments,
    });
  };

  handleDeleteBan1d = () => {
    const { reading } = this.props;
    this.handleCloseMenu();
    this.props.onBan1d(reading);
  };

  handleDeleteBan7d = () => {
    const { reading } = this.props;
    this.handleCloseMenu();
    this.props.onBan7d(reading);
  };

  handleDeleteBanPerm = () => {
    const { reading } = this.props;
    this.handleCloseMenu();
    this.props.onBanPerm(reading);
  };

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

    // popup menu position
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

    return (
      <>
        <Card className={classes.card} style={{ width: width }}>
          <div className={classes.carddiv}>
            <CardHeader
              className={classes.header}
              avatar={
                <div>
                  <LazyLoadImage
                    className={classes.readerimage}
                    alt={reading.reader.name}
                    src={reader_image}
                  />
                </div>
              }
              title={
                <div className={classes.titleline}>
                  <Typography className={classes.name}>
                    {reading.reader.name.slice(0, 32)}
                  </Typography>
                  <Typography className={classes.biography}>
                    {reading.reader.biography?.slice(0, 32)}
                  </Typography>
                </div>
              }
            />
            <div>
              <Typography className={classes.posted}>
                {get_elapsed_time(reading.reading_at)}
              </Typography>
              <IconButton
                className={classes.expand}
                onClick={this.handleExpand}
              >
                <ExpandMoreIcon />
              </IconButton>
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
                  <Typography className={classes.description}>
                    {reading.comment}
                  </Typography>
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
            </CardContent>
            <div className={classes.maskblock}>
              <img
                alt={"cleanair location"}
                src={`/static/images/icons/${theme}/${
                  CONF_MASKS[reading.mask + 1].image
                }`}
                className={classes.maskimg}
              />
            </div>
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
            <CardActions>
              <Grid container direction="row" className={classes.actionbtn}>
                <Grid item xs={5}>
                  <div
                    className={classes.comments}
                    onClick={this.handleClickComments}
                  >
                    <img
                      alt={"comments"}
                      src={`/static/images/icons/${theme}/comments_all.png`}
                      className={classes.reactionimg}
                    />
                    <Typography className={classes.reactionvalue}>
                      {`0 comments`}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={5}>
                  <div
                    className={classes.recommends}
                    onClick={(e) => onRecommends(reading)}
                  >
                    <img
                      alt={"Recommend"}
                      src={`/static/images/icons/${theme}/like.png`}
                      className={classes.reactionimg}
                    />
                    <Typography className={classes.reactionvalue}>
                      {`Recommend ${reading.recommends}`}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </CardActions>
          </div>
        </Card>
      </>
    );
  }
}

ReadingItemMod.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.string,
  reading: PropTypes.object,
  onRecommends: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onShare: PropTypes.func,
  onMakeModerator: PropTypes.func,
  onBanUser: PropTypes.func,
  onBan1d: PropTypes.func,
  onBan7d: PropTypes.func,
  onBanPerm: PropTypes.func,
};

export default withStyles(styles)(ReadingItemMod);
