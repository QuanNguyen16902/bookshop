//package com.bookstore.bookstoreapi.repository;
//
//import com.bookstore.bookstoreapi.entity.Checkout;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//
//public interface CheckoutRepository extends JpaRepository<Checkout, Integer> {
//
//    Checkout findByUserEmailAndBookId(String userEmail, Integer bookId);
//
//    List<Checkout> findBookByUserEmail(String userEmail);
//}
