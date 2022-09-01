import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { 
  Dialog, 
  DialogTitle, 
  IconButton,
  Typography
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { ShareButtonList } from "components";
import { InfoCard } from "./components";
import { MIN_CARD_WIDTH } from "constants/types";


const styles = (theme) => ({
  dialog: {
    width: MIN_CARD_WIDTH,
    // maxHeight: 210,
    margin: theme.spacing(1),
  },
  actionbutton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    padding: 0,
    margin: 0,
  },
  actionimg: {
    padding: 0,
    width: 32,
    height: 32,
  },
  container: {
    margin: theme.spacing(1),
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  buttonscontainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  }
});

class DlgShare extends React.Component {

  render() {
    const { 
      classes, 
      theme_mode,
      open, 
      shareInfo,
      onClose
    } = this.props;

    const title = "Share";

    return (
      <Dialog
        classes={{ paper: classes.dialog }}
        open={open}
        aria-labelledby="share-dialog-title"
        onClose={onClose}
      >
        <DialogTitle id="simple-dialog-title">
          <Typography className={classes.title}>
            {title}
          </Typography>
        </DialogTitle>

        <IconButton
          onClick={onClose}
          className={classes.actionbutton}
        >
          <CloseIcon />
        </IconButton>

        <div className={classes.container}>
          <InfoCard
            info={shareInfo}
          />

          <div className={classes.buttonscontainer}>
            <ShareButtonList
              shareInfo={shareInfo}
              theme_mode={theme_mode}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

DlgShare.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  shareInfo: PropTypes.object,
  onClose: PropTypes.func,
};

const mapStateToProps = (state) => ({
  theme_mode: state.uiState.theme_mode
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(DlgShare);
