package com.bookstore.bookstoreapi.service;

import java.util.List;

import com.bookstore.bookstoreapi.entity.shoppingCart.CartItem;
import com.bookstore.bookstoreapi.entity.shoppingCart.CheckoutInfo;
import org.springframework.stereotype.Service;


@Service
public class CheckoutService {
	private static final int DIM_DIVISOR = 139;
	
	public CheckoutInfo prepareCheckout(List<CartItem> cartItems) {
		CheckoutInfo checkoutInfo = new CheckoutInfo();
		
		float bookCost = calculateBookCost(cartItems);
		float bookTotal = calculateBookTotal(cartItems);
		float shippingCostTotal = calculateShippingCost(cartItems);
		float paymenTotal = bookTotal + shippingCostTotal;
		
		checkoutInfo.setBookCost(bookCost);
		checkoutInfo.setBookTotal(bookTotal);
		checkoutInfo.setShippingCostTotal(30);
		checkoutInfo.setPaymentTotal(paymenTotal);
		
		checkoutInfo.setDeliverDays(3);
		return checkoutInfo;
	}

	private float calculateShippingCost(List<CartItem> cartItems) {
		return 30;
	}

	private float calculateBookTotal(List<CartItem> cartItems) {
		float total = 0.0f;
		
		for(CartItem item : cartItems) {
			total += item.getSubTotal();
		}
		return total;
	}

	private float calculateBookCost(List<CartItem> cartItems) {
		float cost = 0.0f;
		
		for(CartItem item : cartItems) {
			cost += item.getQuantity() * item.getBook().getCost();
		}
		return cost;
	}
	
}
