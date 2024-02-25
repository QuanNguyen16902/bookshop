import { useOktaAuth } from "@okta/okta-react"
import { Link } from "react-router-dom";
import IUser from "../../../types/user.type";
import useCurrentUser from "../../Auth/AuthUser";
import IsAuthenticated from "../../Auth/AuthUser";
 
export const MoreInfo = () => {

    // const currentUser = useCurrentUser;
    const renderContent = (isAuthenticated: any) => {
        if (!isAuthenticated) {
              return  <Link to='/login' className="btn main-color btn-lg text-white">Sign Up</Link>
        }
        return (
            <Link to='/messages' type="button" className="btn main-color btn-lg px-4 me-md-2 fw-bold text-white">
                      Question & Answer
                     </Link>
        );
      };
    return(
        <div className="container my-5">
            <div className="row p-4 align-items-center border shadow-lg">
                <div className="col-lg-7 p-3">
                    <h1 className="display-4 fw-bold">
                        Can't find what you are looking for?
                    </h1>
                    <p className="lead">
                        If you cannot find what you are looking for, send our library admin's a personal message!
                    </p>
                    <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
                        {IsAuthenticated(renderContent)}
                        </div>
                </div>
                <div className="col-lg-4 offset-lg-1 shadow-lg lost-image">
                    
                </div>
            </div>
        </div>
    )
}
