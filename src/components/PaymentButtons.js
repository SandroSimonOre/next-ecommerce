import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

// This values are the props in the UI
// const amount = "2";
// const currency = "USD";
//const style = {"layout":"vertical"};

// Custom component to wrap the PayPalButtons and handle currency changes
export const PaymentButtons = ({ currency, amount, disabled, showSpinner, style }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={disabled}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                
                createOrder={async (data, actions) => {
                    
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then(orderId => {
                            // Your code here after create the order
                            console.log('createOrder:', data)
                            return orderId;
                        });
                }}

                onCancel={(data) => console.log("compra cancelada", data)}

                onApprove={ async (data, actions) => {
                    //actions.order.capture();
                    return actions.order.capture().then(() => {
                        // Your code here after capture the order
                        console.log("onApprove:", data)
                    });
                }}
            />
        </>
    );
}
