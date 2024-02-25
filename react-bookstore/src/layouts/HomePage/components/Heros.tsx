import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import IUser from "../../../types/user.type";
import React from "react";
import AuthService from "../../../services/auth.service";

type State = {
  currentUser: IUser | undefined;
};
export const Heros = () => {
  const [state, setState] = React.useState<State>({
    currentUser: undefined,
  });
  React.useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setState({
        currentUser: user,
      });
    } 
  }, []);
  const { currentUser } = state;

  return (
    <div>
      <div className="d-none d-lg-block">
        <div className="row g-0 mt-5">
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"></div>
          </div>
          <div className="col-4 col-md-4 container d-flex justify-content-center align-item-center">
            <div className="ml-2">
              <h1>What have you been reading?</h1>
              <p className="lead">
                The library team would love to know what you have been reading.
                whether it is to learn a new skill or grow within one.
              </p>
              {currentUser ?
                <Link type='button' className='btn main-color btn-lg text-white'
                    to='search'>Explore top books</Link>
                  :
              
              <Link to='/login' className="btn main-color btn-lg text-white">
                Sign Up
              </Link>
              }
                

              {/* } */}
            </div>
          </div>
        </div>

        <div className="row g-0">
          <div
            className="col-4 col-md-4 container d-flex 
            justify-content-center align-item-center"
          >
            <div className="ml-2">
              <h1>Our collection is always changing!</h1>
              <p className="lead">
                Try to check in daily as our collection is always changing! We
                work nonstop to provide most accurate book selection possible
                for our student
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>

      {/*Mobile Heros */}
      <div className="d-lg-none">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h1>What have you been reading?</h1>
              <p className="lead">
                The library team would love to know what you have been reading.
                whether it is to learn a new skill or grow within one.
              </p>
              <a href="#" className="btn main-color btn-lg text-white">
                Sign Up
              </a>
            </div>
          </div>

          <div className="m-2">
            <div className="col-image-right"></div>
            <div className="mt-2">
              <h1>Our collection is always changing!</h1>
              <p className="lead">
                Try to check in daily as our collection is always changing! We
                work nonstop to provide most accurate book selection possible
                for our student
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
