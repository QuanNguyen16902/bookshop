package com.bookstore.bookstoreapi.service;

import com.bookstore.bookstoreapi.entity.Book;
import com.bookstore.bookstoreapi.repository.BookRepository;
import com.bookstore.bookstoreapi.repository.ReviewRepository;
import com.bookstore.bookstoreapi.requestmodels.BookRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class AdminService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private ReviewRepository reviewRepository;


    public void postBook(BookRequest bookRequest){
        Book book = new Book();
        book.setTitle(bookRequest.getTitle());
        book.setDescription(bookRequest.getDescription());
        book.setAuthor(bookRequest.getAuthor());
        book.setPrice(bookRequest.getPrice());
        book.setDiscountPercent(bookRequest.getDiscountPercent());
        book.setCategory(bookRequest.getCategory());
        book.setImg(bookRequest.getImg());

        bookRepository.save(book);
    }

    public void updateBook(Integer bookId, BookRequest bookRequest) throws Exception {
        Optional<Book> optionalBook = bookRepository.findById(bookId);
        if (optionalBook.isPresent()) {
            //Check if book exists, update attributes with the values from the request
            Book book = optionalBook.get();
            book.setTitle(bookRequest.getTitle());
            book.setDescription(bookRequest.getDescription());
            book.setAuthor(bookRequest.getAuthor());
            book.setPrice(bookRequest.getPrice());
            book.setDiscountPercent(bookRequest.getDiscountPercent());
            book.setCategory(bookRequest.getCategory());
            book.setImg(bookRequest.getImg());

            bookRepository.save(book);
        } else {
            throw new Exception("Book not found");
        }
    }

    public void deleteBookById(Integer bookId) throws Exception{
        Optional<Book> book = bookRepository.findById(bookId);

        if(!book.isPresent()){
            throw new Exception("Book not found");
        }

        bookRepository.delete(book.get());
        reviewRepository.deleteAllByBookId(bookId);
    }
}
