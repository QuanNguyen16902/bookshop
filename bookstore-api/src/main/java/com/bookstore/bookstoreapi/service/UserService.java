package com.bookstore.bookstoreapi.service;

import java.util.Date;

import java.util.List;

import com.bookstore.bookstoreapi.entity.User;
import com.bookstore.bookstoreapi.exception.UserNotFoundException;
import com.bookstore.bookstoreapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;

import java.lang.String;
@Service
@Transactional
public class UserService {
	
//	@Autowired private CountryRepository countryRepo;
	@Autowired private UserRepository userRepo;
	
	 private PasswordEncoder passwordEncoder;
	 @Autowired @Lazy
	 private void passwordEncoder(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}
	

	public boolean isEmailUnique(String email) {
		User user = userRepo.findByEmail(email);
		return user == null;
	}
	public User getUserByEmail(String email) {
		return userRepo.findByEmail(email);
	}
	public User getUserById(Integer id) throws UserNotFoundException {
		return userRepo.findById(id).get();
	}

	private void encodePassword(User user) {
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
	}
	

//	private void setName(String name, User user) {
//		String[] nameArray = name.split(" ");
//		if(nameArray.length < 2) {
//			user.setFirstName(name);
//			user.setLastName("");
//		}else {
//			String firstName = nameArray[0];
//			user.setFirstName(firstName);
//
//			String lastName = name.replaceFirst(firstName + " ", "");
//			user.setLastName(lastName);
//		}
//	}
	

}
