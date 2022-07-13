import React, { useState, useContext } from "react";
import { useRouter } from 'next/router';
import Head from "next/head";
import { AppBar, Toolbar, Typography, Container, Link, createMuiTheme, ThemeProvider, CssBaseline, Switch, Badge, Button, Menu, MenuItem } from "@material-ui/core";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import { Store } from "../utils/store";
import Cookies from "js-cookie";


const Layout = ({ title, description, children }) => {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { darkMode, cart, userInfo } = state;
    const theme = createMuiTheme({
        typography: {
            h1: {
                fontSize: "1.6rem",
                fontWeight: "400",
                margin: '1rem 0',
                fontFamily: 'Poppins',
            },
            h2: {
                fontSize: "1.4rem",
                fontWeight: "400",
                margin: '1rem 0',
            },
            h6: {
                fontSize: "1.6rem",
                fontWeight: "bold",

            }
        },
        palette: {
            type: darkMode ? "dark" : "light",
            primary: {
                main: "#00bcd4",
            },
            secondary: {
                main: "#ff4081",
            }
        }

    });
    const classes = useStyles();
    const darkModeChangeHandler = () => {

        dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
        const newDarkMode = !darkMode;
        Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const loginClickHandler = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const loginMenuCloseHandler = (e, redirect) => {
        setAnchorEl(null);
        if (redirect) {
          router.push(redirect);
        }
      };
    const logoutClickHandler = () => {
        setAnchorEl(null);
        dispatch({ type: 'USER_LOGOUT' });
        Cookies.remove('userInfo');
        Cookies.remove('cartItems');
        Cookies.remove('shippingAddress');
        Cookies.remove('paymentMethod');
        router.push('/');
    }

    return (
        <>
            <Head>

                <title>{title ? `${title} - In Shop` : 'In Shop'}</title>
                {description && <meta name="description" content={description} />}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" className={classes.navbar}>
                    <Toolbar className={classes.toolbar}>
                        <NextLink href="/" passHref>
                            <Link>

                                <Typography className={classes.brand} variant="h6" component="h6" color="primary">
                                    _inSHOP
                                </Typography>
                            </Link>
                        </NextLink>
                        <div className={classes.grow}></div>
                        <div className={classes.AppBar}>
                            <Switch checked={darkMode} size="small"
                                onChange={darkModeChangeHandler}></Switch>
                            <NextLink href="/cart" passHref>
                                <Link>
                                    {cart.cartItems.length > 0 ? (
                                        <Badge color="primary" badgeContent={cart.cartItems.length}>Cart</Badge>
                                    ) : (
                                        "Cart"
                                    )}
                                </Link>
                            </NextLink>
                            {userInfo ? (
                                <>
                                    <Button  aria-controls="simple-menu" aria-haspopup="true" onClick={loginClickHandler} className={classes.navbarButton}>
                                        {userInfo.name}
                                    </Button>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={loginMenuCloseHandler}
                                    >
                                        <MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
                                        <MenuItem onClick={loginMenuCloseHandler}>My account</MenuItem>
                                        <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <NextLink href="/login" passHref>
                                    <Link>
                                        Login
                                    </Link>
                                </NextLink>
                            )}

                        </div>
                    </Toolbar>

                </AppBar>
                <Container className={classes.main}>
                    {children}
                </Container>
                <footer className={classes.footer}>
                    <Typography >Allright Reserve © In Shop - 2022</Typography>
                </footer>
            </ThemeProvider>
        </>
    )
}


export default Layout



