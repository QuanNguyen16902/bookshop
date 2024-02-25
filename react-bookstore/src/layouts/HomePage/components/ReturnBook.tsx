import React from "react";
import BookModel from "../../../models/BookModel";
import { Link } from "react-router-dom";

export const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <div className="col-lg-2 col-md-3 col-sm-4">
      <div className="text-center">
        {props.book.img ? (
          <img src={props.book.img} alt="book" width="151" height="233" />
        ) : (
          <img
            src={require("../../../Images/book-1.png")}
            alt="book"
            width="151"
            height="233"
          />
        )}

        <h6 className="mt-2">{props.book.title}</h6>
        <p>{props.book.author}</p>
        <Link to={`checkout/${props.book.id}`} className="btn main-color text-white">
          Buy
        </Link>
      </div>
    </div>
  );
};
