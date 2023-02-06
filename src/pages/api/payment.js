import paypal from "@paypal/checkout-server-sdk";
import dbConnect from '../../utils/db';
import Product from '../../models/Product'; // THIS IS TEMPORARY
// Creating an environment
let clientId = process.env.CLIENT_ID;
let clientSecret = process.env.CLIENT_SECRET;

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default async function handler(req, res) {
  await  dbConnect();
  console.log('hello') // ONLY FOR TEST
  console.log(req.body) // ONLY FOR TEST

  // THIS BLOCK IS TEMPORARY TOO
  const newProduct = new Product({
    title: 'new product',
    slug: 'sssss',
    description: 'new product',
    price: '10',
    rating: '5',
    brand: 'new',
    category: 'nuevecito',
    thumbnail: 'llll',
    image: 'bbbbb'
});

await newProduct.save()

  //

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