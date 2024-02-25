package com.bookstore.bookstoreapi;


import org.springframework.security.authentication.RememberMeAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.servlet.http.HttpServletRequest;

public class Utility {
	public static String getSiteURL(HttpServletRequest request) {
		String siteURL = request.getRequestURL().toString();
		
		return siteURL.replace(request.getServletPath(), "");
		
	}
//	public static JavaMailSenderImpl prepareMailSender(EmailSettingBag settings) {
//		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//
//		mailSender.setHost(settings.getHost());
//		mailSender.setPort(settings.getPort());
//		mailSender.setUsername(settings.getUsername());
//		mailSender.setPassword(settings.getPassword());
//
//		Properties mailProperties = new Properties();
//
//		mailProperties.setProperty("mail.smtp.auth", settings.getSmtpAuth());
//		mailProperties.setProperty("mail.smtp.starttls.enable", settings.getSmtpSecured());
//
//		mailSender.setJavaMailProperties(mailProperties);
//
//		return mailSender;
//	}
	public static String getEmailOfAuthenticatedUser(HttpServletRequest request) {
		Object principal = request.getUserPrincipal();
		if(principal == null) return null;

		//		if(principal instanceof UsernamePasswordAuthenticationToken ||
//				principal instanceof RememberMeAuthenticationToken) {
//			userEmail = ;
//
//		}
		return request.getUserPrincipal().getName();
	}
	

 
}
