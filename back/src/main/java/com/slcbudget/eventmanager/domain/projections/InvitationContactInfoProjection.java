package com.slcbudget.eventmanager.domain.projections;

public interface InvitationContactInfoProjection {
    Long getInvitation_id();
    Long getContactId();
    String getContactEmail();
    String getContactName();
    String getContactLastName();
    String getContactUsername();
    String getContactProfileImage();
    String getInvitation_state();

}