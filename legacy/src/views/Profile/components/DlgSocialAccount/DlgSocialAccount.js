import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    
  },
  appBar: {
    position: "relative",
    backgroundColor: theme.palette.background.card,
  },
  alerticon: {
    padding: 4,
    width: 32,
    height: 32,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    width: 160,
    fontSize: 18,
    fontWeight: 500,
  },
  actionbutton: {
    padding: 0,
    margin: 0,
  },
  actionbutton_disabled: {
    padding: 0,
    margin: 0,
    opacity: 0.38,
  },
  actionimg: {
    padding: 0,
    width: 32,
    height: 32,
  },
  content: {
    backgroundColor: theme.palette.background.card,
    paddingTop: 0,
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
  accounttext: {
    flex: 1,
    color: theme.palette.text.primary,
    margin: 0,
    padding: 4,
    backgroundColor: theme.palette.background.default,
    "& input": {
      fontSize: 16,
      fontHeight: 18,
      backgroundColor: theme.palette.background.default,
    },
  },
});

class DlgSocialAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      account: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount = () => {
    // console.log("DlgSocialAccount :", this.props.account_value);
    this.setState({
      ...this.state,
      account: this.props.account_value
    });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.account_value !== this.props.account_value) {
      // console.log("DlgSocialAccount :", this.props.account_value);
      this.setState({
        ...this.state,
        account: this.props.account_value
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      account: event.target.value,
    });
  };

  handleApply = () => {
    const { account_type } = this.props;
    this.props.onApply(account_type, this.state.account);
    // this.setState({
    //   ...this.state,
    //   account: ""
    // });
  };

  handleCancel = () => {
    this.props.onCancel();
    // this.setState({
    //   ...this.state,
    //   account: ""
    // });
  };

  render() {
    const { classes, open, title } = this.props;
    const { account } = this.state;

    const button_class = account.length > 0 ? classes.actionbutton : classes.actionbutton_disabled;

    return (
      <div className={classes.root}>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
              <IconButton
                onClick={account.length > 0 ? this.handleApply : null}
                className={button_class}
              >
                <img
                  className={classes.actionimg}
                  alt="apply"
                  src="/static/images/approve.png"
                />
              </IconButton>
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
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <InputBase
              id="account-text"
              className={classes.accounttext}
              fullWidth
              name="account"
              value={account}
              onChange={this.handleChange}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

DlgSocialAccount.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  title: PropTypes.string,
  onCancel: PropTypes.func,
  onApply: PropTypes.func
};

export default withStyles(styles)(DlgSocialAccount);
