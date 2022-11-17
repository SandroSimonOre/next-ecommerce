import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setIdentification } from '../features/cart/cartSlice';

export const IdentificationForm = ({setActiveStep})=> {

    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const identification = useSelector( state => state.cart.identification);
    const {firstName, lastName, email, address} = identification; 

    const onSubmit = (data) => {
        dispatch(setIdentification(data))
        setActiveStep(2)
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <input {...register("firstName", {required : true, maxLength: 20}) } defaultValue={firstName} />
            <input {...register("lastName", {required : true, maxLength: 20})} defaultValue={lastName}/>                
            <input {...register("email")} type='email' defaultValue={email} />
            <input {...register("address")} defaultValue={address}/>
            <input type="submit" value='Continue' />
            
        </form>
    )

}