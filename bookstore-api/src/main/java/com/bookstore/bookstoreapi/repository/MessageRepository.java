package com.bookstore.bookstoreapi.repository;

import com.bookstore.bookstoreapi.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    Page<Message> findByUserEmail(@RequestParam("user_email") String userEmail, Pageable pageable);
//
    Page<Message> findByClosed(@RequestParam("closed") boolean closed, Pageable pageable);
}
