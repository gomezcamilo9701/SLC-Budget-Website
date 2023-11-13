package com.slcbudget.eventmanager.domain.projections;

public interface EventContactProjection {
    Long getEvent_contact_id();
    Long getContactId();
    String getContactEmail();
    String getContactName();
    String getContactLastName();
    String getContactUsername();
    String getContactProfileImage();
}