package com.bookstore.bookstoreapi.repository;

import com.bookstore.bookstoreapi.entity.shoppingCart.Order;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderRepository extends JpaRepository<Order, Integer>{
	
}
