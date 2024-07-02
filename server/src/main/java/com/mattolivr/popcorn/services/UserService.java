package com.mattolivr.popcorn.services;

import com.mattolivr.popcorn.domain.user.User;
import com.mattolivr.popcorn.dto.UserRequestDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Service
public class UserService {
    public User createUser(UserRequestDTO data) {
        String imgProfile = null;
        String imgBackground = null;

        if (data.imgProfile() != null) {
            imgProfile = this.uploadImage(data.imgProfile());
        }
        if (data.imgBackground() != null) {
            imgBackground = this.uploadImage(data.imgBackground());
        }

        User newUser = new User();

        newUser.setName(data.name());
        newUser.setPassword(data.password());
        newUser.setEmail(data.email());
        newUser.setDisplayName(data.displayName());
        newUser.setBirth(new Date(data.birth()));
        newUser.setImgProfile(imgProfile);
        newUser.setImgBackground(imgBackground);

        return newUser;
    }

    private String uploadImage(MultipartFile image) {
        return "";
    }
}
