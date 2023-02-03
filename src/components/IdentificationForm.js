import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setIdentification } from '../features/cart/cartSlice';

export const IdentificationForm = ({setActiveStep})=> {

    const {register, handleSubmit, formState: { errors }} = useForm();
    const dispatch = useDispatch();
    const identification = useSelector( state => state.cart.identification);
    const {fullName, city, address, postalCode} = identification; 

    const onSubmit = (data) => {
        dispatch(setIdentification(data))
        setActiveStep(2)
    }
    
    return (
        <form 
            className='mx-auto max-w-screen-md'
            onSubmit={handleSubmit(onSubmit)}
        >   
            <label htmlFor="city">Full Name</label>
            <div className="mb-4">
                <input
                    className='w-full'
                    id="fullName"
                    {...register("fullName", {
                        required : 'Please enter full name.',
                        maxLength: 20}) }
                    defaultValue={fullName}
                />
                <div className="text-red-500">{errors?.fullName?.message}</div>
                
            </div>

            <label htmlFor="city">Address</label>
            <div className="mb-4">
                <input
                    className='w-full' 
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
            
            <label htmlFor="city">City</label>
            <div className="mb-4">
                <input
                    className='w-full'
                    {...register("city", {
                        required:'Please enter your city.',
                        maxLength: 20
                    })}
                    defaultValue={city}
                />
                {errors.city && (
                    <div className="text-red-500">{errors.city.message}</div>
                )}
            </div>

            <label htmlFor="postalCode">Postal Code</label>
            <div className="mb-4">
                <input
                    {...register("postalCode", {
                        required: 'Please enter your postal code.'
                    })}
                    defaultValue={postalCode}
                />
                {errors.postalCode && (
                    <div className="text-red-500">{errors.postalCode.message}</div>
                )}
            </div>
            <div className='mb-4 flex justify-end'>
                <button className='primary-button'>Continue</button>
            </div>
            
        </form>
    )

}