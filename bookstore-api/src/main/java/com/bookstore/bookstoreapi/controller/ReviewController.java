package com.bookstore.bookstoreapi.controller;

import com.bookstore.bookstoreapi.jwt.ExtractJwt;
import com.bookstore.bookstoreapi.requestmodels.ReviewRequest;
import com.bookstore.bookstoreapi.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    public ReviewService reviewService;

//    @GetMapping("/secure/user/book")
//    public Boolean reviewBookByUser(@RequestHeader(value = "Authorization") String token,
//                                    @RequestParam Integer bookId) throws Exception{
//        String userEmail = ExtractJwt.payloadJWTExtract(token, "email");
//
//        if(userEmail == null){
//            throw new Exception("User email is missing");
//        }
//        return reviewService.userReviewList(userEmail, bookId);
//    }
    @GetMapping("/secure/user/{userId}/book/{bookId}")
    public Boolean reviewBookByUser(@PathVariable(value = "userId") Integer userId,
                                    @PathVariable(value = "bookId") Integer bookId) throws Exception{
//        String userEmail = ExtractJwt.payloadJWTExtract(token, "email");

        if(userId == null && userId.equals(0)){
            throw new Exception("User ID is missing");
        }
        return reviewService.userReviewList(userId, bookId);
    }

//    @PostMapping("/secure")
//    public void postReview(
//            @RequestHeader(value = "Authorization") String token,
//                           @RequestBody ReviewRequest reviewRequest) throws Exception{
//       String userEmail = ExtractJwt.payloadJWTExtract(token, "email");
//        if(userEmail == null){
//            throw new Exception("User email is missing");
//        }
//        reviewService.postReview(userEmail, reviewRequest);
//    }
    @PostMapping("/secure/{userId}")
    public void postReview(
        @PathVariable(value = "userId") String userId,
        @RequestBody ReviewRequest reviewRequest) throws Exception{
//    String userEmail = ExtractJwt.payloadJWTExtract(token, "email");
    if(userId == null){
        throw new Exception("User id is missing");
    }
    reviewService.postReview(userId, reviewRequest);
}
}
