package com.bookstore.bookstoreapi.service;

import com.bookstore.bookstoreapi.entity.Message;
import com.bookstore.bookstoreapi.repository.MessageRepository;
import com.bookstore.bookstoreapi.requestmodels.AdminQuestionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MessageService {
	@Autowired
	private MessageRepository messageRepository;

	public void postMessage(Message messageRequest, String email) {
		Message message = new Message(messageRequest.getTitle(), messageRequest.getQuestion());
		message.setUserEmail(email);
		messageRepository.save(message);
	}

	public void putMessage(AdminQuestionRequest questionRequest, String email) throws Exception {
		Optional<Message> message = messageRepository.findById(questionRequest.getId());
		if (!message.isPresent()) {
			throw new Exception("Message not found");
		}

		message.get().setAdminEmail(email);
		message.get().setResponse(questionRequest.getResponse());
		message.get().setClosed(true);
		messageRepository.save(message.get());
	}
}
