package com.mattolivr.popcorn.dto;

import org.springframework.web.multipart.MultipartFile;

public record UserRequestDTO(String name, String email, String password, String displayName, Long birth,
                             MultipartFile imgProfile, MultipartFile imgBackground) {
}
