import React from "react";
import {
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const PaymentForm = ({
  checkoutToken,
  backStep,
  shippingData,
  handleCaptureCheckout,
  nextStep,
  timeout,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.adress1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fullfillment: { shipping_method: shippingData.shippingOption },
        paymant: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      handleCaptureCheckout(checkoutToken.id, orderData);
      timeout();
      nextStep();
    }
  };
  const Review = () => {
    return (
      <>
        <Typography variant="h6" gutterBottom>
          Order summery
        </Typography>
        <List disablePadding>
          {checkoutToken.live.line_items.map((product) => {
            return (
              <ListItem style={{ padding: "10px 0" }} key={product.name}>
                <ListItemText
                  primary={product.name}
                  secondary={`Quantity: ${product.quantity}`}
                />
                <Typography variant="body2">
                  {product.line_total.formatted_with_symbol}
                </Typography>
              </ListItem>
            );
          })}
          <ListItem style={{ padding: "10px 0" }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" style={{ fontWeight: "700" }}>
              {checkoutToken.live.subtotal.formatted_with_symbol}
            </Typography>
          </ListItem>
        </List>
      </>
    );
  };
  console.log(shippingData.shippingOption);
  return (
    <>
      <Review />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
