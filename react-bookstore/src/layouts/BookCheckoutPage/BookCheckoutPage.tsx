import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReview";
import Review from "../../models/ReviewModel";
import { error } from "console";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import ReviewRequestModel from "../../models/ReviewRequestModel";
import IUser from "../../types/user.type";
import React from "react";
import AuthService from "../../services/auth.service";
import authHeader from "../../services/auth-header";
type Props = {};

type State = {
  showAdminBoard: boolean;
  currentUser: IUser | undefined;
};
export const BookCheckoutPage = () => {
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
    
    // const { authState } = useOktaAuth();
    
    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [reviews, setReviews] = useState<Review[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);


    //truyen id tu /checkout/id
    const bookId = (window.location.pathname).split('/')[2];
    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseJson = await response.json();
            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                price: responseJson.price,
                discountPercent: responseJson.discountPercent,
                category: responseJson.category,
                img: responseJson.img,
                inStock: responseJson.inStock,
                cost: responseJson.cost,
                discountPrice: responseJson.discountPrice,
            };

            setBook(loadedBook);
            setIsLoading(false);
        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

            const responseReviews = await fetch(reviewUrl);

            if(!responseReviews.ok){
                throw new Error('Something went wrong');
            }
            const responseJsonReviews = await responseReviews.json();

            const responseData = responseJsonReviews._embedded.reviews;

            const loadReviews: Review[] = [];

            let starsReview: number = 0;

            for(const key in responseData){
                loadReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    bookId: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription,
                });

                starsReview = starsReview + responseData[key].rating;
            }

            if(loadReviews){
                const round = (Math.round((starsReview / loadReviews.length) * 2)/ 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReviews(loadReviews);
            setIsLoadingReview(false);
        };

        fetchBookReviews().catch((error : any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    }, [isReviewLeft]);
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
      user = JSON.parse(userStr);
    console.log(userStr);
    console.log(bookId);

    useEffect(() => {
        const fetchUserReviewBook = async () => {
            if(currentUser){
                const url = `http://localhost:8080/api/reviews/secure/user/${currentUser.id}/book/${bookId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type' : 'application/json',
                       ...authHeader()
                    }
                };
                const userReview = await fetch(url, requestOptions);
                if(!userReview.ok){
                    throw new Error("Something went wrong");
                }
                const userReviewResponseJson = await userReview.json();
                setIsReviewLeft(userReviewResponseJson);
            
            }
            setIsLoadingUserReview(false);
        }
        fetchUserReviewBook().catch((error: any) => {
            setIsLoadingUserReview(false);
            setHttpError(error.message);
        })
    }, [currentUser])

    if (isLoading || isLoadingReview || isLoadingUserReview) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }
    async function submitReview(starInput: number, reviewDescription: string) {
        let bookId: number = 0;
        if(book?.id){
            bookId = book.id;
        }
        const reviewRequestModel = new ReviewRequestModel(starInput, bookId, reviewDescription);
        const url = `http://localhost:8080/api/reviews/secure/${currentUser?.email}`;
        const requestOptions = {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
                ...authHeader()
            },
            body: JSON.stringify(reviewRequestModel)
        };
        const returnResponse = await fetch(url, requestOptions);
        // console.log("respnose: " + reviewRequestModel);
        if(!returnResponse.ok){
            throw new Error('Something went wrong');
        }
        setIsReviewLeft(true);
    }

    return (
        <div>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='col-sm-2 col-md-2'>
                        {book?.img ?
                            <img src={book?.img} width='200' height='300' alt='Book' />
                            :
                            <img src={require('./../../Images/book-1.png')} width='226'
                                height='349' alt='Book' />
                        }
                    </div>
                    <div className='col-6 col-md-6 container'>
                        <div className='ml-3'>
                            <h2>{book?.title}</h2>
                            <h5 className='text-primary'>{book?.author}</h5>
                            <p className='lead'>{book?.description}</p>
                            <StarsReview rating={totalStars} size={30}/>
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false} isAuthenticated={currentUser}
                            isReviewLeft={isReviewLeft} submitReview={submitReview}/>
                </div>
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={false}/>
                
            </div>
            <div className='container d-lg-none mt-5'>
                <div className='d-flex justify-content-center align-items-center'>
                    {book?.img ?
                        <img src={book?.img} width='226' height='349' alt='Book' />
                        :
                        <img src={require('./../../Images/book-1.png')} width='226'
                            height='349' alt='Book' />
                    }
                </div>
                <div className='mt-4'>
                    <div className='ml-2'>
                        <h2>{book?.title}</h2>
                        <h5 className='text-primary'>{book?.author}</h5>
                        <p className='lead'>{book?.description}</p>
                        <StarsReview rating={totalStars} size={30}/>
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true} isAuthenticated={currentUser}
                            isReviewLeft={isReviewLeft} submitReview={submitReview}/>
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true}/>
            </div>
        </div>
    );
}