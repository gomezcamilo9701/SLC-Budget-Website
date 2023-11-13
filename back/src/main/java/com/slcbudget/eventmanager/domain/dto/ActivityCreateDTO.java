package com.slcbudget.eventmanager.domain.dto;

import java.math.BigDecimal;
import java.util.Map;

public record ActivityCreateDTO(
    String description,
    BigDecimal value,
    Long eventId,
    Map<Long, ParticipationData> participationData
) {
    public record ParticipationData(BigDecimal participationPercentage, BigDecimal staticValue) {}
}

