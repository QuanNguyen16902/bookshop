package com.bookstore.bookstoreapi.service;

import java.util.Date;
import java.util.List;
import java.util.Set;

import com.bookstore.bookstoreapi.entity.Book;
import com.bookstore.bookstoreapi.entity.User;
import com.bookstore.bookstoreapi.entity.shoppingCart.CartItem;
import com.bookstore.bookstoreapi.entity.shoppingCart.CheckoutInfo;
import com.bookstore.bookstoreapi.entity.shoppingCart.Order;
import com.bookstore.bookstoreapi.entity.shoppingCart.OrderDetail;
import com.bookstore.bookstoreapi.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class OrderService {
	@Autowired
	OrderRepository repo;
	public Order createOrder(User customer, List<CartItem> cartItems, CheckoutInfo checkoutInfo) {
		Order newOrder = new Order();
		newOrder.setOrderTime(new Date());
		

		newOrder.setUser(customer);
		newOrder.setBookCost(checkoutInfo.getBookCost());
		newOrder.setSubtotal(checkoutInfo.getBookTotal());
		newOrder.setShippingCost(checkoutInfo.getShippingCostTotal());
		newOrder.setTax(0.0f);
		newOrder.setTotal(checkoutInfo.getPaymentTotal());
		newOrder.setDeliverDays(checkoutInfo.getDeliverDays());
		newOrder.setDeliverDate(checkoutInfo.getDeliverDate());
		

		
		Set<OrderDetail> orderDetails = newOrder.getOrderDetails();
		for(CartItem cartItem : cartItems) {
			Book book = cartItem.getBook();
			
			OrderDetail orderDetail = new OrderDetail();
			orderDetail.setOrder(newOrder);
			orderDetail.setBook(book);
			orderDetail.setQuantity(cartItem.getQuantity());
			orderDetail.setUnitPrice(book.getDiscountPercent());
			orderDetail.setBookCost(book.getCost() * cartItem.getQuantity());
			orderDetail.setSubtotal(cartItem.getSubTotal());
			orderDetail.setShippingCost(cartItem.getShippingCost());
			
			orderDetails.add(orderDetail);
		}
		
		return repo.save(newOrder);
	}
}
