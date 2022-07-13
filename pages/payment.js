import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Store } from "../utils/store";
import Layout from "../components/layout";
import Checkout from "../components/Checkout";
import useStyles from "../utils/styles";
import {
    Typography,
    List,
    ListItem,
    Radio,
    Button,
    FormControl,
    RadioGroup,
    FormControlLabel,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

export default function Payment() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes = useStyles();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("");
    const { state, dispatch } = useContext(Store);
    const {
        cart: { shippingAddress },
    } = state;

    useEffect(() => {
        if (!shippingAddress.address) {
            router.push("/shipping");
        } else {
            setPaymentMethod(Cookies.get("paymentMethod") || "");
        }
    }, []);

    const submitHandler = (e) => {
        closeSnackbar();
        e.preventDefault();
        if (!paymentMethod) {
            enqueueSnackbar("Please select a payment method", { variant: "error" });
        } else {
            dispatch({
                type: "SAVE_PAYMENT_METHOD",
                payload: paymentMethod,
            });
            Cookies.set("paymentMethod", paymentMethod);
            router.push("placeorder");
        }
    };

    return (
        <>
            <Layout title="Payment Method">
                <Checkout activeStep={2}></Checkout>
                <form className={classes.form} onSubmit={submitHandler}>
                    <Typography component="h1" variant="h1">
                        Payment Method
                    </Typography>
                    <List>
                        <ListItem>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="Payment Method"
                                    name="paymentMethod"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <FormControlLabel
                                        label="Bank Transfer"
                                        value="Bank Transfer"
                                        control={<Radio />}
                                    ></FormControlLabel>
                                    <FormControlLabel
                                        label="Gopay"
                                        value="Gopay"
                                        control={<Radio />}
                                    ></FormControlLabel>
                                    <FormControlLabel
                                        label="OVO"
                                        value="OVO"
                                        control={<Radio />}
                                    ></FormControlLabel>
                                </RadioGroup>
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Continue
                            </Button>
                        </ListItem>
                        <ListItem>
                            <Button
                                fullWidth
                                type="button"
                                variant="contained"
                                onClick={() => router.push("/shipping")}
                            >
                                Back
                            </Button>
                        </ListItem>
                    </List>
                </form>
            </Layout>
        </>
    );
}
