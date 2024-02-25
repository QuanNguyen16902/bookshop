import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../../models/CartItemModel";
import IUser from "../../types/user.type";
import AuthService from "../../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import QuantityControl from "./QuantityControl";
import Subtotal from "./SubTotal";
import { Modal } from "react-bootstrap";
import authHeader from "../../services/auth-header";
import { link } from "fs";
import CheckoutInfoModel from "../../models/CheckoutInfoModel";
type State = {
  showAdminBoard: boolean;
  currentUser: IUser | undefined;
};
const ShoppingCart = () => {
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const checkoutInfo = useState<CheckoutInfoModel>;
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [estimatedTotal, setEstimatedTotal] = useState<number | null>(null);
  const [newEstimatedTotal, setNewEstimatedTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [newSubtotal, setNewSubtotal] = useState(0);
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
    if (currentUser && currentUser.id) {
      const fetchCart = async () => {
        const url: string = `http://localhost:8080/api/cart/${Number(
          currentUser?.id
        )}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Something wrong");
        }

        const responseJson = await response.json();

        const responseData = responseJson.cartItems;


        const loaddedCart: CartItem[] = [];

        for (const key in responseData) {
          loaddedCart.push({
            id: responseData[key].id,
            quantity: responseData[key].quantity,
            book: responseData[key].book,
            userId: responseData[key].userId,
            bookId: responseData[key].bookId,
            subTotal: responseData[key].subTotal,
            shippingCost: responseData[key].shippingCost,
          });
        }
        setEstimatedTotal(Number(responseJson.estimatedTotal));

        console.log(estimatedTotal);
        setCartItem(loaddedCart);
        setIsLoading(false);
      };
      fetchCart().catch((error: any) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
      window.scrollTo(0, 0);
      // scroll to the top
    } else {
      console.log("User not logged in");
    }
  }, [currentUser]);

  const removeFromCart = async (bookId: number) => {
    const url = `http://localhost:8080/api/cart/remove/${bookId}/${currentUser?.id}`;
    const responseOptions = {
      method: "DELETE",
      headers: {
        ...authHeader(),
        "Content-Type": "application/json",
      },
    };
    try {
      const responseData = await fetch(url, responseOptions);
      if (!responseData.ok) {
        throw new Error("Failed to remove item from cart");
      }
      const updatedCart = cartItem.filter((cart) => cart.book.id !== bookId);
      setCartItem(updatedCart);

      const newEstimatedTotal = calculateTotal(updatedCart);
      setEstimatedTotal(newEstimatedTotal);
      // updateTotal(); // Update total after removing an item
    } catch (error) {
      console.log("Error removing item from cart:", error);
    }
  };

  const calculateTotal = (cart: any[]) => {
    let total = 0;
    cart.forEach((item: { subTotal: number; quantity: number }) => {
      total += item.subTotal* item.quantity;
    });
    return total;
  };
  
  
  const updateQuantity = async (bookId: number, newQuantity: number, newSubtotal: number) => {
    try {
      const url = `http://localhost:8080/api/cart/update/${bookId}/${newQuantity}/${currentUser?.id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }
      const updatedCart = cartItem.map(cart => {
        if (cart.book.id === bookId) {
          return { ...cart, quantity: newQuantity, subTotal: newSubtotal };
        }
        return cart;
      });
      setCartItem(updatedCart);
      // const newEstimatedTotal = calculateTotal(updatedCart);
      // setEstimatedTotal(newEstimatedTotal);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  
  const handleMinusClick = (bookId: number) => {
    let newSubtotal = 0;
    const updatedCart = cartItem.map(cart => {
      if (cart.book.id === bookId) {
        const newQuantity = Math.max(1, cart.quantity - 1);
        if(cart.book.discountPercent > 0){
          newSubtotal = cart.subTotal - cart.book.discountPrice; 
        }else{
         newSubtotal = cart.subTotal - cart.book.price;
          
        }
        updateQuantity(bookId, newQuantity, newSubtotal);
        return { ...cart, quantity: newQuantity , subTotal: newSubtotal };
      }
      return cart;
    }, );
    setCartItem(updatedCart);
  };
  
  const handlePlusClick = (bookId: number) => {
    let newSubtotal = 0;
    const updatedCart = cartItem.map(cart => {
      if (cart.book.id === bookId) {
        const newQuantity = cart.quantity + 1;
        if(cart.book.discountPercent > 0){
          newSubtotal = cart.subTotal + cart.book.discountPrice; 
        }else{
         newSubtotal = cart.subTotal + cart.book.price;
          
        }
        updateQuantity(bookId, newQuantity, newSubtotal);
        return { ...cart, quantity: newQuantity, subtotal: newSubtotal };
      }
      return cart;
    });
    setCartItem(updatedCart);
  };
  
  const handleCheckoutClick = () => {
    const updatedCart = cartItem.map((cart) => {
      return { ...cart, quantity: 1 };
    });
    setCartItem(updatedCart);
    // const newEstimatedTotal = calculateTotal(updatedCart);
    // setEstimatedTotal(newEstimatedTotal);
  };

  const renderCheckoutButton = () => {
    
    return (
        <Link to='/place-order' onClick={() => handleCheckoutClick} className="btn btn-danger p-3 mt-2">
          Check Out
        </Link>
       
    );
  };

  
  return (
    <div className="container-fluid">
      <div className="text-center">
        <h2>Your Shopping Cart</h2>
      </div>
      <div className="row m-1">
        <div className="col-sm-8">
          {cartItem.map((cart, index) => (
            <div className="row border rounded p-1" key={cart.id}>
              <div className="col-1">
                <div className="divCount">{index + 1}</div>
              </div>

              <div className="col-3">
                <img
                  src={cart.book.img}
                  width="100px"
                  height="150px"
                  className="img-fluid"
                  alt={cart.book.title}
                />
              </div>
              <div className="col-5">
                <div className="my-1">
                  <Link
                    to={`/checkout/${cart.book.id}`}
                    className="btn btn-outline-dark mr-2 py-0"
                    title={cart.book.title}
                  >
                    <b>{cart.book.title}</b>
                  </Link>
                </div>
                <div>
                  <nav>
                    <ul className="pagination">
                      <li className="page-item">
                        <button
                          className="page-link linkMinus"
                          onClick={() => handleMinusClick(cart.book.id)}
                        >
                          <b>-</b>
                        </button></li>
                      <li className="page-item">
                        <input
                          type="text"
                          id={`quantity${cart.book.id}`}
                          className="form-control text-center"
                          style={{ width: "55px" }}
                          value={cart.quantity} // Pass the current quantity here
                          readOnly
                        />
                      </li>
                      <li className="page-item">
                        <button
                          className="page-link linkPlus"
                          onClick={() => handlePlusClick(cart.book.id)}
                        >
                          <b>+</b>
                        </button>
                      
                      </li>
                    </ul>
                  </nav>
                </div>
                <div>
                  <span>X&nbsp;</span>

                  <div>{ cart.book.discountPercent > 0 ?

                     <> 
                     <span style={{color:'red'}}> {cart.book.discountPrice}</span>
                      
                      &nbsp;
                      <del>{cart.book.price}</del>
                      </>
                      :
                      <div>{cart.book.price}</div> 
                  
                  }
                 
                  </div>
                </div>
                <div>
                  <span>=&nbsp;</span>
                  <span>
                    <Subtotal
                      price={cart.subTotal}
                    />
                   {/* {cart.subTotal} */}
                    $
                  </span>
                </div>
              </div>
              <div className="col-1"></div>
              <div className="col-1 m-1">
                <button
                  onClick={() => removeFromCart(cart.book.id)}
                  // to={`/cart/remove/${cart.book.id}`}
                  className="btn btn-outline-dark linkRemove"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-sm-4" id="sectionTotal">
          <div>
            <span className="h3">Estimated Total: </span>
          </div>
          <div className="mt-2">
            <span className="h2">{estimatedTotal}$ </span>
          </div>
          <div className="mt-2">{renderCheckoutButton()}</div>
        </div>
      </div>
      <div
        id="sectionEmptyCartMessage"
        className={`text-center ${cartItem.length === 0 ? "" : "d-none"}`}
      >
        <h3>You have not chosen any Cart yet.</h3>
      </div>
    </div>
  );
};

export default ShoppingCart;

