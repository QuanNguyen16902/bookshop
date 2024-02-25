package com.bookstore.bookstoreapi.service;

import com.bookstore.bookstoreapi.entity.Review;
import com.bookstore.bookstoreapi.repository.BookRepository;
import com.bookstore.bookstoreapi.repository.ReviewRepository;
import com.bookstore.bookstoreapi.requestmodels.ReviewRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {

    private ReviewRepository reviewRepository;

    public ReviewService( ReviewRepository reviewRepository){
        this.reviewRepository = reviewRepository;
    }

    public void postReview(String userId, ReviewRequest reviewRequest) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userId, reviewRequest.getBookId());
        if (validateReview != null) {
            throw new Exception("Review already created");
        }

        Review review = new Review();
        review.setBookId(reviewRequest.getBookId());
        review.setRating(reviewRequest.getRating());
        review.setUserEmail(userId);
//        review.setUserId(userId);
        if(reviewRequest.getReviewDescription().isPresent()){
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Object::toString
            ).orElse(null));
        }

        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }

    public Boolean userReviewList(Integer userId, Integer bookId){
        Review validateReview = reviewRepository.findByUserIdAndBookId(userId, bookId);
        if(validateReview != null){
            return true;
        }else{
            return false;
        }
    }
}
