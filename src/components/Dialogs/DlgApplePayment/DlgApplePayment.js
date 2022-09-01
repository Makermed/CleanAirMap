import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from "@material-ui/core";
import { 
  PaymentRequestButtonElement, 
  useStripe, 
  useElements 
} from "@stripe/react-stripe-js";
import { stripeService } from "services";


const useStyles = makeStyles((theme) => ({
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
  description: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const DlgApplePayment = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    async function doPayment() {
      // Step 1: Fetch product details such as amount and currency from
      // API to make sure it can't be tampered with in the client.
      // console.log("paymentType :", props.paymentType);
      const productDetails = await stripeService.getProductDetails(props.paymentType);

      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Subscribe Raven Membership',
          amount: productDetails.amount,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // console.log("paymentRequest0 :", pr);

      // Check the availability of the Payment Request API
      pr.canMakePayment().then(result => {
        // console.log("canMakePayment :", result);
        // must uncomment for real devices
        // if (result) {
          setPaymentRequest(pr);
        // }
      });

      // console.log("CheckoutForm user :", props.user);
      
      // Step 2: Create PaymentIntent over Stripe API
      pr.on('paymentmethod', async (e) => {
        const clientSecret = await stripeService.createPaymentIntent(props.paymentType, props.user);

        const { 
          error: stripeError,
          paymentIntent
        } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: e.paymentMethod.id,
        }, { handleActions: false });

        if (stripeError) {
          props.onError(stripeError);
          return;
        }

        props.onSuccess(paymentIntent);
      });
    }

    doPayment();
    
  }, [stripe, elements, props.paymentType, props.user, props]);
  

  const classes = useStyles();
  const title = "Subscribe Raven Membership";
  const description =
    "When you join Raven Membership, you can view more feeds and sources...";

  return (
    <div className={classes.root}>
      <Dialog open={props.open} PaperProps={{ style: { borderRadius: 10 } }}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <img
              className={classes.alerticon}
              alt="apple payment"
              src={`/static/images/apple-pay.png`}
            />
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
            <IconButton
              onClick={props.onCancel}
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
          
          {paymentRequest && 
            <PaymentRequestButtonElement 
              options={{paymentRequest}} 
            />
          }
        </div>
      </Dialog>
    </div>
  );
}

DlgApplePayment.propTypes = {
  open: PropTypes.bool,
  paymentType: PropTypes.number,
  user: PropTypes.object,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onCancel: PropTypes.func
};

export default DlgApplePayment;