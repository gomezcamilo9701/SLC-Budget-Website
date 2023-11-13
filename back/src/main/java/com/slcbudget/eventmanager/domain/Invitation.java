package com.slcbudget.eventmanager.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "invitation")
public class Invitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invitation_id;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @ManyToOne
    @JoinColumn(name = "contact_id")
    private UserEntity contact;

    private InvitationState invitation_state;

    public Invitation(UserEntity contact, Event event, InvitationState invitationState) {
        this.contact = contact;
        this.event = event;
        this.invitation_state = invitationState;
    }

    @Override
    public int hashCode() {
      final int prime = 31;
      int result = 1;
      result = prime * result + ((invitation_id == null) ? 0 : invitation_id.hashCode());
      result = prime * result + ((contact == null) ? 0 : contact.hashCode());
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
  
        if (o.getClass() != Invitation.class) {
          return false;
        }
  
        Invitation invitation = (Invitation) o;
        return invitation.getInvitation_id().equals(this.invitation_id) &&
          invitation.getContact().equals(this.contact);
      }

}
