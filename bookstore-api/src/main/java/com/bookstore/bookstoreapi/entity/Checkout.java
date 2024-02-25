//package com.bookstore.bookstoreapi.entity;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import javax.persistence.*;
//
//@Entity
//@Table(name = "checkout")
//@NoArgsConstructor
//@AllArgsConstructor
//@Getter
//@Setter
//public class Checkout {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;
//
//    @Column(name = "user_email")
//    private String userEmail;
//    @Column(name = "checkoutDate")
//    private String checkoutDate;
//
//    @Column(name = "return_date")
//    private String returnDate;
//
//    @Column(name = "book_id")
//    private Integer bookId;
//
//    public Checkout(String userEmail, String checkoutDate, String returnDate, Integer bookId) {
//        this.userEmail = userEmail;
//        this.checkoutDate = checkoutDate;
//        this.returnDate = returnDate;
//        this.bookId = bookId;
//    }
//}
