package com.mattolivr.popcorn.dto.auth;

import com.mattolivr.popcorn.domain.user.User;

public record AuthResponseDTO(User user, String token) {}
