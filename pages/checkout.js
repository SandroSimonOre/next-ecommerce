import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
//import { useForm } from 'react-hook-form';
//import Cookies from 'js-cookie';
import PaypalButton from '../components/PaypalButton';
import { Layout } from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentMethod } from '../features/cart/cartSlice';
import { IdentificationForm } from '../components/IdentificationForm';
import { ShippingForm } from '../components/ShippingForm';
export default function CheckoutPage() {

    
    const [activeStep, setActiveStep] = useState(2);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);

    const handleChangingStep = (step)=> {
        setActiveStep(step)
    }

    const handleSubmitIdentification = (e) => {
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
                    <h3>IDENTIFICATION</h3>
                    {
                        activeStep !== 1 &&
                            <p onClick={()=> handleChangingStep(1)}>Edit</p>
                    }
                </div>
                { 
                    activeStep === 1 &&
                        <div className='border-2 border-red-800'>
                            <IdentificationForm setActiveStep={setActiveStep} />
                        </div>

                }
                
                <div className='flex justify-between border-2 border-blue-800'>
                    <h3>SHIPPING</h3>
                    {
                        activeStep !== 2 &&
                            <p onClick={()=> handleChangingStep(2)}>Edit</p>
                    }
                    
                </div>
                { 
                    activeStep === 2 &&
                        <div className='h-60 border-2 border-blue-800'>
                            <ShippingForm setActiveStep={setActiveStep}/>
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
                        
                        <PaypalButton />
                        
                    </div>
                }
                    
                
            </div>

        </div>
    </Layout>
  );
}