package com.bookstore.bookstoreapi.controller;

import com.bookstore.bookstoreapi.Utility;
import com.bookstore.bookstoreapi.entity.User;
import com.bookstore.bookstoreapi.exception.ShoppingCartException;
import com.bookstore.bookstoreapi.exception.UserNotFoundException;
import com.bookstore.bookstoreapi.service.ShoppingCartService;
import com.bookstore.bookstoreapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/cart")
public class ShoppingCartRestController {
	@Autowired
	private ShoppingCartService cartService;

	@Autowired
	private UserService userService;

	@PostMapping("/add/{bookId}/{quantity}/{userId}")
	public ResponseEntity<String> addBookToCart(@PathVariable(name = "bookId") Integer bookId,
												@PathVariable("quantity") Integer quantity, @PathVariable(name = "userId") Integer userId) {
		try {
			User user = userService.getUserById(userId);
			Integer updatedQuantity = cartService.addBook(bookId, quantity, user);

			return ResponseEntity.ok(updatedQuantity + " item(s) of this book were added to your shopping cart.");
		}  catch (UserNotFoundException e) {
			throw new RuntimeException("User ID not found");
		}catch (ShoppingCartException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@PostMapping("/update/{bookId}/{quantity}/{userId}")
	public ResponseEntity<String> updateQuantity(@PathVariable(name = "bookId") Integer bookId,
												 @PathVariable("quantity") Integer quantity, @PathVariable("userId") Integer userId) {
		try {
			User user = userService.getUserById(userId);
			float subtotal = cartService.updateQuantity(bookId, quantity, user);

			return ResponseEntity.ok(String.valueOf(subtotal));
		} catch (UserNotFoundException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You must login to change quantity of book");
		}
	}

	@DeleteMapping("/remove/{bookId}/{userId}")
	public ResponseEntity<String> removeBook(@PathVariable("bookId") Integer bookId,
											 @PathVariable("userId") Integer userId) {
		try {
			User user = userService.getUserById(userId);
			cartService.removeBook(bookId, user);

			return ResponseEntity.ok("The book has been removed from your shopping cart.");
		} catch (UserNotFoundException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You must login to remove book");
		}
	}

	private User getAuthenticatedUser(HttpServletRequest request) throws UserNotFoundException {
		String email = Utility.getEmailOfAuthenticatedUser(request);
		if (email == null) {
			throw new UserNotFoundException("No authenticated user");
		}

		return userService.getUserByEmail(email);
	}
}
