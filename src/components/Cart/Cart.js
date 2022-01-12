import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You have no items in your shopping cart
        <Link to="/" className={classes.link}>
          start adding items
        </Link>
      </Typography>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((item) => {
            return (
              <Grid item xs={12} sm={4} key={item.id}>
                <CartItem
                  item={item}
                  handleUpdateCartQty={handleUpdateCartQty}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              </Grid>
            );
          })}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h6">
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="medium"
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleEmptyCart}
            >
              Empty cart
            </Button>
            <Button
              className={classes.checkoutButton}
              size="medium"
              type="button"
              variant="contained"
              color="primary"
              component={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
    );
  };
  if (!cart.line_items) return "Loading...";
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h4" gutterBottom>
        Your shopping cart
      </Typography>
      {!cart.line_items ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
