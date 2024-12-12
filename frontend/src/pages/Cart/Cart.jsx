import React, { useState, useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../components/context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItems, food_list, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext);
  const [groupOrderCode, setGroupOrderCode] = useState('');
  const [isGroupOrderActive, setIsGroupOrderActive] = useState(false);
  const [friendCode, setFriendCode] = useState('');

  const navigate = useNavigate();
  
    // Function to generate a random group order code
    const generateGroupOrderCode = () => {
      const code = `GROUP-${Math.floor(1000 + Math.random() * 9000)}`;
      setGroupOrderCode(code);
      setIsGroupOrderActive(true);
      alert(`Group order code generated: ${code}. Share this code with friends.`);
    };
  
    // Function for friends to join the group order
    const joinGroupOrder = () => {
      if (friendCode === groupOrderCode && isGroupOrderActive) {
        alert("You have joined the group order! You can now add items.");
        // Add logic here to allow this friend's device to add items to the group cart.
      } else {
        alert("Invalid group order code.");
      }
    };

  
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Itmes</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
  if (cartItems[item._id] > 0) {
    return (
      <React.Fragment key={item._id}>
        <div className="cart-items-title cart-items-item">
          <img src={`${url}/images/${item.image}`} alt="" />
          <p>{item.name}</p>
          <p>${item.price}</p>
          <p>{cartItems[item._id]}</p>
          <p>${item.price * cartItems[item._id]}</p>
          <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
        </div>
        <hr key={`hr-${item._id}`} />
      </React.Fragment>
    );
  }
  return null; // In case the item doesn't match the condition
})}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div> 
          </div>
          <button onClick={()=> navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        {/* Group Ordering Section */}
        <div className="cart-group-order">
            <h2>Group Ordering</h2>
            {!isGroupOrderActive ? (
              <button onClick={generateGroupOrderCode}>Generate Group Order Code</button>
            ) : (
              <p>Your group order code: <strong>{groupOrderCode}</strong></p>
            )}
            <div className="join-group-order">
              <input
                type="text"
                placeholder="Enter group order code"
                value={friendCode}
                onChange={(e) => setFriendCode(e.target.value)}
              />
              <button onClick={joinGroupOrder}>Join Group Order</button>
            </div>
          </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Promo Code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart