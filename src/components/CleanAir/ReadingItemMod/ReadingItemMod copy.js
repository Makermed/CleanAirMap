import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { 
  Avatar, 
  Grid, 
  IconButton,
  Menu,
  Typography, 
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { get_elapsed_time } from "utility/utils";
import { MASK_REQUIRED, MASK_STAFF } from "constants/maplocation";
import {
  ToastError
} from "utility/toast";
import { PopMenuMapReadingMod } from "components";
import { MAX_CARD_WIDTH } from "constants/types";

const styles = (theme) => ({
  root: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
    marginBottom: theme.spacing(1),
    maxWidth: MAX_CARD_WIDTH
  },
  expand: {
    position: "absolute",
    top: 4,
    right: 0,
    padding: 4,
    width: 24,
    height: 24,
    zIndex: 100,
    color: theme.palette.text.primary,
  },
  gridorder: {
    width: 24,
  },
  order: {
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "18px",
  },
  title: {
    fontSize: "16px",
    fontWeight: 200,
    lineHeight: "18px",
    color: theme.palette.text.primary,
  },  
  label: {
    fontSize: "14px",
    fontWeight: 200,
    lineHeight: "16px",
    color: theme.palette.text.primary,
  },
  maskblock: {
    textAlign: "center",
  },
  maskimg: {
    width: 32,
    height: 32,
  },
  postedcontainer: {
    marginTop: theme.spacing(1),
  },
  image: {
    width: 24,
    height: 24,
  },
  name: {
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "14px",
    color: theme.palette.text.primary,
  },  
  avatar: {
    width: 32,
    height: 24,
  },
  from: {
    width: 170,
  },
});


class ReadingItemMod extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
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
    const { classes, theme, reading, index } = this.props;
    const { anchorEl } = this.state;

    let title = '';
    if (reading.co2) {
      title = `${reading.co2} ppm`;
    } else if (reading.ach) {
      title = `${reading.ach} Air Changes an Hour`;
    }

    let mask_image = "";
    if (reading.mask === MASK_STAFF) {
      mask_image = `/static/images/icons/${theme}/mask-half.png`;
    } else if (reading.mask === MASK_REQUIRED) {
      mask_image = `/static/images/icons/${theme}/mask.png`;
    } else {
      mask_image = `/static/images/icons/${theme}/mask-not.png`;
    }

    let reader_image = reading.reader.image;
    if (!reading.reader.image) {
      reader_image = `/static/images/avatars/blank_avatar.png`;
    }
    const posted_by = reading.reader.name;
    const posted_at = "Posted " + get_elapsed_time(reading.reading_at);

    let menuPos = { top: -1000, left: -1000 };
    if (anchorEl) {
      var rect = anchorEl.getBoundingClientRect();
      menuPos = { top: rect.top, left: rect.left };
    }
    
    return (
      <div className={classes.root}>
        <IconButton className={classes.expand} onClick={this.handleExpand}>
          <ExpandMoreIcon />
        </IconButton>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item className={classes.gridorder}>
            <Typography className={classes.order}>
              {`${index + 1}. `}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={9}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={1}
                >
                  <Grid item xs={12}>
                    <Typography className={classes.title}>
                      {title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.label}>
                      {reading.comment}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.maskblock}>
                  <img
                    alt={"mask"}
                    src={mask_image}
                    className={classes.maskimg}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                className={classes.postedcontainer}
              >
                <Grid item className={classes.avatar}>
                  <Avatar className={classes.image} src={reader_image} />
                </Grid>
                <Grid item className={classes.from}>
                  <Typography className={classes.label}>{"Posted by"}</Typography>
                  <Typography className={classes.name}>{posted_by}</Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.label}>{posted_at}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
        <Menu
          id="source-menu"
          // anchorEl={anchorEl}
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
      </div>
    );
  }
}

ReadingItemMod.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.string,
  reading: PropTypes.object,
  index: PropTypes.number,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onShare: PropTypes.func,
  onMakeModerator: PropTypes.func,
  onBanUser: PropTypes.func
};

export default withStyles(styles)(ReadingItemMod);
