package com.bookstore.bookstoreapi.service;

import java.util.List;

import com.bookstore.bookstoreapi.entity.Book;
import com.bookstore.bookstoreapi.entity.User;
import com.bookstore.bookstoreapi.entity.shoppingCart.CartItem;
import com.bookstore.bookstoreapi.exception.ShoppingCartException;
import com.bookstore.bookstoreapi.repository.BookRepository;
import com.bookstore.bookstoreapi.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;

@Service
@Transactional
public class ShoppingCartService {
	@Autowired private CartItemRepository cartRepo;
	@Autowired private BookRepository bookRepo;
	
	public Integer addBook(Integer bookId, Integer quantity, User user) throws ShoppingCartException {
		Integer updatedQuantity = quantity;
		Book book = new Book(bookId);
		
		CartItem cartItem = cartRepo.findByUserAndBook(user, book);
		
		if(cartItem != null) {
			updatedQuantity = cartItem.getQuantity() + quantity; 
			if(updatedQuantity > 10) {
				throw new ShoppingCartException("Could not add more " + quantity + " item(s)"
						+ "because there's already " + cartItem.getQuantity() + " items(s) "
						+ "in your shopping cart. Maximum allowed quantity is 10.");
			}
		}else {
			cartItem = new CartItem();
			cartItem.setUser(user);
			cartItem.setBook(book);
		}
		cartItem.setQuantity(updatedQuantity); 
		cartRepo.save(cartItem);
		
		return updatedQuantity;
	}
	
	public List<CartItem> listCartItems(User user){
		return cartRepo.findByUser(user);
	}
	
	public float updateQuantity(Integer bookId, Integer quantity, User user) {
		cartRepo.updateQuantity(quantity, user.getId(), bookId);
		Book book = bookRepo.findById(bookId).get();
		float subtotal = book.getDiscountPrice()* quantity;
		return subtotal;
	}
	
	public void removeBook(Integer bookId, User user) {
		cartRepo.deleteByUserAndBook(user.getId(), bookId);;
	}
	
	public void deleteByUser(User user) {
		cartRepo.deleteByUser(user.getId());
	}
}
