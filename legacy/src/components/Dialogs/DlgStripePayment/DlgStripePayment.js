import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from "@material-ui/core";
import { CheckoutForm } from './components';


const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  appBar: {
    position: "relative",
  },
  alerticon: {
    padding: 4,
    width: 32,
    height: 32,
  },
  title: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: 18,
    fontWeight: 500,
  },
  cancelbutton: {
    padding: 0,
    margin: 0,
  },
  actionimg: {
    padding: 0,
    width: 32,
    height: 32,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
  checkoutcontainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  applybutton: {
    backgroundColor: theme.palette.background.main,
    borderRadius: 4,
    margin: theme.spacing(2),
    marginBottom: 0,
    textTransform: "none",
  },
});

class DlgStripePayment extends React.Component {

  render() {
    const { classes, open, paymentType, user, onSuccess, onError, onCancel } = this.props;

    const title = "Subscribe Raven Membership";
    const description =
      "When you join Raven Membership, you can view more feeds and sources...";

    return (
      <div className={classes.root}>
        <Dialog open={open} PaperProps={{ style: { borderRadius: 10 } }}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <img
                className={classes.alerticon}
                alt="stripe payment"
                src={`/static/images/creditcards.png`}
              />
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>
              <IconButton
                onClick={onCancel}
                className={classes.cancelbutton}
              >
                <img
                  className={classes.actionimg}
                  alt="cancel"
                  src="/static/images/delete.png"
                />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <Typography className={classes.description}>
              {description}
            </Typography>
            <div className="sr-main">
              <CheckoutForm
                paymentType={paymentType}
                user={user}
                onSuccess={onSuccess}
                onError={onError}
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

DlgStripePayment.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  paymentType: PropTypes.number,
  user: PropTypes.object,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onCancel: PropTypes.func
};

export default withStyles(styles)(DlgStripePayment);
