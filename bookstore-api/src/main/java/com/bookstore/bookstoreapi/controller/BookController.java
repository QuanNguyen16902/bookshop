package com.bookstore.bookstoreapi.controller;

import com.bookstore.bookstoreapi.entity.Book;
import com.bookstore.bookstoreapi.jwt.ExtractJwt;
import com.bookstore.bookstoreapi.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    public BookService bookService;

    @Autowired
    public BookController(BookService bookService){
        this.bookService = bookService;
    }
//    @GetMapping("/secure/currentloan/count")
//    public Integer currentLoanCount(@RequestHeader(value = "Authorization") String token){
//        String userEmail =  ExtractJwt.payloadJWTExtract(token, "\"sub\"");;
//        return bookService.currentLoanCount(userEmail);
//    }
//
//    @GetMapping("/secure/isCheckout/byuser")
//    public Boolean checkoutBookByUser(@RequestHeader(value = "Authorization") String token,
//                                      @RequestParam Integer bookId){
//        String userEmail = ExtractJwt.payloadJWTExtract(token, "\"sub\"");
//        return bookService.checkoutBookByUser(userEmail, bookId);
//    }
//
//    @PutMapping("/secure/checkout")
//    public Book checkoutBook(@RequestHeader(value = "Authorization") String token,
//                             @RequestParam Integer bookId) throws Exception{
//        //test@gmail.com
//        String userEmail =  ExtractJwt.payloadJWTExtract(token, "email");
//        return bookService.checkoutBook(userEmail, bookId);
//    }

}
