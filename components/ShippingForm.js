import { useForm } from 'react-hook-form';
import { useState } from 'react';

export const ShippingForm = ({setActiveStep})=> {
    
    const {register, handleSubmit} = useForm();
    const [ deliveryMode, setDeliveryMode ] = useState();

    const onSubmit = () => {
        
        setActiveStep(3)
    }
    return (
        <form 
            className='mx-auto max-w-screen-md'
            onSubmit={handleSubmit(onSubmit)}
        >

            <div className='flex justify-evenly'>
                {
                    [
                        {'id': 1, 'title': 'Recojo en tienda'},
                        {'id': 2, 'title': 'Envío a domicilio'}
                    ].map((e) => (

                        <div key={e.id}>
                            <input 
                                name='deliveryMode'
                                className='p-2 outline-none focus:ring-0' 
                                id={e.id} 
                                type="radio"
                                checked={deliveryMode === e.id}
                                onChange={()=>setDeliveryMode(e.id)}
                            />
                            <label htmlFor='deliveryMode' >{e.title}</label>
                        </div>
                    ))
                }

            </div>
            
            
                {   
                    deliveryMode === 1 &&
                    <div>
                        <h5>Seleccione una tienda</h5>
                        
                            <select 
                                {...register("store")}
                                className='w-80'
                            >
                            {
                                [
                                    {'id': 1,'name': 'La Cultura', 'address': 'Av. Javier Prado'},
                                    {'id': 2,'name': 'Centro Cívico', 'address': 'Av. Abancay'},
                                    {'id': 3,'name': 'Plaza Lima Sur', 'address': 'Defensores del Morro'},
                                    
                                ].map( e => (
                                    <option value={e.id}>{e.name} - {e.address}</option>
                                ))
                            }
                            </select>
                        
                    </div>
                }
            
            
            {
                deliveryMode === 2 &&
                <div>
                    <h3>Envío a domicilio</h3>
                </div>
            }

            <div className="mb-4 flex justify-between">
                <button className="primary-button">Continue</button>
            </div>

            
        </form>
    )

}