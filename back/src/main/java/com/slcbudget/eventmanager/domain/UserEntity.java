package com.slcbudget.eventmanager.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Email
  @NotBlank
  @Size(max = 80)
  @Column(unique = true)
  private String email;

  private String name;
  private String lastName;

  @NotBlank
  @Size(max = 30)
  private String username;

  @NotBlank
  private String password;

  @Column(name = "profile_image", nullable = true)
  private String profileImage;

  @ManyToMany(fetch = FetchType.EAGER, targetEntity = RoleEntity.class, cascade = CascadeType.PERSIST)
  @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<RoleEntity> roles;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "user_contacts", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "contact_id"))
  private Set<UserEntity> contacts;

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((id == null) ? 0 : id.hashCode());
    result = prime * result + ((email == null) ? 0 : email.hashCode());
    result = prime * result + ((username == null) ? 0 : username.hashCode());
    return result;
  }

  @Override
    public boolean equals(Object o) {
      if (this == o) {
        return true;
      }
      if (o == null) {
        return false;
      }

      if (o.getClass() != UserEntity.class) {
        return false;
      }

      UserEntity user = (UserEntity) o;
      return user.getEmail().equals(this.email) &&
        user.getId().equals(this.id);
    }
}
