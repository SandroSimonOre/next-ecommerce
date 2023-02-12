import React, { useState } from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Layout } from '../components/Layout';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setShippingInfo, setDeliveryMode } from '../features/cart/cartSlice';
import { PaymentButtons } from '../components/PaymentButtons';
import { getServerSession } from "next-auth/next";
import { authOptions } from './api/auth/[...nextauth]';

export default function CheckoutPage() {

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
    const deliveryMode = useSelector(state => state.cart.deliveryMode);
    const items = useSelector( state => state.cart.items)
    
    if (items.length === 0) return <Layout> <h1>There is no item in the cart</h1> </Layout>

    const {firstName, lastName, city, address, postalCode} = shippingInfo; 
    
    const [ shippingReadOnly, setShippingReadOnly ] = useState(Object.keys(shippingInfo).length > 0)
    const [ deliveryReadOnly, setDeliveryReadOnly ] = useState(deliveryMode !== "")

    const onSubmitShipping = data => {
        //console.log(data)
        dispatch(setShippingInfo(data))
        setShippingReadOnly(true)
    };

    const onSubmitDelivery = data => {
        //console.log(data)
        dispatch(setDeliveryMode(data))
        setDeliveryReadOnly(true)
    };

    return (
        <Layout title="Payment Method">
            
                <div className="flex gap-4 mx-auto w-4/5 mt-8">

                    <div className="w-2/3">
                        
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
                        <div className='flex flex-col justify-between border-2 py-4 px-8 mb-8'>
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
                        <div className='flex flex-col justify-between border-2 py-4 px-8 mb-8'>
                            <h3 className="text-2xl font-bold mb-3">2. Delivery mode</h3>
                            <form 
                                className="grid grid-cols-2 gap-4"
                                onSubmit={handleSubmitDelivery(onSubmitDelivery)}
                            >   
                                
                                <div className='flex col-span-2 border-2 rounded-lg p-3 mb-4'>
                                    <input
                                        disabled={deliveryReadOnly}
                                        className="focus:ring-0"
                                        name='deliveryMode' 
                                        id='express'
                                        type="radio" 
                                        value="express"
                                        defaultChecked={deliveryMode === "express"}
                                        required
                                        {...registerDelivery("deliveryMode")}
                                    />
                                    <label 
                                        className={`ml-3 ${deliveryReadOnly ? 'text-gray-400': ''}`} 
                                        htmlFor="express"
                                    >
                                        Express
                                    </label>
                                </div>

                                <div className='flex col-span-2 border-2 rounded-lg p-3 mb-4'>
                                    <input 
                                        disabled={deliveryReadOnly}
                                        className="focus:ring-0"
                                        name='deliveryMode'
                                        id='standard' 
                                        type="radio"
                                        value="standard"
                                        defaultChecked={deliveryMode === "standard"}
                                        required 
                                        {...registerDelivery("deliveryMode")}
                                    />
                                    <label 
                                        className={`ml-3 ${deliveryReadOnly ? 'text-gray-400': ''}`} 
                                        htmlFor="standard"
                                    >
                                        Standard <span>2 hours </span><span>$ 5.00 </span>
                                    </label>
                                </div>

                                <div className='flex col-span-2 border-2 rounded-lg p-3 mb-4'>
                                    <input 
                                        disabled={deliveryReadOnly}
                                        className="focus:ring-0"
                                        name='deliveryMode'
                                        id='economy' 
                                        type="radio"
                                        value="economy"
                                        defaultChecked={deliveryMode === "economy"}
                                        required 
                                        {...registerDelivery("deliveryMode")}
                                    />
                                    <label 
                                        className={`ml-3 ${deliveryReadOnly ? 'text-gray-400': ''}`} 
                                        htmlFor="economy"
                                    >
                                        Economy
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
                    <div className="w-1/3 p-8 border-2 h-fit sticky top-4"> 
                        
                        <h2 className="font-bold h-12 text-2xl">Order Summary</h2>
                        
                        <div className="flex justify-between h-8">
                            <span>Subtotal:</span>
                            <span className="text-right">
                                {(items.reduce((a, c) => a + c.quantity * c.price, 0)).toFixed(2)}
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
                                $ {(items.reduce((a, c) => a + c.quantity * c.price, 0)).toFixed(2)}
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
                                    disabled={items.length === 0 || Object.keys(shippingInfo).length === 0 || !deliveryMode}
                                    showSpinner={false}
                                    style={{"layout":"vertical"}}
                                />
                            </PayPalScriptProvider>
                        </div>
                    </div>
                </div>
            
        </Layout>
    );
}

export async function getServerSideProps(context) {

    const session = await getServerSession(context.req, context.res, authOptions)
    
    if (!session) {
        return { redirect: { destination: '/login', permanent: false, } }
    }

    return { props: { sessionInfo: JSON.parse(JSON.stringify(session)),},}
}