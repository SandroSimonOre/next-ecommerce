import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
//import Cookies from 'js-cookie';

import { Layout } from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentMethod } from '../features/cart/cartSlice';

export default function CheckoutPage() {

    const [activeStep, setActiveStep] = useState(1);
    
  return (
    <Layout title="Payment Method">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className=''>
                <div className='flex justify-between border-2 border-gray-100'>
                    <h3>Address</h3>
                    <p>Edit</p>
                </div>
                { 
                    activeStep === 1 &&
                        <div>
                            <form action="">
                                <input type="submit" value="Continue" />
                            </form>
                        </div>

                }
                
                <div className='flex justify-between border-2 border-gray-100'>
                    <h3>Shipping</h3>
                    <p>Edit</p>
                </div>
                { 
                    activeStep === 2 &&
                        <div>
                            <form action="">
                                <input type="submit" value="Continue" />
                            </form>
                        </div>

                }
                
                <div className='flex justify-between border-2 border-gray-100'>
                    <h3>Payment</h3>
                    <p>Edit</p>
                </div>
                <div>
                {
                    activeStep === 3 &&
                    <>
                       <div>
                        <h2>CashOnDelivery</h2>
                        <form action="">
                            <input type="submit" value="Continue" />
                        </form>
                        </div>
                        <div>
                            <h2>Paypal</h2>
                            <form action="">
                                <input type="submit" value="Continue" />
                            </form>    
                        </div>
                        <div>
                            <h2>Stripe</h2>  
                            <form action="">
                                <input type="submit" value="Finish" />
                            </form>    
                        </div>
                    </>
                }
                    
                </div>
            </div>

            <div>
                <h2>Summary</h2>
                <form action="">
                    <input type="submit" />
                </form>
            </div>
        </div>
    </Layout>
  );
}