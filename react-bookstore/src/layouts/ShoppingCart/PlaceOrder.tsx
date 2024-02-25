import { faLongArrowAltLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../../models/CartItemModel';
import IUser from '../../types/user.type';
import AuthService from '../../services/auth.service';
import AuthHeader from '../../services/auth-header';
import CheckoutInfoModel from '../../models/CheckoutInfoModel';
import authHeader from '../../services/auth-header';

type State = {
  showAdminBoard: boolean;
  currentUser: IUser | undefined;
};

const CheckoutDetails: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfoModel | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [id, setId] = useState(0);
  const [orderTime, setOrderTime] = useState('');
  const [shippingCostTotal, setShippingCostTotal] = useState(0);
  const [bookCost, setBookCost] = useState(0)
  const [subTotal, setSubTotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)
  const [deliverDays, setDeliverDays] = useState(0)
  const [deliverDate, setDeliverDate] = useState('')
  const [state, setState] = React.useState<State>({
    showAdminBoard: false,
    currentUser: undefined,
  });

  React.useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }, []);

  const { currentUser } = state;

  useEffect(() => {
    const fetchCheckoutDetails = async () => {
      try {
        if (currentUser && currentUser.id) {
          const response = await fetch(`http://localhost:8080/api/checkout/details/${currentUser?.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch checkout details');
          }
          const responseData = await response.json();
          setCartItems(responseData.cartItems);
          const { bookCost, bookTotal, shippingCostTotal, paymentTotal, deliverDays, deliverDate } = responseData.checkoutInfo;
          const checkoutInfoModel = new CheckoutInfoModel(bookCost, bookTotal, shippingCostTotal, paymentTotal, deliverDays, deliverDate);
          setCheckoutInfo(checkoutInfoModel);
        }
      } catch (error) {
        console.error('Error fetching checkout details:', error);
      }
    };

    fetchCheckoutDetails();
  }, [currentUser]);
  
  if (!currentUser || !checkoutInfo) {
    return <div>Loading...</div>;
  }
  const handlePlaceOrder = async () => {
    try {
      const url = `http://localhost:8080/api/checkout/place_order/${currentUser?.id}`;
      const orderData = {
        orderTime: orderTime,
        shippingCostTotal: shippingCostTotal,
        bookCost: bookCost,
        subTotal: subTotal,
        tax: tax,
        total: total,
        deliverDays: deliverDays,
        deliverDate: deliverDate,
        user: currentUser
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader()
        },
        body: JSON.stringify(orderData)
      });
        const responseData = response.json();
      console.log(responseData);
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
  
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  
  return (
    <div>
      <section className="h-100 h-custom" style={{ backgroundColor: '#faf0c6' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div className="card card-registration card-registration-2" style={{ borderRadius: '15px' }}>
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                          <h6 className="mb-0 text-muted">{cartItems.length} items</h6>
                        </div>

                        {/* Cart items */}
                        {cartItems.map((item, index) => (
                          <div className="row mb-4 d-flex justify-content-between align-items-center" key={index}>
                            <div className="col-md-2 col-lg-2 col-xl-2">
                              <img src={item.book.img} className="img-fluid rounded-3" alt={item.book.title} />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                              <h6 className="text-muted">Item</h6>
                              <h6 className="text-black mb-0">{item.book.title}  </h6>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                              {/* Quantity buttons */}
                              <button className="btn btn-link px-2">
                                <i className="fas fa-minus"></i>
                              </button>
                              <input   readOnly name="quantity" value={item.quantity} type="number" className="form-control form-control-sm" />
                              <button className="btn btn-link px-2">
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 className="mb-0">{ item.book.discountPercent > 0 ?  item.book.discountPrice : item.book.price }</h6>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                              <h6 className="mb-0">{checkoutInfo.bookTotal }</h6>
                            </div>
                            
                          </div>
                        ))}
                        
                        {/* Summary */}<div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5>  {checkoutInfo.bookTotal} €</h5>
                        </div>

                        <hr className="my-4" />
                        <div className="pt-5">
                          <h6 className="mb-0">
                            <Link className="text-body" to='/shopping-book'>
                              <FontAwesomeIcon className="me-2" icon={faLongArrowAltLeft}/>Back to shop
                            </Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                    
                    {/* Checkout summary */}
                    <div className="col-lg-4 bg-grey">
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4"/>
                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">Items {cartItems.length}</h5>
                          <h5>€ {checkoutInfo.bookTotal}</h5>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase mb-3">Shipping</h5>
                          <h5>€ {checkoutInfo.shippingCostTotal}</h5>
                        </div>
                  
                        <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase mb-3">Book Cost</h5>
                          <h5> {checkoutInfo.bookCost}</h5>
                        </div>
                     
                       
                         
                          <hr className="my-4"/>
                          <div className="d-flex justify-content-between mb-5">
                            <h5 className="text-uppercase">Total price</h5>
                            <h5>€ {checkoutInfo.paymentTotal}</h5>
                          </div>
                          <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase mb-3">Deliver Date</h5>
                          <h5> {checkoutInfo.deliverDate}</h5>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase mb-3">Deliver Days</h5>
                          <h5> {checkoutInfo.deliverDays} days</h5>
                        </div>
                        {orderPlaced ? (
                            <div>Order placed successfully!</div>
                        ) : (
                            <button
                            type="button"
                            className="btn btn-dark btn-block btn-lg"
                            onClick={handlePlaceOrder}
                            data-mdb-ripple-color="dark"
                            >
                            Place Order
                            </button>
                        )} </div>
                      </div>
                      <div>
                       
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>
      </div>
  );
};

export default CheckoutDetails;

