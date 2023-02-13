import { AiOutlineMinusCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa'

export const QuantitySetter = ({bookId, quantity, dispatch, removeItem, decrementQty, incrementQty }) => { // 
    
    return (
        <div className="flex justify-center text-2xl md:text-xl">
            {   
                quantity === 1 ?
                    (
                        <button onClick={ ()=> dispatch(removeItem({_id: bookId})) }>
                            <FaRegTrashAlt className="text-2xl md:text-xl" />
                        </button>
                    ) : (
                        <button onClick={ ()=> dispatch(decrementQty({_id: bookId}))}>
                            <AiOutlineMinusCircle className="text-4xl md:text-2xl" />
                        </button>
                    )
            }
            <span className="flex items-center px-5">
                {quantity}
            </span>
            <button onClick={ ()=> dispatch(incrementQty({_id: bookId})) }>
                <AiOutlinePlusCircle className="text-4xl md:text-2xl" />
            </button>
        </div>
    )
}