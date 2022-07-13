import { useContext } from 'react';
import { useRouter } from 'next/router';
import {
  Grid, Card, CardActionArea, CardMedia,
  CardContent, Typography, CardActions, Button}from "@material-ui/core";
import NextLink from "next/link";
import Layout from "../components/layout";
import db from "../utils/db";
import Product from "../models/product";
import axios from "axios";
import {Store} from "../utils/store";

export default function Home(props) {

  const router = useRouter();
  const { products } = props;
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async (product) => { 
    const existItem = state.cart.cartItems.find(x=>x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const {data} = await axios.get(`/api/products/${product._id}`);
    if(data.countInStock < quantity){
      alert('Sorry, Product out of stock');
      return;
    }
    dispatch({type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  return (
    <Layout>
      <div className="container">
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name} >
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>

                  <CardActionArea>
                    <CardMedia component="img" image={product.image} title={product.name}>
                    </CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography variant="body2" color="textSecondary" component="p">
                    IDR {product.price}K
                  </Typography>
                  <Button size="small" color="primary"
                    onClick={() => addToCartHandler(product)}
                  >Add to card</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  )
}


export async function getServerSideProps() {
 await db.connect();
 const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj)
    }
  }

}

