import { useOktaAuth } from "@okta/okta-react"
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { AdminMessages } from "./components/AdminMessages";
import { AddNewBook } from "./components/AddNewBook";
import { ListBook } from "./components/ListBook";
import React from "react";
import IUser from "../../types/user.type";
import authHeader from "../../services/auth-header";
import AuthService from "../../services/auth.service";

type State = {
    showAdminBoard: boolean;
    currentUser: IUser | undefined;
  };
export const ManageBookstorePage = () => {
    
    // const { authState } = useOktaAuth();

    const [changeQuantityOfBookClick, setChangeQuantityOfBookClick] = useState(false);
    const [messagesClick, setMessagesClick] = useState(false);

    function addBookClickFuntion(){
        setChangeQuantityOfBookClick(false);
        setMessagesClick(false);
    }

    function changeQuantityOfBooksClickFuntion(){
        setChangeQuantityOfBookClick(true);
        setMessagesClick(false);
    }

    function messagesClickFunction(){
        setChangeQuantityOfBookClick(false);
        setMessagesClick(true);
    }

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
      // const { au } = useOktaAuth();
    
      const { currentUser } = state;

    if(currentUser?.roles?.at(0) === 'ROLE_USER'){
        return <Redirect to='/home'/>
    }

    return(
        <div className="container">
            <div className="mt-5">
                <h3>Manage Bookstore</h3>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='navlist'>
                        <button onClick={addBookClickFuntion} className='nav-link active' id='nav-add-book-tab' data-bs-toggle='tab'
                                data-bs-target='#nav-add-book' type="button" role='tab' aria-controls='nav-add-book'
                                aria-selected='false'>
                                    Add New Book
                        </button>
                        <button onClick={changeQuantityOfBooksClickFuntion} className='nav-link' id='nav-quantity-tab' data-bs-toggle='tab'
                                data-bs-target='#nav-quantity' type="button" role='tab' aria-controls='nav-quantity'
                                aria-selected='true'>
                                    List Books
                        </button>
                        
                        <button onClick={messagesClickFunction} className='nav-link' id='nav-messages-tab' data-bs-toggle='tab'
                                data-bs-target='#nav-messages' type="button" role='tab' aria-controls='nav-messages'
                                aria-selected='true'>
                                   Admin Response Message
                        </button>

                    </div>
                </nav>
                <div className="tab-content" id='nav-tabContent'>
                    <div className="tab-pane fade show active" id='nav-add-book' role='tabpanel'
                        aria-labelledby='nav-add-book-tab'>
                            <AddNewBook/>
                        </div>
                    <div className="tab-pane fade" id='nav-quantity' role='tabpanel'
                        aria-labelledby='nav-quantity-tab'>
                           <ListBook/>
                        </div>
                    <div className="tab-pane fade" id='nav-messages' role='tabpanel'
                        aria-labelledby='nav-messages-tab'>
                            {messagesClick ? <AdminMessages/> : <></>}
                        </div>
                </div>

            </div>
        </div>
    )
}