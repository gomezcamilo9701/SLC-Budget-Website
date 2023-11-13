package com.slcbudget.eventmanager.domain.dto;

import com.slcbudget.eventmanager.domain.Invitation;
import com.slcbudget.eventmanager.domain.InvitationState;

public record InvitationResponseDTO(
  Long invitation_id,
  Long contactId,
  String contactEmail,
  String contactName,
  String contactLastName,
  String contactUsername,
  String contactProfileImage,
  InvitationState invitation_state
  ) {
  
    public InvitationResponseDTO(Invitation invitation) {
    this(invitation.getInvitation_id(), invitation.getContact().getId(), invitation.getContact().getEmail(),
    invitation.getContact().getName(), invitation.getContact().getLastName(), invitation.getContact().getUsername(),
    invitation.getContact().getProfileImage(), invitation.getInvitation_state());
  }
}
