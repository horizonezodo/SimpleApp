package com.horizon.my_app.controller;

import com.horizon.my_app.exception.TokenRefreshException;
import com.horizon.my_app.jwt.JwtUtils;
import com.horizon.my_app.models.ERole;
import com.horizon.my_app.models.RefreshToken;
import com.horizon.my_app.models.Role;
import com.horizon.my_app.models.User;
import com.horizon.my_app.payload.request.LoginRequest;
import com.horizon.my_app.payload.request.RefreshTokenRequest;
import com.horizon.my_app.payload.request.RegisterRequest;
import com.horizon.my_app.payload.response.MessageResponse;
import com.horizon.my_app.payload.response.RefreshTokenResponse;
import com.horizon.my_app.payload.response.UserInfoResponse;
import com.horizon.my_app.repository.RefreshTokenRepository;
import com.horizon.my_app.repository.RoleRepository;
import com.horizon.my_app.repository.UserRepository;
import com.horizon.my_app.service.RefreshTokenServiceImpl;
import com.horizon.my_app.service.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager manager;

    @Autowired
    UserRepository useRepo;

    @Autowired
    RoleRepository roleRepo;

    @Autowired
    JwtUtils untils;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    RefreshTokenServiceImpl service;

    @PostMapping("/login")
    public ResponseEntity<?> authenticationUser(@Valid @RequestBody LoginRequest request){
        Authentication authentication = manager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwt = untils.generateJwtToken(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        RefreshToken refreshToken = service.createRefreshToken(userDetails.getId());
        return ResponseEntity.ok(
                new UserInfoResponse(
                        userDetails.getId(), userDetails.getUsername(),
                        userDetails.getEmail(), userDetails.getPhone()
                        , roles, jwt,refreshToken.getToken()
                ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request){
        if(useRepo.existsByUsername(request.getUsername())){
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username has been registered"));
        }
        if(useRepo.existsByEmail(request.getEmail())){
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email has been registered"));
        }
        if(useRepo.existsByPhone(request.getPhone())){
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Phone has been registered"));
        }
        User user = new User(request.getUsername(), request.getEmail(),
                            encoder.encode(request.getPassword()), request.getPhone());

        Set<String> strRole = request.getRoles();
        Set<Role> roles = new HashSet<>();

        if(strRole == null){
            Role userRole = roleRepo.findByName(ERole.ROLE_USER)
                    .orElseThrow(()-> new RuntimeException("Error: Role is not found"));
            roles.add(userRole);
        }else{
            strRole.forEach(role ->{
                switch (role){
                    case "admin":
                        Role admin = roleRepo.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(()-> new RuntimeException("Error: Role is not found"));
                        roles.add(admin);
                        break;
                    case "manager":
                        Role manager = roleRepo.findByName(ERole.ROLE_MANAGER)
                                .orElseThrow(()-> new RuntimeException("Error: Role is not found"));
                        roles.add(manager);
                        break;
                    case "mod":
                        Role mod = roleRepo.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(()-> new RuntimeException("Error: Role is not found"));
                        roles.add(mod);
                        break;
                    default:
                        Role userRole = roleRepo.findByName(ERole.ROLE_USER)
                                .orElseThrow(()-> new RuntimeException("Error: Role is not found"));
                        roles.add(userRole);
                        break;
                }
            });
        }
        user.setRoles(roles);
        useRepo.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered"));
    }

    @PostMapping("refreshToken")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenRequest request){
        String requestRefreshTOken = request.getRefreshToken();
        return service.findByToken(requestRefreshTOken)
                .map(service::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user ->{
                    String token = untils.generateTokenFromUsername(user.getUsername());
                    return ResponseEntity.ok(new RefreshTokenResponse(token, requestRefreshTOken));
                }).orElseThrow(()-> new TokenRefreshException(
                        requestRefreshTOken, "Refresh Token not found"
                ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(userDetails);
        Long userId = userDetails.getId();
        service.deleteByUserId(userId);
        return ResponseEntity.ok(new MessageResponse("Logout Successfull"));
    }

    @GetMapping("/he")
    public String getHe(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("authentication"+ authentication);
        return "ok";
    }
}
