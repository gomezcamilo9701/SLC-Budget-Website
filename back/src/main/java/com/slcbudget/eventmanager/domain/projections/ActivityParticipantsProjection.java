package com.slcbudget.eventmanager.domain.projections;

import java.math.BigDecimal;

public interface ActivityParticipantsProjection {

    Long getActivityParticipationId();
    BigDecimal getParticipationPercent();
    BigDecimal getStaticValueParticipation();
    Long getUserId();
    String getEmail();
    String getName();
    String getLastName();
    String getUsername();
    String getProfileImage();
}

