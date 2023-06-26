const STRIPE_API_URL = "https://stripeapi.raventalk.org";

const createPaymentIntent = (paymentType, user) => {
    const options = {
        metadata: {
            "type": paymentType,
            "userid": user.uid,
            "username": user.username,
            "email": user.email
        } 
    }

    // console.log("createPaymentIntent :", options);

    return window
      .fetch(`${STRIPE_API_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(options)
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(data => {
        if (!data || data.error) {
          console.log("API error:", { data });
          throw new Error("PaymentIntent API Error");
        } else {
          return data.client_secret;
        }
      });
  };
  
  const getProductDetails = paymentType => {
    return window
      .fetch(`${STRIPE_API_URL}/product-details?type=${paymentType}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(data => {
        if (!data || data.error) {
          console.log("API error:", { data });
          throw Error("API Error");
        } else {
            // console.log("product detail :", data);
          return data;
        }
      });
  };
  
  const getPublicStripeKey = options => {
    return window
      .fetch(`${STRIPE_API_URL}/public-key`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(data => {
        if (!data || data.error) {
          console.log("API error:", { data });
          // throw Error("API Error");
          return null;
        } else {
          return data.publicKey;
        }
      });
  };
  
  const stripeService = {
    createPaymentIntent,
    getPublicStripeKey: getPublicStripeKey,
    getProductDetails: getProductDetails
  };
  
  export default stripeService;
  