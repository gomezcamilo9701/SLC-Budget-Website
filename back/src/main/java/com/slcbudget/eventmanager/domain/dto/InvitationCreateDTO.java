package com.slcbudget.eventmanager.domain.dto;

import jakarta.validation.constraints.NotNull;

public record InvitationCreateDTO(
    @NotNull Long eventId,
    @NotNull Long contactId) {
}
