import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDeliveryInfo } from '../features/cart/cartSlice';

export const ShippingForm = ({setActiveStep})=> {

    const deliveryInfo = useSelector( state => state.cart.deliveryInfo);
    const {store, deliveryMode, deliveryDate} = deliveryInfo; 
    const {register, handleSubmit} = useForm();
    const [ mode, setMode ] = useState(deliveryMode);
    const dispatch = useDispatch();
    
    const onSubmit = (data) => {
        console.log(data)
        dispatch(setDeliveryInfo(data))
        setActiveStep(3)
    }

    const handleChangeMode = (e) => {
        
        setMode(parseInt(e.target.value))
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
                                {...register("deliveryMode")}
                                className='p-2 outline-none focus:ring-0' 
                                id={e.id} 
                                type="radio"
                                value={parseInt(e.id)}
                                checked={e.id === parseInt(mode)}
                                onChange={handleChangeMode}
                                //name=?
                                
                            />
                            <label htmlFor='' >{e.title}</label>
                        </div>
                    ))
                }

            </div>
            
            
                {   
                    parseInt(mode) === 1 &&
                    <>
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

                                    <option key={e.id} value={e.id}>{e.name} - {e.address}</option>
                                ))
                            }
                            </select>
                        
                    </div>
                        <div>
                        <label htmlFor="">DNI / Nombre del Picker (En caso vaya un tercero)</label>
                        <input type="text" />
                        <input type="text" />
                    </div>
                    </>
                }

                
            
            
            {
                parseInt(mode) === 2 &&
                <>
                    <div>
                        <input
                            {...register("deliveryDate")}
                            type="date" 
                            id="delivery-date" 
                            name="deliveryDate" 
                            defaultValue={deliveryDate}
                        />
                            
                    </div>

                    <div>
                        <p>Horarios disponibles</p>
                        {
                            ['8.00 am - 12:00 pm', '12.00 pm - 4:00 pm', '4.00 pm - 8:00 pm'].map( e => (
                                <>
                                    <input 
                                        type='radio'
                                    />
                                    <label>{e}</label>            
                                </>
                        ))}
                        
                    </div>

                    <div>
                        <label htmlFor="">Observaciones</label>
                        <input type="text" />
                    </div>
                </>
            }

            <div className="mb-4 flex justify-between">
                <button className="primary-button">Continue</button>
            </div>

            
        </form>
    )

}