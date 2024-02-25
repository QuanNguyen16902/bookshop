package com.bookstore.bookstoreapi.controller;

import com.bookstore.bookstoreapi.Utility;
import com.bookstore.bookstoreapi.entity.User;
import com.bookstore.bookstoreapi.entity.shoppingCart.CartItem;
import com.bookstore.bookstoreapi.exception.UserNotFoundException;
import com.bookstore.bookstoreapi.service.ShoppingCartService;
import com.bookstore.bookstoreapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/cart")
public class ShoppingCartController {

	@Autowired
	private ShoppingCartService cartService;

	@Autowired
	private UserService userService;

	@GetMapping("/{userId}")
	public ResponseEntity<?> viewCart(@PathVariable("userId") Integer id) throws UserNotFoundException {
		User user = userService.getUserById(id);
		List<CartItem> cartItems = cartService.listCartItems(user);
		float estimatedTotal = 0.0F;
		for(CartItem item : cartItems) {
			estimatedTotal += item.getSubTotal();
		}

		Map<String, Object> responseData = new HashMap<>();
		responseData.put("cartItems", cartItems);
		responseData.put("estimatedTotal", estimatedTotal);
		return ResponseEntity.ok(responseData);
	}


}

