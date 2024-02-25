package com.bookstore.bookstoreapi.repository;

import com.bookstore.bookstoreapi.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Page<Review> findByBookId(@RequestParam("book_id") Integer bookId, Pageable pageable);

    Review findByUserEmailAndBookId(String userId, Integer bookId);

    Review findByUserIdAndBookId(Integer userId, Integer bookId);

    @Modifying
    @Query("DELETE from Review WHERE book_id in :book_id")
    void deleteAllByBookId(@Param("book_id") Integer bookId);
}
