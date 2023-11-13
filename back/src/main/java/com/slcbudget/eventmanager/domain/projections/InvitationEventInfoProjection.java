package com.slcbudget.eventmanager.domain.projections;

import com.slcbudget.eventmanager.domain.InvitationState;
import com.slcbudget.eventmanager.domain.TypeEvent;

public interface InvitationEventInfoProjection {
    Long getInvitation_id();
    InvitationState getInvitation_state();
    Long getEvent_id();
    String getEventName();
    String getEventDescription();
    TypeEvent getEventType();
    String getEventPicture();
    String getEventOwnerId();
    String getEventOwnerName();
    String getEventOwnerEmail();
    String getEventOwnerProfileImage();
}