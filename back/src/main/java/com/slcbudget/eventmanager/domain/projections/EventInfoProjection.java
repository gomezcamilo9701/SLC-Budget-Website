package com.slcbudget.eventmanager.domain.projections;

public interface EventInfoProjection {
    Long getEvent_id();
    String getName();
    String getDescription();
    String getType();
    String getPicture();
    Long getOwner_id();
    String getOwnerName();
    String getOwnerEmail();
    String getOwnerUsername();
    String getOwnerProfileImage();
}