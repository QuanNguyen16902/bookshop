import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import BookModel from '../../../models/BookModel';
import { useHistory } from 'react-router-dom';

 

const ViewBookPage =  ()=> {
    const [book, setBook] = useState<BookModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const history = useHistory();
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
                cost: responseJson.cost,
                discountPrice: responseJson.discountPrice
            };
            setBook(loadedBook);
            setIsLoading(false);
        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    return (
        <div className='container'>
    <div className="card">
    <div className="card-header">
        <h3>View book ID: {bookId}</h3>
    </div>
    <div className="card-body">
            <div className="row">
                <div className="col-md-3">
                    <label htmlFor="title" className="form-label"><b>Title:</b></label>
                    <p>{book?.title}</p>
                    <label htmlFor="author" className="form-label"><b>Author:</b></label>
                    <p>{book?.author}</p>
                    <label htmlFor="category" className="form-label"><b>Category</b></label>
                   <p>{book?.category}</p>
                   <div className="col-md-6 mb-3">
                        <label htmlFor="" className="form-label"><b>Price</b></label>
                        <p>{book?.price}$</p>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="" className="form-label"><b>Discount Percent</b></label>
                        <p>{book?.discountPercent}%</p>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label"><b>Description</b></label>
                    <p>{book?.description}</p>
                </div>
                <div className='col-md-3 mb-3'>
                <p><b>Image</b></p>
                <img src={book?.img} alt="Book" width='200' height='300' />
                </div>
            </div>
             
            <div>
             
                <button type="button" className="btn btn-danger mt-3" style={{ marginLeft: '10px' }} onClick={() => history.push('/admin')}>
                    Cancel
                </button>
            </div>
    </div>
</div>
</div>
    );
};

export default ViewBookPage;
