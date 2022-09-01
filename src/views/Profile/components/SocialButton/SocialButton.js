import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const API_URL = "https://authapi.raventalk.org";

const styles = (theme) => ({
  root: {},
  actionbtn: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "20px",
    padding: "4px 10px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    textTransform: "initial",
    // boxShadow: `0 1px 1px 1px rgba(63,63,68,0.05), 0 3px 3px 0 rgba(63,63,68,0.15)`,
  },
  actionicon: {
    padding: 3,
    width: 24,
    height: 24,
    color: theme.palette.primary.contrastText,
  },
});

class SocialButton extends React.Component {

  componentDidMount() {
    const { socket, provider } = this.props;

    socket.on(provider, (user) => {
      // console.log("user :", user);
      if (this.popup) {
        this.popup.close();
      }
      this.updateAccount(provider, user.name);
    });
  }

  updateAccount = (provider, username) => {
    this.props.onUpdateUser(provider, username);
  };

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
      }
    }, 1000);
  }

  openPopup() {
    const { provider, socket } = this.props;
    // console.log("openpopup :", provider, socket.id);

    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${API_URL}/${provider}?socketId=${socket.id}`;

    return window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  }

  startAuth = () => {
    this.popup = this.openPopup();
    this.checkPopup();
  };

  capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  }

  render() {
    const { classes, theme_mode, provider, username } = this.props;
    const atSymbol = provider === "twitter" ? "@" : "";

    let img_src = "";
    if (provider === "twitter") {
      img_src = `/static/images/icons/${theme_mode}/twitter.png`;
    } else if (provider === "instagram") {
      img_src = `/static/images/icons/${theme_mode}/instagram.png`;
    } else if (provider === "linkedin") {
      img_src = `/static/images/icons/${theme_mode}/linkedin.png`;
    }

    return (
      <div>
        <Button
          className={classes.actionbtn}
          startIcon={
            <img className={classes.actionicon} alt="approve" src={img_src} />
          }
          onClick={this.startAuth}
        >
          {username === "" ? `Add ${this.capitalize(provider)}` : `${atSymbol}${username}`}
        </Button>
      </div>
    );
  }
}

SocialButton.propTypes = {
  classes: PropTypes.object,
  theme_mode: PropTypes.string,
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired,
  username: PropTypes.string,
  onUpdateUser: PropTypes.func
};

export default withStyles(styles)(SocialButton);
