import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";
import { useOktaAuth } from "@okta/okta-react";
import { LeaveReview } from "../Utils/LeaveReview";
import IUser from "../../types/user.type";
import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import authHeader from "../../services/auth-header";
import QuantityControl from "../ShoppingCart/QuantityControl";
import AddToCart from "../ShoppingCart/AddToCart";
 
type State = {
  showAdminBoard: boolean;
  currentUser: IUser | undefined;
  checkoutCount: number;
};
export const CheckoutAndReviewBox: React.FC<{ book: BookModel | undefined, mobile: boolean, 
                    isAuthenticated: any, isReviewLeft: boolean, submitReview: any }> = (props) => {
   
    const [state, setState] = React.useState<State>({
        showAdminBoard: false,
        currentUser: undefined,
        checkoutCount: 0,
      });
      React.useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
          setState((prevState) => ({
            ...prevState,
            currentUser: user,
            showAdminBoard: user.roles.includes("ROLE_ADMIN"),
          }));
        } 
      }, []);
    
      const { currentUser, checkoutCount } = state;
      const updateCheckoutCount = (quantity: number) => {
        setState((prevState) => ({
          ...prevState,
          checkoutCount: prevState.checkoutCount + quantity
        }));
      };
    function reviewRender(){
        if(props.isAuthenticated && !props.isReviewLeft){
            return(
             <LeaveReview submitReview={props.submitReview}/>
                )
        }else if(props.isAuthenticated && props.isReviewLeft){
            return (<p><b>Thank you for your reviews</b></p>)
        }
        return (
             <div>
            <hr/>
            <p>Sign in to be able to shopping and review </p>
            </div>
        );
    }
   
    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>{checkoutCount}/10 </b>
                        books Add to cart
                    </p>
                    <hr />
                    {props.book && props.book?.inStock ? (
                            <h4 className='text-success'>
                            In Stock
                            </h4>
                        ) : (
                            <h4 className='text-danger'>
                            Out of Stock
                            </h4>
                        )}

                    <div className='row'>
                        <p className='col-6 lead'>
                            <b>Price: {props.book?.price} </b>
                            $
                        </p>
                        <p className='col-7 lead'>
                            <b>Discount: {props.book?.discountPercent} </b>
                            %
                        </p>
                    </div>
                </div>
                {currentUser ?
                <>
                <QuantityControl bookId={props.book?.id}  /> 
                <AddToCart bookId={props.book?.id} updateCheckoutCount={updateCheckoutCount}/>
                {/* <Link to='' className="btn btn-success btn-lg ">Add to Cart</Link> */}
                </>
                :
                    <Link to='/login' className='btn btn-success btn-lg'>Sign in</Link>
                
                }
                 <hr />
                <p className='mt-3'>
                    This number can change until placing order has been complete.
                </p>
                  {reviewRender()}

            </div>
        </div>
    );
}
