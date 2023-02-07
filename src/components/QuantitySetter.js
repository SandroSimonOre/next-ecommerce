import { AiOutlineMinusCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa'

export const QuantitySetter = ({bookId, quantity, dispatch, removeItem, decrementQty, incrementQty }) => { // 
    
    return (
        <div className="flex justify-center">
            {   
                quantity === 1 ?
                    (
                        <button onClick={ ()=> dispatch(removeItem({_id: bookId})) }>
                            <FaRegTrashAlt className="text-xl" />
                        </button>
                    ) : (
                        <button onClick={ ()=> dispatch(decrementQty({_id: bookId}))}>
                            <AiOutlineMinusCircle className="text-2xl" />
                        </button>
                    )
            }
            <span className="flex items-center px-3">
                {quantity}
            </span>
            <button onClick={ ()=> dispatch(incrementQty({_id: bookId})) }>
                <AiOutlinePlusCircle className="text-2xl" />
            </button>
        </div>
    )
}