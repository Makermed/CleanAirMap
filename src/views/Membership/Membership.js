import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "actions";
import { withRouter, Link } from "react-router-dom";
import { withFirebase } from 'services';
import { withStyles } from "@material-ui/core/styles";
import { IconButton, Typography, Grid, Button } from "@material-ui/core";
import { isDesktop, isAndroid, isIOS } from 'react-device-detect';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ToastContainer } from "react-toastify";
import { 
  DlgStripePayment, 
  DlgApplePayment, 
  DlgGooglePayment, 
  FacebookCircularProgress
} from "components";
import { PriceCard } from "./components";
import { MAX_ARTICLE_WIDTH, MIN_CARD_WIDTH } from "constants/types";
import { stripeService } from "services";
import * as ROUTES from "constants/routes";
import { ToastSuccess, ToastError } from "utility/toast";


const stripePromise = stripeService.getPublicStripeKey().then(key => loadStripe(key));

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh)`,
    minWidth: MIN_CARD_WIDTH,
    maxWidth: MAX_ARTICLE_WIDTH,
    margin: '0 auto',
    backgroundColor: theme.palette.background.default,
  },
  quitbtn: {
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
    paddingBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  image: {
    width: "100%",
  },
  titlediv: {
    marginTop: -20,
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: "42px",
    fontFamily: "Libre Baskerville",
    lineHeight: "50px",
  },
  descdiv: {
    marginLeft: theme.spacing(6),
    marginBottom: theme.spacing(4),
  },
  checkitem: {
    marginTop: theme.spacing(0.5),
  },
  checkmark: {
    width: 16,
    height: 16,
    marginRight: theme.spacing(2),
  },
  description: {
    fontSize: "20px",
    fontFamily: "Libre Baskerville",
    lineHeight: "24px",
  },
  pricegroup: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(2),
  },
  subscribediv: {
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },
  submitBtn: {
    backgroundColor: "#1878F3",
    color: "#FFFFFF",
    borderRadius: "30px",
    padding: "10px 8px",
    width: 260,
    textTransform: "initial",
    marginTop: 10,
    marginBottom: 10,
    "&:hover": {
      backgroundColor: "#1878F3",
      color: "#FFFFFF",
    }
  },
  progress: {
    width: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  success: {
    fontSize: "16px",
    fontFamily: "Roboto",
    fontWeight: 400,
    lineHeight: "20px",
    color: theme.palette.text.primary,
  },
  policydiv: {
    textAlign: "center",
    marginBottom: theme.spacing(1),
  },
  nocommit: {
    fontSize: "12px",
    fontFamily: "Roboto",
    fontWeight: 300,
    lineHeight: "16px",
    color: theme.palette.text.secondary,
  },
  policy: {
    fontSize: "14px",
    fontFamily: "Roboto",
    fontWeight: 600,
    lineHeight: "18px",
    color: theme.palette.text.secondary,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  }
});


class Membership extends React.Component {
  constructor(props) {
    super(props);

    // this.subscribeButton = React.createRef();

    this.state = {
      selected: 0,
      paid: false,
      showPaymentDlg: false
    };

    this.handleQuit = this.handleQuit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);

    this.handlePaymentSuccces = this.handlePaymentSuccces.bind(this);
    this.handlePaymentCancel = this.handlePaymentCancel.bind(this);
  }

  handleQuit = () => {
    this.props.history.goBack();
  };

  handleSelect = (selectNo) => {
    if (selectNo === this.state.selected) {
      return;
    }
    this.setState({
      ...this.state,
      selected: selectNo,
    });
  };

  handleSubscribe = () => {
    // this.subscribeButton.className = "subscribe_button onclic";
    this.setState({
      ...this.state,
      showPaymentDlg: true
    });
  };

  handlePaymentSuccces = async (paymentIntent) => {
    // console.log("Payment Success :", paymentIntent);
    this.setState({
      ...this.state,
      paid: true,
      showPaymentDlg: false,
    });
    ToastSuccess("You have joined Raven Membership successfully");

    // update user info
    this.props.updateUserPaid(true);
  }

  handlePaymentError = (paymentError) => {
    this.setState({
      ...this.state,
      showPaymentDlg: false,
    });
    ToastError(paymentError.message);
  }

  handlePaymentCancel = () => {
    this.setState({
      ...this.state,
      showPaymentDlg: false,
    });
  }

  renderDescItem = (classes, description) => {
    let width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    if (width > MAX_ARTICLE_WIDTH) width = MAX_ARTICLE_WIDTH;
    if (width < MIN_CARD_WIDTH) width = MIN_CARD_WIDTH;
    width = width - 104;
    return (
      <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
        <Grid item className={classes.checkitem}>
          <img className={classes.checkmark} alt="desc-item" src={"/static/images/icons/light/checkmark.png"} /> 
        </Grid>
        <Grid item style={{width: width}}>
          <Typography className={classes.description}>{description}</Typography>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { classes, theme_mode, authUser } = this.props;
    const { selected, paid, showPaymentDlg } = this.state;

    const prices = [
      {
        duration: "Yearly + 7-day free trial",
        price: "$19.99/year",
        description: "Just $1.66 a month",
      },
      {
        duration: "Monthly",
        price: "$4.99/month",
        description: "",
      },
    ];

    const width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;

    let quitButtonPos = 8;
    if (width > MAX_ARTICLE_WIDTH) {
      quitButtonPos = (width - MAX_ARTICLE_WIDTH) / 2 + 8;
    }

    // console.log(`isDesktop = ${isDesktop}, isIOS = ${isIOS}`);

    return (
      <div className={classes.root}>
        <IconButton onClick={this.handleQuit} className={classes.quitbtn} style={{right: quitButtonPos}}>
          <img
            className={classes.actionimg}
            alt="cancel"
            src="/static/images/delete.png"
          />
        </IconButton>
        <div className={classes.container}>
          <img className={classes.image} alt={"membership"} src={"/static/images/site/membership.png"} />
          <div className={classes.titlediv}>
            <Typography className={classes.title}>
              Raven
              <br />
              Membership
            </Typography>
          </div>

          <div className={classes.descdiv}>
            {this.renderDescItem(classes, "View up to 45 feeds")}
            {this.renderDescItem(classes, "More custom feeds")}
            {this.renderDescItem(classes, "No ads")}
            {this.renderDescItem(classes, "Join discussions and an amazing community")}
          </div>

          <div className={classes.pricegroup}>
            <Grid container justifyContent="center" spacing={2}>
              {prices.map((price, index) => 
                <Grid item key={`price-${index}`} onClick={e => this.handleSelect(index)}>
                  <PriceCard
                    theme_mode={theme_mode}
                    recommended={index === 0}
                    selected={index === selected}
                    duration={price.duration}
                    price={price.price}
                    description={price.description}
                  />
                </Grid>
              )}
            </Grid>
          </div>

          <div className={classes.subscribediv}>
            {!paid && !showPaymentDlg && (
              <Button
                className={classes.submitBtn}
                onClick={this.handleSubscribe}
              >
                Start free trial to subscribe
              </Button>
            )}
            {!paid && showPaymentDlg && (
              <div className={classes.progress}>
                <FacebookCircularProgress />
              </div>
            )}
            {paid && (
              <Typography className={classes.success}>
                You have joined Raven Membership successfully
              </Typography>
            )}
            {/* <button 
              id="subscribe_button" 
              class="subscribe_button" 
              ref={element => this.subscribeButton = element}
              onClick={this.handleSubscribe}
            /> */}
          </div>
          <div className={classes.policydiv}>
            <Typography className={classes.nocommit}>
              No Commitment, Cancel Anytime
            </Typography>
          </div>
          <div className={classes.policydiv}>
            <Typography className={classes.policy}>
              <Link className={classes.link} to={ROUTES.TERMS_OF_SERVICE}>
                Terms of Use
              </Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link className={classes.link} to={ROUTES.PRIVACY_POLICY}>
                Privacy Police
              </Link>
            </Typography>
          </div>
        </div>
        <Elements stripe={stripePromise}>
          {isDesktop &&
            <DlgStripePayment
              open={showPaymentDlg}
              paymentType={selected}
              user={authUser}
              onSuccess={this.handlePaymentSuccces}
              onError={this.handlePaymentError}
              onCancel={this.handlePaymentCancel}
            />
          }
          {isIOS &&
            <DlgApplePayment
              open={showPaymentDlg}
              paymentType={selected}
              user={authUser}
              onSuccess={this.handlePaymentSuccces}
              onError={this.handlePaymentError}
              onCancel={this.handlePaymentCancel}
            />
          }
          {isAndroid &&
            <DlgGooglePayment
              open={showPaymentDlg}
              paymentType={selected}
              user={authUser}
              onSuccess={this.handlePaymentSuccces}
              onError={this.handlePaymentError}
              onCancel={this.handlePaymentCancel}
            />
          }
        </Elements>
        <ToastContainer />
      </div>
    );
  }
}

Membership.propTypes = {};

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  theme_mode: state.uiState.theme_mode
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default compose(
  withFirebase,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(Membership);
