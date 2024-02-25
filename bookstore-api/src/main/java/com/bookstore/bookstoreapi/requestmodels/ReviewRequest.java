package com.bookstore.bookstoreapi.requestmodels;

import lombok.Data;

import java.util.Optional;

@Data
public class ReviewRequest {

    private double rating;
    private String userEmail;
    private Integer bookId;

    private Integer userId;
    private Optional<String> reviewDescription;

}
