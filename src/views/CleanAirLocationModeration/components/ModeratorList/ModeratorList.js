import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Moderator } from "./components";


const styles = theme => ({
  root: {
    padding: theme.spacing(1),
    // marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.default
  },
  moderatorcontainer: {
    marginBottom: theme.spacing(1)
  },
  moderator: {
    marginBottom: theme.spacing(1)
  },
});

class ModeratorList extends React.Component {

  render() {
    const { 
      classes, 
      width, 
      theme, 
      moderators, 
      onReport, 
      onApprove, 
      onDelete, 
    } = this.props;

    if (moderators.length === 0) {
      return <div></div>;
    }

    return (
      <div className={classes.root} style={{width: width}}>
        <Grid container className={classes.moderatorcontainer} spacing={1}>
          {moderators.map((moderator, index) => (
            <Grid item key={moderator.id} className={classes.moderator}>
              <Moderator
                theme={theme}
                moderator={moderator}
                onReport={onReport}
                onApprove={onApprove}
                onDelete={onDelete}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

ModeratorList.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.number,
  theme: PropTypes.string,
  moderators: PropTypes.array,
  onReport: PropTypes.func,
  onApprove: PropTypes.func,
  onDelete: PropTypes.func,
};


const mapStateToProps = state => ({
  topNavbar: state.uiState.topNavbar
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ModeratorList);

