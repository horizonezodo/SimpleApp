package com.horizon.my_app.repository;

import com.horizon.my_app.models.RefreshToken;
import com.horizon.my_app.models.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    @Transactional
    int deleteByUser(User user);
}
