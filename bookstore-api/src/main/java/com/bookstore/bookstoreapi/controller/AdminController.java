package com.bookstore.bookstoreapi.controller;

import com.bookstore.bookstoreapi.jwt.ExtractJwt;
import com.bookstore.bookstoreapi.requestmodels.BookRequest;
import com.bookstore.bookstoreapi.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;



    @PostMapping("/secure/add/book")
    public void postBook(
                         @RequestBody BookRequest bookRequest) throws Exception {
        adminService.postBook(bookRequest);
    }

    @DeleteMapping("/secure/delete/book")
    public void deleteBook(@RequestParam Integer bookId) throws Exception {

        adminService.deleteBookById(bookId);
    }

    @PutMapping("/secure/update/book/{bookId}")
    public void updateBook(@PathVariable Integer bookId,
                           @RequestBody BookRequest bookRequest) throws Exception {
        adminService.updateBook(bookId, bookRequest);
    }
}
