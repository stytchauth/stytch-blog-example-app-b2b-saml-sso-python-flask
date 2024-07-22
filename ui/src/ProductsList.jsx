import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Card, CardContent, CardMedia } from "@mui/material";

const ProductsList = () => {
  const products = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    description: `Description for Product ${index + 1}`,
    price: (10 + index).toFixed(2),
    imageUrl: `/product-img.png`,
  }));

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Private Products List (Logged in view)
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsList;
