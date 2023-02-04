import { AiOutlineMinusCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa'

//import { useSelector, useDispatch } from 'react-redux';
//import { removeItem, decrementQty, incrementQty } from '../features/cart/cartSlice';

export const QuantitySetter = ({bookId, quantity, dispatch, removeItem, decrementQty, incrementQty }) => { // 

    //const dispatch = useDispatch();
    //const items = useSelector( state => state.cart.items);
    //const item = items.find( e => e._id === book._id);

    return (
        <div className="flex justify-center">
            {   
                quantity === 1 
                    ? <button onClick={ ()=> dispatch(removeItem(bookId)) }><FaRegTrashAlt className="text-xl" /></button>
                    : <button onClick={ ()=> dispatch(decrementQty(bookId))}><AiOutlineMinusCircle className="text-2xl" /></button>
            }
            <span className="flex items-center px-3">{quantity}</span>
            <button onClick={ ()=> dispatch(incrementQty(bookId)) }>
            <AiOutlinePlusCircle className="text-2xl" />
            </button>
        </div>
    )
}