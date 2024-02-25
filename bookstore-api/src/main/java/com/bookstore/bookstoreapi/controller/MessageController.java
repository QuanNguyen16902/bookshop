package com.bookstore.bookstoreapi.controller;

import com.bookstore.bookstoreapi.entity.Message;
import com.bookstore.bookstoreapi.entity.User;
import com.bookstore.bookstoreapi.exception.UserNotFoundException;
import com.bookstore.bookstoreapi.jwt.ExtractJwt;
import com.bookstore.bookstoreapi.requestmodels.AdminQuestionRequest;
import com.bookstore.bookstoreapi.service.MessageService;
import com.bookstore.bookstoreapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/messages")
public class MessageController {

	@Autowired
	private MessageService messageService;

	@Autowired private UserService userService;
	@PostMapping("/secure/add/message/{userId}")
	public void postMessage(@PathVariable("userId") Integer id, @RequestBody Message message) throws UserNotFoundException {
		User user = userService.getUserById(id);
		messageService.postMessage(message, user.getEmail());
	}

	@PutMapping("/secure/admin/message/{userId]")
	public void putMessage(@PathVariable("userId") Integer id,
			@RequestBody AdminQuestionRequest questionRequest) throws Exception {

		User user = userService.getUserById(id);
		messageService.putMessage(questionRequest, user.getEmail());
	}

}
