package com.slcbudget.eventmanager.domain.projections;
public interface EventProjection {
    Long getEvent_id();
    String getName();
    String getDescription();
    String getType();
    String getPicture();
    Long getOwner_id();
}