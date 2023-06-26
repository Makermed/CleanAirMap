import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { 
    Avatar, 
    Button,
    Grid,
    Typography 
} from "@material-ui/core";
import { AvatarGroup } from '@material-ui/lab';

const styles = theme => ({
  root: {
  },
  actionbtn: {
    backgroundColor: theme.palette.background.main,
    borderRadius: "20px",
    padding: "4px 10px",
    marginRight: theme.spacing(1),
    // marginBottom: theme.spacing(1),
    fontSize: 16,
    textTransform: "initial",
    "&:hover": {
      backgroundColor: theme.palette.background.main,
    },
  },
  actionicon: {
    padding: 4,
    width: 20,
    height: 20,
    color: theme.palette.primary.contrastText,
  },
  textcontainer: {
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.text.secondary,
  }
});

class InviteMemberButton extends React.Component {
  render() {
    const { 
      classes,
      theme_mode, 
      privatefeed,
      showmembers,
      members,
      onMembers,
      onInvite 
    } = this.props;

    let description = "";
    if (members.length > 0) {
      description = privatefeed
        ? `PRIVATE FEED • ${members.length} MEMBERS`
        : `PUBLIC FEED • ${members.length} MEMBERS`;
    }

    return (
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          {(!showmembers || members.length === 0) &&
            <Grid item>
              <Button
                className={classes.actionbtn}
                startIcon={
                  <img
                    className={classes.actionicon}
                    alt="invite"
                    src={`/static/images/icons/${theme_mode}/plus.png`}
                  />
                }
                onClick={onInvite}
              >
                Invite Members
              </Button>
            </Grid>
          }
          {showmembers && members.length > 0 &&
            <Grid item>
              <AvatarGroup 
                max={6} 
                spacing={members.length > 5 ? "small" : "medium"}
                onClick={onMembers}
              >
                {members.map((member, index) => 
                  <Avatar key={`$member-${index}`} alt={member.user.username} src={member.user.image} />
                )}
              </AvatarGroup>
            </Grid>
          }
          {showmembers && members.length > 0 &&
            <Grid item>
              <Button
                className={classes.actionbtn}
                startIcon={
                  <img
                    className={classes.actionicon}
                    alt="invite"
                    src={`/static/images/icons/${theme_mode}/plus.png`}
                  />
                }
                onClick={onInvite}
              >
                Invite
              </Button>
            </Grid>
          }
        </Grid>
        <div className={classes.textcontainer}>
          <Typography className={classes.description}>
            {description}
          </Typography>
        </div>
      </div>
    );
  }
}

InviteMemberButton.propTypes = {
  classes: PropTypes.object,
  theme_mode: PropTypes.string,
  privatefeed: PropTypes.bool,
  showmembers: PropTypes.bool,
  members: PropTypes.array,
  onMembers: PropTypes.func,
  onInvite: PropTypes.func
};

export default withStyles(styles)(InviteMemberButton);
