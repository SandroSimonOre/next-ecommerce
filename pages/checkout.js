import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
//import Cookies from 'js-cookie';

import { Layout } from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentMethod } from '../features/cart/cartSlice';

export default function CheckoutPage() {

    
    const [activeStep, setActiveStep] = useState(3);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);
    const handleChangingStep = (step)=> {
        setActiveStep(step)
    }

    const handleSubmitIdentificationForm = (e) => {
        //e.preventDefault();
        setActiveStep(2)
    };

    const handleSubmitShipping = (e) => {
        setActiveStep(3);
    };
    
  return (
    <Layout title="Payment Method">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className=''>
                <h2>Summary</h2>
                <h2>Your order detail</h2>
            </div>
            <div className=''>
                <div className='flex justify-between border-2 border-red-800'>
                    <h3>Address</h3>
                    {
                        activeStep !== 1 &&
                            <p onClick={()=> handleChangingStep(1)}>Edit</p>
                    }
                </div>
                { 
                    activeStep === 1 &&
                        <div className='h-60 border-2 border-red-800'>
                            <form action="">
                                <input type="submit" value="Continue" />
                            </form>
                        </div>

                }
                
                <div className='flex justify-between border-2 border-blue-800'>
                    <h3>Shipping</h3>
                    {
                        activeStep !== 2 &&
                            <p onClick={()=> handleChangingStep(2)}>Edit</p>
                    }
                    
                </div>
                { 
                    activeStep === 2 &&
                        <div className='h-60 border-2 border-blue-800'>
                            <form action="">
                                <input type="submit" value="Continue" />
                            </form>
                        </div>

                }
                
                <div className='flex justify-between border-2 border-green-800'>
                    <h3>Payment</h3>
                    {
                        activeStep !== 3 &&
                            <p onClick={()=> handleChangingStep(3)}>Edit</p>    
                    }
                </div>
                
                {
                    activeStep === 3 &&
                    <div className='h-60 border-2 border-green-800'>
                        
                        <div 
                            className='h-30 bg-blue-400'
                            onClick={()=>setSelectedPaymentMethod(1)}
                        >Paypal</div>
                        {
                            selectedPaymentMethod === 1 &&
                                <div>
                                    <h2>Paypal</h2>
                                    <form action="">
                                        <input type="submit" value="Continue" />
                                    </form>    
                                </div>
                                
                        }
                        
                        <div
                            className='h-30 bg-green-400' 
                            onClick={()=>setSelectedPaymentMethod(2)}
                        >Stripe</div>
                        {   
                            selectedPaymentMethod === 2 &&
                            <div>
                                <h2>Stripe</h2>  
                                <form action="">
                                    <input type="submit" value="Finish" />
                                </form>    
                            </div>
                        }

                        <div
                            className='h-30 bg-yellow-400' 
                            onClick={()=>setSelectedPaymentMethod(3)}
                        >Contraentrega</div>
                        {   selectedPaymentMethod === 3 &&
                            
                            <div>
                                <h2>CashOnDelivery</h2>
                                <form action="">
                                    <input type="submit" value="Continue" />
                                </form>
                            </div>
                        }
                        
                    </div>
                }
                    
                
            </div>

        </div>
    </Layout>
  );
}