package com.bookstore.bookstoreapi.repository;

import com.bookstore.bookstoreapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByUsername(String username);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);

  @Query("SELECT c FROM User c WHERE c.email = ?1")
  public User findByEmail(String email);

  public Optional<User> findById(Integer id);
}
