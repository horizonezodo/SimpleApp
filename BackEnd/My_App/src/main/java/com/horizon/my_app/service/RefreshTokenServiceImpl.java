package com.horizon.my_app.service;

import com.horizon.my_app.exception.TokenRefreshException;
import com.horizon.my_app.models.RefreshToken;
import com.horizon.my_app.repository.RefreshTokenRepository;
import com.horizon.my_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenServiceImpl {
    @Value("${jwtRefreshExpirationMs}")
    private long refreshTokenDurationMs;

    @Autowired
    RefreshTokenRepository repo;

    @Autowired
    UserRepository userRepo;

    public Optional<RefreshToken> findByToken(String token){
        return repo.findByToken(token);
    }

    public RefreshToken createRefreshToken(Long userID){
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(userRepo.findById(userID).get());
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken = repo.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token){
        if(token.getExpiryDate().compareTo(Instant.now()) < 0){
            repo.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token expiration. Please relogin");
        }
        return token;
    }

    public int deleteByUserId(Long userId){
        return repo.deleteByUser(userRepo.findById(userId).get());
    }
}
