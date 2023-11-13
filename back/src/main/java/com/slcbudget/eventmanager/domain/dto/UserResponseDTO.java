package com.slcbudget.eventmanager.domain.dto;

import com.slcbudget.eventmanager.domain.UserEntity;

public record UserResponseDTO(
  Long id,
  String name,
  String lastName,
  String email,
  String username,
  String profileImage
  ) {

    public UserResponseDTO(UserEntity userEntity) {
      this(userEntity.getId(), userEntity.getName(), userEntity.getLastName(), userEntity.getEmail(),
       userEntity.getUsername(), userEntity.getProfileImage());
    }
}
