import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import NextLink from "next/link";
import Layout from '../components/layout';
import { Typography, TextField, List, ListItem, Button, Link } from '@material-ui/core';
import useStyles from "../utils/styles";
import axios from 'axios';
import { Store } from '../utils/store';
import Cookies from 'js-cookie';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';




export default function Login() {
  const { handleSubmit, control, formState: { errors }, } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query; //login?redirect=/shipping
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const classes = useStyles();

  const submitHandler = async ({email, password}) => {
    closeSnackbar();
    try {

      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', data);
      router.push(redirect || '/');

    } catch (err) {
      enqueueSnackbar(err.response.data ? err.response.data.message : err.message,
        {
          variant: 'error',
        }
      ) 
     
    }
  };

  return (
    <>
      <Layout title="Login">

        <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
          <Typography component="h1" variant="h1">Login</Typography>
          <List>
            <ListItem>
              <Controller 
              name='email'
              control={control}
              defaultValue=""
              rules={{ 
                required: true, 
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
              }}
                render={({ field }) =>
                <TextField
                  variant="outlined"
                  id="email"
                  label="email"
                  fullWidth
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ?'Email is not valid'
                          :'Email is required':''}
                  {...field}
                  ></TextField>

              }>
              </Controller>
            </ListItem>
            <ListItem>
            <Controller 
              name='password'
              control={control}
              defaultValue=""
              rules={{ 
                required: true, 
                minLength: 6
              }}
                render={({ field }) =>
                <TextField
                  variant="outlined"
                  id="password"
                  label="password"
                  fullWidth
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ?'password length more than 5'
                          :'password is required':''}
                  {...field}
                  ></TextField>

              }>
              </Controller>
            </ListItem>
            <ListItem >
              <Button variant="contained" fullWidth color="primary" type="submit">Login</Button>
            </ListItem>
            <ListItem>
              Don`t have an account? &nbsp; <NextLink href={`/register?redirect=${redirect || '/'} `} passHref><Link>Register</Link></NextLink>
            </ListItem>
          </List>
        </form>

      </Layout>

    </>
  )
}
