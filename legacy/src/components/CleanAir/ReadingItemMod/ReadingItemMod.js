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
  Menu
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  PopMenuMapReadingMod,
} from "components";
import { 
  MAX_CARD_WIDTH, 
  MIN_CARD_WIDTH 
} from "constants/types";
import {
  CONF_MASKS,
} from "constants/maplocation";
import {
  ToastError
} from "utility/toast";
import { 
  get_elapsed_time 
} from "utility/utils";


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
    backgroundColor: theme.palette.background.article,
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
    display: "flex",
    marginLeft: 24,
    alignItems: "center"
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
  },
  actionbtn: {
    position: "absolute",
    let: 40,
    textTransform: "inherit",
    // float: "right",
    color: theme.palette.text.secondary,
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
    };

    this.handleExpand = this.handleExpand.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);

    this.handleEditComment = this.handleEditComment.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.handleShare = this.handleShare.bind(this);
    this.handleMakeModerator = this.handleMakeModerator.bind(this);
    this.handleBanUser = this.handleBanUser.bind(this);
  }

  setError = (message) => {
    ToastError(message);
  }

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
  }

  handleEditComment = () => {
    const { reading } = this.props;
    this.props.onEdit(reading);
    this.handleCloseMenu();
  }

  handleDeleteComment = () => {
    const { reading } = this.props;
    this.props.onDelete(reading);
    this.handleCloseMenu();
  }

  handleShare = () => {
    const { reading } = this.props;
    this.props.onShare(reading);
    this.handleCloseMenu();
  }

  handleMakeModerator = () => {
    const { reading } = this.props;
    this.props.onMakeModerator(reading);
    this.handleCloseMenu();
  }

  handleBanUser = () => {
    const { reading } = this.props;
    this.props.onBanUser(reading);
    this.handleCloseMenu();
  }

  render() {
    const { 
      classes, 
      theme,
      reading, 
    } = this.props;
    const { 
      anchorEl, 
    } = this.state;

    let reader_image = reading.reader.image;
    if (!reading.reader.image) {
      reader_image = `/static/images/avatars/blank_avatar.png`;
    }

    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    width -= 16;
    if (width > MAX_CARD_WIDTH - 16)
      width = MAX_CARD_WIDTH - 16;
    if (width < MIN_CARD_WIDTH - 16)
      width = MIN_CARD_WIDTH - 16;

    // popup menu position
    let menuPos = { top: -1000, left: -1000 };
    if (anchorEl) {
      var rect = anchorEl.getBoundingClientRect();
      menuPos = { top: rect.top, left: rect.left };
    }

    let air_title = "";
    let air_description = "";
    if (reading.co2) {
      air_title = `${reading.co2} ppm`;
      air_description = "";
    } else if (reading.ach) {
      air_title = "HEPA filters";
      air_description = `${reading.ach} Air Changes an Hour`;
    }

    return (
      <>
        <Card className={classes.card} style={{ width: width }}>
          <div className={classes.carddiv}>
            <CardHeader
              className={classes.header}
              avatar={
                <div>
                  <img
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
              <IconButton className={classes.expand} onClick={this.handleExpand}>
                <ExpandMoreIcon />
              </IconButton>
            </div>
            <CardContent className={classes.content}>
              <div className={classes.airlevel_titlebox}>
                <Typography className={classes.airlevel_title}>
                  {air_title}
                </Typography>
              </div>
              <Typography className={classes.airlevel_description}>{air_description}</Typography>
              <Grid 
                container 
                direction="row" 
                spacing={1} 
                className={classes.descriptionblock}
              >
                <Grid item xs={9}>
                  <Typography className={classes.description}>{reading.comment}</Typography>
                </Grid>
                <Grid item xs={3}>
                </Grid>
              </Grid>
            </CardContent>
            <div className={classes.maskblock}>
              <img
                alt={"cleanair location"}
                src={`/static/images/icons/${theme}/${CONF_MASKS[reading.mask + 1].image}`}
                className={classes.maskimg}
              />
              {/* <Typography className={classes.masknote}>{mask_note1}</Typography>
              <Typography className={classes.masknote}>{mask_note2}</Typography> */}
            </div>
            {reading.image && 
              <div className={classes.imageblock}>
                <img
                  alt={"reading"}
                  src={reading.image}
                  className={classes.image}
                />
              </div>
            }
            <CardActions>
              <Grid 
                container
                direction="row"
                className={classes.actionbtn}
              >
                <Grid item xs={5}>
                  <img
                    alt={"comments"}
                    src={`/static/images/icons/${theme}/comments_all.png`}
                    className={classes.reactionimg}
                  />
                  <Typography className={classes.reactionvalue}>
                    {`0 comments`}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <img
                    alt={"Recommend"}
                    src={`/static/images/icons/${theme}/like.png`}
                    className={classes.reactionimg}
                  />
                  <Typography className={classes.reactionvalue}>
                    {`Recommend 0`}
                  </Typography>
                </Grid>
              </Grid>
            </CardActions>
          </div>
        </Card>
        <Menu
          id="source-menu"
          anchorReference="anchorPosition"
          anchorPosition={{ top: menuPos.top, left: menuPos.left + 24 }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={anchorEl !== null}
          onClose={this.handleCloseMenu}
        >
          <PopMenuMapReadingMod
            theme={theme}
            onEdit={this.handleEditComment}
            onDelete={this.handleDeleteComment}
            onShare={this.handleShare}
            onMakeModerator={this.handleMakeModerator}
            onBanUser={this.handleBanUser}
          />
        </Menu>
      </>
    );
  }
}

ReadingItemMod.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.string,
  reading: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onShare: PropTypes.func,
  onMakeModerator: PropTypes.func,
  onBanUser: PropTypes.func
};

export default withStyles(styles)(ReadingItemMod);