package com.bookstore.bookstoreapi.repository;

import com.bookstore.bookstoreapi.entity.ERole;
import com.bookstore.bookstoreapi.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
  Optional<Role> findByName(ERole name);
}
