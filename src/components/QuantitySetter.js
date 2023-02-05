import { AiOutlineMinusCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa'

export const QuantitySetter = ({bookId, format, quantity, dispatch, removeItem, decrementQty, incrementQty }) => { // 
    const payload = {_id: bookId, format: format }
    return (
        <div className="flex justify-center">
            {   
                quantity === 1 ?
                    (
                        <button onClick={ ()=> dispatch(removeItem(payload)) }>
                            <FaRegTrashAlt className="text-xl" />
                        </button>
                    ) : (
                        <button onClick={ ()=> dispatch(decrementQty(payload))}>
                            <AiOutlineMinusCircle className="text-2xl" />
                        </button>
                    )
            }
            <span className="flex items-center px-3">
                {quantity}
            </span>
            <button onClick={ ()=> dispatch(incrementQty(payload)) }>
                <AiOutlinePlusCircle className="text-2xl" />
            </button>
        </div>
    )
}