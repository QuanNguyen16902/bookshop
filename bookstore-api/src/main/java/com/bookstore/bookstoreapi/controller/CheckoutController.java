package com.bookstore.bookstoreapi.controller;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bookstore.bookstoreapi.Utility;
import com.bookstore.bookstoreapi.entity.User;
import com.bookstore.bookstoreapi.entity.shoppingCart.CartItem;
import com.bookstore.bookstoreapi.entity.shoppingCart.CheckoutInfo;
import com.bookstore.bookstoreapi.entity.shoppingCart.Order;
import com.bookstore.bookstoreapi.exception.UserNotFoundException;
import com.bookstore.bookstoreapi.service.CheckoutService;
import com.bookstore.bookstoreapi.service.OrderService;
import com.bookstore.bookstoreapi.service.ShoppingCartService;
import com.bookstore.bookstoreapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/checkout")
public class CheckoutController {

	@Autowired
	private CheckoutService checkoutService;

	@Autowired
	private UserService userService;

	@Autowired
	private ShoppingCartService cartService;

	@Autowired
	private OrderService orderService;

	@GetMapping("/details/{userId}")
	public ResponseEntity<?> getCheckoutDetails(@PathVariable("userId") Integer id) throws UserNotFoundException {
		User user = userService.getUserById(id);
		List<CartItem> cartItems = cartService.listCartItems(user);
		CheckoutInfo checkoutInfo = checkoutService.prepareCheckout(cartItems);

		Map<String, Object> responseData = new HashMap<>();
		responseData.put("user", user);
		responseData.put("checkoutInfo", checkoutInfo);
		responseData.put("cartItems", cartItems);

		return ResponseEntity.ok(responseData);
	}

	@PostMapping("/place_order/{userId}")
	public ResponseEntity<String> placeOrder(@PathVariable("userId") Integer userId) throws UserNotFoundException {
//		String paymentType = request.getParameter("paymentMethod");
		User user = userService.getUserById(userId);
		List<CartItem> cartItems = cartService.listCartItems(user);
		CheckoutInfo checkoutInfo = checkoutService.prepareCheckout(cartItems);
		Order createdOrder = orderService.createOrder(user, cartItems, checkoutInfo);
		cartService.deleteByUser(user);
		System.out.println(createdOrder);
		return ResponseEntity.status(HttpStatus.CREATED).body("Order placed successfully!");
	}

	private User getAuthenticatedUser(HttpServletRequest request){
		String email = Utility.getEmailOfAuthenticatedUser(request);
		return userService.getUserByEmail(email);
	}
//	private void sendOrderConfirmationEmail(HttpServletRequest request, Order order) throws UnsupportedEncodingException, MessagingException {
//		EmailSettingBag emailSettings = settingService.getEmailSettings();
//		JavaMailSenderImpl mailSender = Utility.prepareMailSender(emailSettings);
//		mailSender.setDefaultEncoding("utf-8");
//
//		String toAddress = order.getUser().getEmail();
//		String subject = emailSettings.getOrderConfirmationSubject();
//		String content = emailSettings.getOrderConfirmationContent();
//
//		subject = subject.replace("[[orderId]]", String.valueOf(order.getId()));
//
//		MimeMessage message = mailSender.createMimeMessage();
//		MimeMessageHelper helper = new MimeMessageHelper(message);
//
//		helper.setFrom(emailSettings.getFromAddress(), emailSettings.getSenderName());
//		helper.setTo(toAddress);
//		helper.setSubject(subject);
//
//		SimpleDateFormat dateFormatter = new SimpleDateFormat("HH:mm:ss E, dd MM yyyy");
//		String orderTime = dateFormatter.format(order.getOrderTime());
//
//		CurrencySettingBag currencySettings = settingService.getCurrencySettings();
//		String totalAmount = Utility.formatCurrency(order.getTotal(), currencySettings);
//
//		content = content.replace("[[name]]", order.getUser().getFullName());
//		content = content.replace("[[orderId]]", String.valueOf(order.getId()));
//		content = content.replace("[[orderTime]]", orderTime);
//		content = content.replace("[[shippingAddress]]", order.getShippingAddress());
//		content = content.replace("[[total]]", totalAmount);
//		content = content.replace("[[paymentMethod]]", order.getPaymentMethod().toString());
//
//		helper.setText(content, true);
//		mailSender.send(message);
//	}
	
//	@PostMapping("/process_paypal_order")
//	public String processPayPalOrder(HttpServletRequest request, Model model)
//			throws UnsupportedEncodingException, MessagingException{
//		String orderId = request.getParameter("orderId");
//
//		String pageTitle = "Checkout Failure";
//		String message = null;
//
//		try {
//			if(paypalService.validateOrder(orderId)) {
//				return placeOrder(request);
//			}else {
//				pageTitle = "Checkout Failure";
//				message = "ERROR: Transaction could not be completed because order infomation is invalid";
//			}
//		} catch (PayPalApiException e) {
//			message = "ERROR: Transaction failed due to error: " + e.getMessage();
//		}
//		model.addAttribute("pageTitle", pageTitle);
//		model.addAttribute("message", message);
//		return "message";
//	}
	
}
