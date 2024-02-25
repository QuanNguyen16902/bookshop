package com.bookstore.bookstoreapi.repository;

import java.util.List;

import com.bookstore.bookstoreapi.entity.Book;
import com.bookstore.bookstoreapi.entity.User;
import com.bookstore.bookstoreapi.entity.shoppingCart.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
	public List<CartItem> findByUser(User user);

	public CartItem findByUserAndBook(User user, Book book);
	
	@Modifying
	@Query("UPDATE CartItem c SET c.quantity = ?1 WHERE c.user.id = ?2 AND c.book.id = ?3")
	public void updateQuantity(Integer quantity, Integer userId, Integer bookId);

	@Modifying
	@Query("DELETE FROM CartItem c WHERE c.user.id = ?1 AND c.book.id=?2")
	public void deleteByUserAndBook(Integer userId, Integer bookId);
	
	@Modifying
	@Query("DELETE CartItem c WHERE c.user.id = ?1")
	public void deleteByUser(Integer userId);
}
