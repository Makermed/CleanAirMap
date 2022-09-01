import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { InviteMemberButton } from "components";
import { MIN_CARD_WIDTH, MAX_ARTICLE_WIDTH } from "constants/types";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  },
});

class InviteControl extends React.Component {

  render() {
    const { classes, privatefeed, showmembers, members, theme_mode, onClickMembers, onInviteMembers } = this.props;

    let width = document.documentElement.clientWidth || document.body.clientWidth;
    if (width > MAX_ARTICLE_WIDTH)
      width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH)
      width = MIN_CARD_WIDTH;
    width = width - 32;

    return (
      <div className={classes.root} style={{ width: width }}>
        <Grid 
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {/* <Grid item /> */}
          <Grid item>
            <InviteMemberButton
              theme_mode={theme_mode}
              privatefeed={privatefeed}
              showmembers={showmembers}
              members={members}
              onMembers={onClickMembers}
              onInvite={onInviteMembers}
            />
          </Grid>
          {/* <Grid item>
            <PubPrivBtn 
              theme={theme_mode} 
              mode={privatefeed ? 1 : 0}
              publicOnly={publicOnly}
            />
          </Grid> */}
        </Grid>
      </div>
    );
  }
}

InviteControl.propTypes = {
  className: PropTypes.string,
  privatefeed: PropTypes.bool,
  showmembers: PropTypes.bool,
  members: PropTypes.array,
  publicOnly: PropTypes.bool,
  theme_mode: PropTypes.string,
  onClickMembers: PropTypes.func,
  onInviteMembers: PropTypes.func
};

export default withStyles(styles)(InviteControl);
