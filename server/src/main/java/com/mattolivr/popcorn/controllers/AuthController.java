package com.mattolivr.popcorn.controllers;

import com.mattolivr.popcorn.domain.user.User;
import com.mattolivr.popcorn.dto.LoginRequestDTO;
import com.mattolivr.popcorn.dto.RegisterRequestDTO;
import com.mattolivr.popcorn.dto.RegisterResponseDTO;
import com.mattolivr.popcorn.infra.security.TokenService;
import com.mattolivr.popcorn.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body) {
        User user = this.repository.findByEmail(body.email())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new LoginRequestDTO(user.getName(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body) {
        Optional<User> user = this.repository.findByEmail(body.email());

        if (user.isEmpty()) {
            User newUser = new User();
            newUser.setName(body.name());
            newUser.setPassword(passwordEncoder.encode(body.password()));
            newUser.setEmail(body.email());

            newUser.setDisplayName("");
            newUser.setBirth(new Date());

            // TODO: preencher mais infos do usuário registrado

            this.repository.save(newUser);

            String token = this.tokenService.generateToken(newUser);
            return ResponseEntity.ok(new RegisterResponseDTO(newUser.getName(), token));
        }
        return ResponseEntity.badRequest().build();
    }
}
