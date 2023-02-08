import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
//import { useForm } from 'react-hook-form';
//import Cookies from 'js-cookie';
import PaypalButton from '../components/PaypalButton';
import { Layout } from '../components/Layout';
import { setPaymentMethod } from '../features/cart/cartSlice';
import { IdentificationForm } from '../components/IdentificationForm';
import { ShippingForm } from '../components/ShippingForm';

import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setIdentification } from '../features/cart/cartSlice';



export default function CheckoutPage() {

    const [ editingShipping, setEditingShipping ] = useState(true)

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(0);
    const deliveryInfo = useSelector( state => state.cart.deliveryInfo);

    const {register, handleSubmit, formState: { errors }} = useForm();
    const dispatch = useDispatch();
    const identification = useSelector( state => state.cart.identification);
    const {firstName, lastName, city, address, postalCode} = identification; 

    /* const handleChangingStep = (step)=> {
        setActiveStep(step)
    } */

    const onSubmitShipping = (e) => {
        //e.preventDefault();
        //setActiveStep(2)
    };

    const onSubmitDelivery = (e) => {
        //e.preventDefault();
        //setActiveStep(2)
    };

    return (
    <Layout title="Payment Method">
    
        <div className="flex gap-4 mx-auto w-4/5 mt-8">
            <div className="w-2/3"> { /* Steps */}
    
                <div className='flex justify-between border-2 mb-6 px-8 relative'>
                    <h3 className='mx-auto'>Order detail</h3>
                    <div className='absolute invisible'>
                        <p>Item 1</p>
                        <p>Item 2</p>
                        <p>Item 3</p>
                    </div>
                    
                </div>

                {/* SHIPPING */}
                <div className='flex flex-col justify-between border-2 py-4 px-8 mb-8'>
                    <h3>Shipping</h3>
                    <form 
                        className="grid grid-cols-2 gap-4"
                        onSubmit={handleSubmit(onSubmitShipping)}
                    >   
                        
                        <div className="mb-4"> {/** First Name */}
                            <input
                                readOnly={editingShipping}
                                className='w-full'
                                id="firstName"
                                placeholder="First Name"
                                {...register("firstName", {
                                    required : 'Please enter first name.',
                                    maxLength: 20})
                                }
                                defaultValue={firstName}
                            />
                            <div className="text-red-500">{errors?.firstName?.message}</div>
                        </div>

                        <div> {/** Last Name */}
                            <input
                                className='w-full'
                                id="lastName"
                                placeholder="Last Name"
                                {...register("lastName", {
                                    required : 'Please enter last name.',
                                    maxLength: 20})
                                }
                                defaultValue={lastName}
                            />
                            <div className="text-red-500">{errors?.lastName?.message}</div>

                        </div>

                        <div className="mb-4 w-full col-span-2"> {/** Address */}
                            <input
                                className='w-full'
                                id='address'
                                placeholder='Address' 
                                {...register("address", {
                                    required:'Please enter your address.',
                                    maxLength: 20 
                                })} 
                                defaultValue={address}
                            />
                            {errors.address && (
                                <div className="text-red-500">{errors.address.message}</div>
                            )}
                        </div>
                    
                        <div className="mb-4"> {/** City */}
                                <input
                                    className='w-full'
                                    {...register("city", {
                                        required:'Please enter your city.',
                                        maxLength: 20
                                    })}
                                    placeholder='City'
                                    defaultValue={city}
                                />
                                {errors.city && (
                                    <div className="text-red-500">{errors.city.message}</div>
                                )}
                        </div>

                        <div className="mb-4"> {/** Postal Code */}
                            <input
                                className='w-full'
                                placeholder='Postal Code'
                                {...register("postalCode", {
                                    required: 'Please enter your postal code.'
                                })}
                                defaultValue={postalCode}
                            />
                            {errors.postalCode && (
                                <div className="text-red-500">{errors.postalCode.message}</div>
                            )}
                        </div>

                        <div> {/** Edit */}
                            <a className='underline color text-blue-600' href="#">Edit</a>
                        </div>
                        
                        <div className='mb-4 flex justify-end'> {/** Button continue */}
                            <button className='primary-button'>Continue</button>
                        </div>
                    
                    </form>

                </div>
                                    
                {/** DELIVERY */}
                <div className='flex flex-col justify-between border-2 py-4 px-8 mb-8'>
                    <h3>Delivery</h3>
                    <form 
                        className="grid grid-cols-2 gap-4"
                        onSubmit={handleSubmit(onSubmitDelivery)}
                    >   
                        
                        <div className='flex col-span-2 border-2 rounded-lg p-3'>
                            <input
                                className='text-left'
                                name='deliveryMode' 
                                id='express'
                                type="radio" 
                            />
                            <label className='ml-3' htmlFor="express">Express</label>
                        </div>

                        <div className='flex col-span-2 border-2 rounded-lg p-3'>
                            <input 
                                className=''
                                name='deliveryMode'
                                id='normal' 
                                type="radio" 
                            />
                            <label className='ml-3' htmlFor="standard">Standard <span>2 hours </span><span>$ 5.00 </span> </label>
                        </div>

                        <div className='flex col-span-2 border-2 rounded-lg p-3'>
                            <input 
                                className=''
                                name='deliveryMode'
                                id='economic' 
                                type="radio" 
                            />
                            <label className='ml-3' htmlFor="economic">Economic</label>
                        </div>
                        
                        <div> {/** Edit */}
                            <a className='underline color text-blue-600' href="#">Edit</a>
                        </div>
                        
                        <div className='mb-4 flex justify-end'> {/** Button continue */}
                            <button className='primary-button'>Continue</button>
                        </div>
                    
                    </form>

                </div>
                
            </div>

            <div className="w-1/3 px-8"> {/* Order Summary */}
                <h2 className="font-bold h-12 text-2xl">Order Summary</h2>
                
                <div className="flex justify-between h-8">
                    <span>Subtotal:</span>
                    <span className="text-right">
                        {/* {(items.reduce((a, c) => a + c.quantity * c.price, 0)).toFixed(2)} */}
                        0.00
                    </span>
                </div>
                <div className="flex justify-between h-8">
                    <span>Shipment:</span>
                    <span className="text-right">0.00</span>
                </div>
                <div className="flex justify-between h-8">
                    <span>Taxes:</span>
                    <span className="text-right">0.00</span>
                </div>
                <div className="flex justify-between h-12 border-t-2 font-bold">
                    <span>Total:</span>
                    <span className="text-right">
                        {/* $ {(items.reduce((a, c) => a + c.quantity * c.price, 0)).toFixed(2)} */}
                        0.00
                    </span>
                </div>
                <div>
                    <button
                        className="primary-button w-3/5 mx-auto block" 
                        //onClick={()=>router.push('login?redirect=/checkout')}
                        //onClick={()=>router.push('checkout')}
                        //onClick={()=>router.push('/login?redirect=/checkout')}
                    >
                        Place order
                    </button>
                </div>
            </div>
        </div>
    </Layout>
  );
}