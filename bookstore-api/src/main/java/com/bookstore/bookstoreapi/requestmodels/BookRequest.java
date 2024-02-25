package com.bookstore.bookstoreapi.requestmodels;

import lombok.Data;

@Data
public class BookRequest {
    private String title;

    private String author;

    private String description;

    private String category;

    private float price;

    private float discountPercent;

    private String img;
}
