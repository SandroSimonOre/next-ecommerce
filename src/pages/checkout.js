import React, { useState } from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Layout } from '../components/Layout';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setShippingInfo, setDeliveryInfo } from '../features/cart/cartSlice';
import { PaymentButtons } from '../components/PaymentButtons';
import { getServerSession } from "next-auth/next";
import { authOptions } from './api/auth/[...nextauth]';

export default function CheckoutPage() {

    // Maybe this info shoud come from a database
    const shipmentCost = {'express': 10, 'standard': 6, 'economy': 2}

    const {
            register: registerShipping, 
            handleSubmit: handleSubmitShipping, 
            formState: { errors: errorsShipping }
    } = useForm();

    const {
        register: registerDelivery, 
        handleSubmit: handleSubmitDelivery, 
        //formState: { errors: errorsDelivery }
    } = useForm();


    const dispatch = useDispatch();
    const shippingInfo = useSelector(state => state.cart.shippingInfo);
    const deliveryInfo = useSelector(state => state.cart.deliveryInfo);
    const items = useSelector( state => state.cart.items)

    const {firstName, lastName, city, address, postalCode} = shippingInfo; 
    
    const [ shippingReadOnly, setShippingReadOnly ] = useState(Object.keys(shippingInfo).length > 0)
    const [ deliveryReadOnly, setDeliveryReadOnly ] = useState(Object.keys(deliveryInfo).length > 0)

    if (items.length === 0) return <Layout> <h1>There is no item in the cart</h1> </Layout>

    const onSubmitShipping = data => {
        //console.log(data)
        dispatch(setShippingInfo(data))
        setShippingReadOnly(true)
    };

    const onSubmitDelivery = data => {
        const cost = shipmentCost[data.mode]
        data = {...data, cost: Number(cost)}
        console.log(data)
        dispatch(setDeliveryInfo(data))
        setDeliveryReadOnly(true)
    };

    return (
        <Layout title="Payment Method">
            
                <div className="flex flex-col md:flex-row gap-4 mx-auto md:w-4/5 mt-8">

                    <div className="md:w-2/3">
                        
                        {/** YOUR ITEMS */}
                        <div className='flex justify-between border-2 mb-6 relative group'>
                            <h3 className='mx-auto'>Order detail</h3>
                            <div className='absolute invisible group-hover:visible top-8 z-10 bg-white text-sm border-2'>
                            
                                <div  className="grid grid-cols-12 items-center px-2 bg-gray-200">
                                    <span className="col-span-7">Detail</span>
                                    <span className="col-span-2">Format</span>
                                    <span className="">Qty</span>
                                    <span className="">Price</span>
                                    <span className="text-right pr-8">Subtotal</span>
                                </div>
                            
                                {
                                    items.map(i => (
                                        <div key= {i._id} className="grid grid-cols-12 items-center px-2">
                                            
                                            <span className="col-span-7"> {/** Detail */}
                                                <p className="whitespace-nowrap overflow-hidden text-ellipsis w-full">{i.title}</p>
                                                
                                            </span>
                                            <span className="col-span-2"> {/** Format */}
                                                <p>{i.format}</p>
                                            </span>

                                            <span className="text-right"> {/** Quantity */}
                                                {i.quantity}
                                            </span>
                                            <span className="text-right"> {/** Unit. Price */}
                                            {i.price.toFixed(2)}
                                            </span>

                                            <span className="text-right">
                                                {(i.price * i.quantity).toFixed(2)}
                                            </span>

                                            
                                        </div>
                                    ))
                                }
                            </div>
                            
                        </div>

                        {/* SHIPPING */}
                        <div className='flex flex-col justify-between border-2 py-4 px-4 md:px-8 mb-8'>
                            <h3 className="text-2xl font-bold mb-3">1. Shipping info</h3>
                            <form 
                                className="grid grid-cols-2 gap-4"
                                onSubmit={handleSubmitShipping(onSubmitShipping)}
                            >   
                                {/** First Name */}
                                <div className="mb-4"> 
                                    <input
                                        readOnly={shippingReadOnly}
                                        disabled={shippingReadOnly}
                                        className="w-full focus:ring-0"
                                        id="firstName"
                                        placeholder="First Name"
                                        {...registerShipping("firstName", {
                                            required : 'Please enter first name.',
                                            maxLength: 20})
                                        }
                                        defaultValue={firstName}
                                    />
                                    <div className="text-red-500">{errorsShipping?.firstName?.message}</div>
                                </div>
                                
                                {/** Last Name */}
                                <div> 
                                    <input
                                        readOnly={shippingReadOnly}
                                        disabled={shippingReadOnly}
                                        className="w-full focus:ring-0"
                                        id="lastName"
                                        placeholder="Last Name"
                                        {...registerShipping("lastName", {
                                            required : 'Please enter last name.',
                                            maxLength: 20})
                                        }
                                        defaultValue={lastName}
                                    />
                                    <div className="text-red-500">{errorsShipping?.lastName?.message}</div>

                                </div>

                                {/** Address */}
                                <div className="mb-4 w-full col-span-2"> 
                                    <input
                                        readOnly={shippingReadOnly}
                                        disabled={shippingReadOnly}
                                        className="w-full focus:ring-0"
                                        id='address'
                                        placeholder='Address' 
                                        {...registerShipping("address", {
                                            required:'Please enter your address.',
                                            maxLength: 20 
                                        })} 
                                        defaultValue={address}
                                    />
                                    {errorsShipping.address && (
                                        <div className="text-red-500">{errorsShipping?.address?.message}</div>
                                    )}
                                </div>
                                
                                {/** City */}
                                <div className="mb-4"> 
                                    <input
                                        className="w-full focus:ring-0"
                                        readOnly={shippingReadOnly}
                                        disabled={shippingReadOnly}
                                        {...registerShipping("city", {
                                            required:'Please enter your city.',
                                            maxLength: 20
                                        })}
                                        placeholder='City'
                                        defaultValue={city}
                                    />
                                    {errorsShipping.city && (
                                        <div className="text-red-500">{errorsShipping.city.message}</div>
                                    )}
                                </div>

                                {/** Postal Code */}
                                <div className="mb-4"> 
                                    <input
                                        readOnly={shippingReadOnly}
                                        disabled={shippingReadOnly}
                                        className="w-full focus:ring-0"
                                        placeholder='Postal Code'
                                        {...registerShipping("postalCode", {
                                            required: 'Please enter your postal code.'
                                        })}
                                        defaultValue={postalCode}
                                    />
                                    {errorsShipping.postalCode && (
                                        <div className="text-red-500">{errorsShipping.postalCode.message}</div>
                                    )}
                                </div>

                                {/** Edit */}
                                <div>
                                    {
                                        shippingReadOnly && 
                                            <span 
                                                className='underline color text-blue-600 cursor-pointer col-span-1'
                                                onClick={()=> setShippingReadOnly(false)}
                                            >
                                                Edit
                                            </span>
                                            
                                    }
                                </div>
                                
                                {/** Button continue */}
                                <div className='mb-4 flex justify-end'>
                                    <button
                                        className='secondary-button'
                                        disabled={false}
                                    >
                                            Continue
                                    </button>
                                </div>
                            
                            </form>
                        </div>
                                            
                        {/** DELIVERY */}
                        <div className='flex flex-col justify-between border-2 py-4 px-4 md:px-8 mb-8'>
                            <h3 className="text-2xl font-bold mb-3">2. Delivery mode</h3>
                            <form 
                                className="grid grid-cols-2 gap-4"
                                onSubmit={handleSubmitDelivery(onSubmitDelivery)}
                            >   
                                
                                <div className='flex col-span-2 border-2 rounded-lg p-3 mb-4'>
                                    <input
                                        disabled={deliveryReadOnly}
                                        className="focus:ring-0"
                                        name='mode' 
                                        id='express'
                                        type="radio" 
                                        value="express"
                                        defaultChecked={deliveryInfo?.mode === "express"}
                                        required
                                        {...registerDelivery("mode")}
                                    />
                                    <label 
                                        className={`ml-3 ${deliveryReadOnly ? 'text-gray-400': ''}`} 
                                        htmlFor="express"
                                    >
                                        Express (The same day): <span className='font-bold pl-2'>$ 10.00</span>
                                    </label>
                                </div>

                                <div className='flex col-span-2 border-2 rounded-lg p-3 mb-4'>
                                    <input 
                                        disabled={deliveryReadOnly}
                                        className="focus:ring-0"
                                        name='mode'
                                        id='standard' 
                                        type="radio"
                                        value="standard"
                                        defaultChecked={deliveryInfo?.mode === "standard"}
                                        required 
                                        {...registerDelivery("mode")}
                                    />
                                    <label 
                                        className={`ml-3 ${deliveryReadOnly ? 'text-gray-400': ''}`} 
                                        htmlFor="standard"
                                    >
                                        Standard (2 - 4 days): <span className='font-bold pl-2'>$ 6.00 </span>
                                    </label>
                                </div>

                                <div className='flex col-span-2 border-2 rounded-lg p-3 mb-4'>
                                    <input 
                                        disabled={deliveryReadOnly}
                                        className="focus:ring-0"
                                        name='mode'
                                        id='economy' 
                                        type="radio"
                                        value="economy"
                                        defaultChecked={deliveryInfo?.mode === "economy"}
                                        required 
                                        {...registerDelivery("mode")}
                                    />
                                    <label 
                                        className={`ml-3 ${deliveryReadOnly ? 'text-gray-400': ''}`} 
                                        htmlFor="economy"
                                    >
                                        Economy (5 - 15 days): <span className='font-bold pl-2'>$ 2.00 </span>
                                    </label>
                                </div>
                                
                                {/** Edit */}
                                <div>
                                    {
                                        deliveryReadOnly && 
                                        <span 
                                            className='underline color text-blue-600 cursor-pointer col-span-1'
                                            onClick={()=> setDeliveryReadOnly(false)}
                                        >
                                            Edit
                                        </span>       
                                    }
                                </div>
                                
                                {/** Button continue */}
                                <div 
                                    className='mb-4 flex justify-end'
                                >
                                    <button className='secondary-button' disabled={false}>
                                        Continue
                                    </button>
                                </div>
                            
                            </form>

                        </div>
                        
                    </div>
                    
                    {/* Order Summary */}
                    <div className="md:w-1/3 p-4 md:p-8 border-2 h-fit sticky top-4"> 
                        
                        <h2 className="font-bold h-12 text-2xl">Order Summary</h2>
                        
                        <div className="flex justify-between h-8">
                            <span>Subtotal:</span>
                            <span className="text-right">
                                {(items.reduce((a, c) => a + c.quantity * c.price, 0)).toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between h-8">
                            <span>Shipment:</span>
                            <span className="text-right">
                                {deliveryInfo?.cost?.toFixed(2) || '0.00'}
                            </span>
                        </div>

                        <div className="flex justify-between h-8">
                            <span>Taxes:</span>
                            <span className="text-right">0.00</span>
                        </div>

                        <div className="flex justify-between h-12 border-t-2 font-bold">
                            <span>Total:</span>
                            <span className="text-right">
                                $ {(items.reduce((a, c) => a + c.quantity * c.price, 0) + (deliveryInfo?.cost || 0)).toFixed(2) }
                            </span>
                        </div>
                        
                        <div>
                           <PayPalScriptProvider
                                options={{
                                    "client-id": process.env.NEXT_PUBLIC_CLIENT_ID,
                                    components: "buttons",
                                    currency: "USD"
                                }}
                            >
                                <PaymentButtons 
                                    currency="USD"
                                    amount={1.20}
                                    disabled={items.length === 0 || Object.keys(shippingInfo).length === 0 || Object.keys(deliveryInfo).length === 0}
                                    showSpinner={false}
                                    style={{"layout":"vertical"}}
                                />
                            </PayPalScriptProvider>
                        </div>

                        <div className='text-red-600 font-bold text-justify'>
                            <p>This application has been created for demo purposes only, so it is not a real bookstore. Do not fill out the Paypal form, please.</p>
                        </div>
                    </div>
                </div>
            
        </Layout>
    );
}

export async function getServerSideProps(context) {

    const session = await getServerSession(context.req, context.res, authOptions)
    
    if (!session) {
        return { redirect: { destination: '/login?redirect=checkout', permanent: false, } }
    }

    return { props: { sessionInfo: JSON.parse(JSON.stringify(session)),},}
}