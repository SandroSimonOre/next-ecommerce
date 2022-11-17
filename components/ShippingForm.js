import { useForm } from 'react-hook-form';

export const ShippingForm = ({setActiveStep})=> {
    const {register, handleSubmit} = useForm();
    
    const onSubmit = () => {
        
        setActiveStep(3)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Only for testing purposes */}
            <input {...register("firstName")} />
                
            <input type="submit" />
            {/* Only for testing purposes */}
        </form>
    )

}