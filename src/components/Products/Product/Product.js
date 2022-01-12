import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import {
  AddShoppingCart,
  CallMissedSharp,
  RoundedCornerOutlined,
} from "@material-ui/icons";
import useStyles from "./styles";
const Product = ({ product, handleAddToCart }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        title={product.name}
        image={product.image.url}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6">
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography
          variant="h6"
          color="textSecondary"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          aria-label="add to cart"
          onClick={() => handleAddToCart(product.id, 1)}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
