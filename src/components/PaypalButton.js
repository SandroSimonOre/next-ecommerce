import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

export default function PaypalButton() {
  return (
    <div className=''>
        <PayPalScriptProvider
            options={{
                "client-id": 'AZwlIYrIDRHc53VOQEK6yMUGEvJnO6Chvzep2UaObBMrsaul9aK-ceIdo0RYLDmW2Dq6Ia5OjgJJCDhL',
            }}
        >
        <PayPalButtons
          createOrder={async () => {
            try {
              const res = await axios({
                url: "/api/payment",
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                data: {
                  foo: 'bar', // This is the body part
                }
              });
              return res.data.id;
            } catch (error) {
              console.log(error);
            }
          }}
          onCancel={(data) => console.log("compra cancelada")}
          onApprove={(data, actions) => {
            console.log(data);
            actions.order.capture();
          }}
          style={{ layout: "horizontal", color: "blue" }}
        />
      </PayPalScriptProvider>
    </div>
  );
}