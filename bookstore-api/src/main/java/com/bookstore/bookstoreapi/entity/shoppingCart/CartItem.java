package com.bookstore.bookstoreapi.entity.shoppingCart;


import com.bookstore.bookstoreapi.entity.Book;
import com.bookstore.bookstoreapi.entity.User;

import javax.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItem{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer id;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "book_id")
	private Book book;
	
	private int quantity;
	
	@Transient
	private float shippingCost;
	
	
	public CartItem(Integer id) {
		this.id = id;
	}

	public CartItem() {
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	@Override
	public String toString() {
		return "CartItem [id=" + id + ", user=" + user.getUsername() + ", book=" + book.getDescription() + ", quantity=" + quantity
				+ "]";
	}
	
	@Transient
	public float getSubTotal() {
		return book.getDiscountPrice() * quantity;
	}
	
	@Transient
	public float getShippingCost() {
		return shippingCost;
	}

	public void setShippingCost(float shippingCost) {
		this.shippingCost = shippingCost;
	}
	
}
