import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext);
  const [currency, setCurrency] = useState('INR');
  const [referralCode, setReferralCode] = useState('');
  const [referralDiscount, setReferralDiscount] = useState(0);
  const [isCodeApplied, setIsCodeApplied] = useState(false);
  const [splitCode, setSplitCode] = useState('');
  const [splitPayments, setSplitPayments] = useState([]);
  const [newParticipant, setNewParticipant] = useState('');

  const currencyRates = {
    INR: 1, // Base currency
    USD: 0.012,
    EUR: 0.011,
  };

  const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
  };

  const handleApplyReferralCode = () => {
    if (referralCode === 'FRIEND50' && !isCodeApplied) {
      setReferralDiscount(50);
      setIsCodeApplied(true);
    } else {
      alert('Invalid referral code or code already applied.');
    }
  };

  const generateSplitCode = () => {
    const code = `SPLIT-${Math.floor(1000 + Math.random() * 9000)}`;
    setSplitCode(code);
  };

  const addParticipant = () => {
    if (newParticipant && !splitPayments.some(p => p.name === newParticipant)) {
      setSplitPayments([...splitPayments, { name: newParticipant, amount: 0 }]);
      setNewParticipant('');
    }
  };

  const updateAmount = (index, amount) => {
    const updatedPayments = splitPayments.map((p, i) =>
      i === index ? { ...p, amount: parseFloat(amount) } : p
    );
    setSplitPayments(updatedPayments);
  };


  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  });

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data =>({...data,[name]:value}))
  }

  const placeOrder = async (event) =>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item, index)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }

    let response = await axios.post(url+'/api/order/place', orderData,{headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert('Error')
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  const convertAmount = (amount) => (amount * currencyRates[currency]).toFixed(2);

  return (
    <React.Fragment>
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city}  type="text" placeholder='City'/>
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code'/>
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
        <div className="scheduled-order-time">
            <label htmlFor="delivery-time">Scheduled Order Time</label>
            <input type="time" id="delivery-time" name="delivery-time" />
          </div>

          <div className="referral-code">
            <label htmlFor="referral">Referral Code</label>
            <input
              type="text"
              id="referral"
              placeholder="Enter referral code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              disabled={isCodeApplied}
              />

              <button type="button" onClick={handleApplyReferralCode} disabled={isCodeApplied}>
              Apply Code
             </button>

      </div>
      </div>

      <div className="place-order-right">
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
              <p>{currencySymbols[currency]}{convertAmount(deliveryFee)}</p>
              </div>
              {referralDiscount > 0 && (
                <div className="cart-total-details">
                  <p>Referral Discount</p>
                  <p>-{currencySymbols[currency]}{convertAmount(referralDiscount)}</p>
                </div>
              )}
              <hr />
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="currency-selection">
                <label htmlFor="currency">Choose Currency:</label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>
              <div className="split-payment">
            <h2>Split  Payment</h2>
            <button type="button" onClick={generateSplitCode}>Generate Split Code</button>
            {splitCode && <p>Share this code with friends: <b>{splitCode}</b></p>}
            
            <input
              type="text"
              placeholder="Add participant"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
            />
            <button type="button" onClick={addParticipant}>Add Participant</button>
            
            {splitPayments.length > 0 && (
              <div className="split-payments-list">
                <h4>Split Payments</h4>
                {splitPayments.map((participant, index) => (
                  <div key={index} className="split-participant">
                    <span>{participant.name}:</span>
                    <input
                      type="number"
                      placeholder="Amount"
                      value={participant.amount}
                      onChange={(e) => updateAmount(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
            <div className="cart-total-detail">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div> 
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      
    </form>
    </React.Fragment>
  )
}

export default PlaceOrder