package com.bookstore.bookstoreapi.entity.shoppingCart;

import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.Date;


public class CheckoutInfo {
	private float bookCost;
	private float bookTotal;
	private float shippingCostTotal;
	private float paymentTotal;
	private int deliverDays;
	private Date deliverDate;
	public float getBookCost() {
		return bookCost;
	}
	public void setBookCost(float bookCost) {
		this.bookCost = bookCost;
	}
	public float getBookTotal() {
		return bookTotal;
	}
	public void setBookTotal(float bookTotal) {
		this.bookTotal = bookTotal;
	}
	public float getShippingCostTotal() {
		return shippingCostTotal;
	}
	public void setShippingCostTotal(float shippingCostTotal) {
		this.shippingCostTotal = shippingCostTotal;
	}
	public float getPaymentTotal() {
		return paymentTotal;
	}
	public void setPaymentTotal(float paymentTotal) {
		this.paymentTotal = paymentTotal;
	}
	public int getDeliverDays() {
		return deliverDays;
	}
	public void setDeliverDays(int deliverDays) {
		this.deliverDays = deliverDays;
	}
	public Date getDeliverDate() {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, deliverDays);
		
		return calendar.getTime();
	}
	public void setDeliverDate(Date deliverDate) {
		this.deliverDate = deliverDate;
	}

//	public String getPaymentTotal4Paypal() {
//		DecimalFormat formatter = new DecimalFormat("##.##");
//		return formatter.format(paymentTotal);
//	}
}
