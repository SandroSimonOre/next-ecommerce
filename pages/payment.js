import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
//import Cookies from 'js-cookie';

import { Layout } from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentMethod } from '../features/cart/cartSlice';


export default function PaymentPage() {

    //const paymentMethod = useSelector( state => state.cart.paymentMethod);
    //const shippingAddress = useSelector( state => state.cart.shippingAddress);
    const {shippingAddress, paymentMethod} = useSelector( state => state.cart );
    //console.log(shippingAddress)
    //console.log('shippingAddress', shippingAddress);
    const dispatch = useDispatch();

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    //const { state, dispatch } = useContext(Store);
    //const { cart } = state;
    //const { shippingAddress, paymentMethod } = cart;

    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();
        if (!selectedPaymentMethod) {
        return toast.error('Payment method is required');
        }
        dispatch( setPaymentMethod(selectedPaymentMethod) );
    /* Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    ); */

    router.push('/placeOrder');
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Payment Method">
      
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />

            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push('/shipping')}
            type="button"
            className="default-button"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}