import paypal from "@paypal/checkout-server-sdk";
// Creating an environment
let clientId = "AZwlIYrIDRHc53VOQEK6yMUGEvJnO6Chvzep2UaObBMrsaul9aK-ceIdo0RYLDmW2Dq6Ia5OjgJJCDhL";
let clientSecret = "EOWSfBT3R6qhO9hD_QcoEGbk6FlrIIChIEzVl_1XpMyMtnOScLqUDllCOxBx_5B98aL7tleuwCh2jj98";

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "100.00",
          },
        },
      ],
    });
    const response = await client.execute(request);

    return res.json({ id: response.result.id });
  }
}