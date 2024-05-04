import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import React, { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = props =>{
const[isCart, setIsCart] = useState(false)
const cardCtx = useContext(CartContext)
const [isSubmit, setIsSubmit] = useState(false);
const [didSubmit, setDidSubmit] = useState(false);

const totalAmount = `$${cardCtx.totalAmount.toFixed()}`

const hasItems = cardCtx.items.length > 0

const cartItemRemoveHandler = (id) =>{
cardCtx.removeItem(id)
}

const cartItemAddHandler = (item) =>{
cardCtx.addItem({...item, amount:1})
}

const orderHandler = () =>{
 setIsCart(true)
}

const submitOrderHandler = async(userData) => {
    setIsSubmit(true)
     await fetch('https://food-site-74cea-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
        method:'POST',
        body:JSON.stringify({
            user:userData,
            orderedItems:cardCtx.items
        })
    })
    setIsSubmit(false)
    setDidSubmit(true)
    cardCtx.clearCart()
}

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cardCtx.items.map((item)=>(
                <CartItem 
                key={item.id} 
                name={item.name} 
                amount ={item.amount} 
                price={item.price}
                onRemove ={ cartItemRemoveHandler.bind(null,item.id)}
                onAdd ={cartItemAddHandler.bind(null,item)}
                />
            ))}
        </ul>
        )
const modalActions =  (<div className={classes.actions}>
<button className={classes['button--alt']} onClick={props.onClose}>
  Close
</button>
  {hasItems && <button className={classes.button} onClick={orderHandler}>
    Order
</button>}
</div> 
)

const cartModalContent = 
<React.Fragment>
{cartItems}
<div className={classes.total}>
    <span>Total amount </span>
    <span>{totalAmount}</span>
</div>
{isCart && <Checkout onConfirm={submitOrderHandler} onCancel= {props.onClose}/>} 
{!isCart && modalActions}
</React.Fragment> 

const isSubmittingModalContent = <p>Sending order ..... </p>

const didSubmitModalContent = <React.Fragment> 
    <p>Sucessfully sent the order</p> 
    <div className={classes.actions}>
    <button className={classes.button} onClick={props.onClose}>
    Close
    </button>
</div> 
    </React.Fragment>

return( 
<Modal onClose = {props.onClose}>
    {!isSubmit && !didSubmit && cartModalContent}
    {isSubmit && isSubmittingModalContent}
    {!isSubmit && didSubmit && didSubmitModalContent}
</Modal>
)
}


export default Cart