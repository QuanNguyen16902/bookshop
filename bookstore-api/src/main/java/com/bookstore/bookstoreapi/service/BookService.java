package com.bookstore.bookstoreapi.service;

import com.bookstore.bookstoreapi.entity.Book;
import com.bookstore.bookstoreapi.repository.BookRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class BookService {

    private BookRepository bookRepo;


    public BookService(BookRepository bookRepo){
        this.bookRepo = bookRepo;
    }

//    public Book checkoutBook (String userEmail, Integer bookId) throws Exception{
//
//        Optional<Book> book = bookRepo.findById(bookId);
//        Checkout validateCheckout = checkoutRepo.findByUserEmailAndBookId(userEmail, bookId);
//
//        if(!book.isPresent() || validateCheckout != null ){
//            throw new Exception("Book doesn't exist or already checkout by user");
//        }
//
//        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
//        bookRepo.save(book.get());
//
//        Checkout checkout = new Checkout(userEmail, LocalDate.now().toString(), LocalDate.now().plusDays(7).toString(), book.get().getId());
//
//        checkoutRepo.save(checkout);
//
//        return book.get();
//    }

//    public Boolean checkoutBookByUser(String userEmail, Integer bookId){
//        Checkout validateCheckout = checkoutRepo.findByUserEmailAndBookId(userEmail, bookId);
//        if(validateCheckout != null){
//            return  true;
//        }else{
//            return false;
//        }
//    }
//
//    public Integer currentLoanCount(String userEmail){
//        return checkoutRepo.findBookByUserEmail(userEmail).size();
//    }
}
