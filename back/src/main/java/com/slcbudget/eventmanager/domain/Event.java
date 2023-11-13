package com.slcbudget.eventmanager.domain;

import java.util.HashSet;
import java.util.Set;

import com.slcbudget.eventmanager.domain.dto.EventDataDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "event")
public class Event {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long event_id;

  @NotBlank
  private String name;
  @NotBlank
  private String description;
  @Enumerated(EnumType.STRING)
  private TypeEvent type;
  @Column(nullable = true)
  private String picture;

  @ManyToOne
  @JoinColumn(name = "owner_id")
  private UserEntity owner;

  @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<Activity> activities = new HashSet<>();

  public Event(EventDataDTO eventDataDTO, UserEntity owner, String profilePath) {
    this.name = eventDataDTO.name();
    this.description = eventDataDTO.description();
    this.type = eventDataDTO.type();
    this.picture = profilePath;
    this.owner = owner;
  }

}
