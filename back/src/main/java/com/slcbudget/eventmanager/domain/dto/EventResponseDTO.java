package com.slcbudget.eventmanager.domain.dto;

import com.slcbudget.eventmanager.domain.TypeEvent;

public record EventResponseDTO(
    Long event_id,
    String name,
    String description,
    TypeEvent type,
    Long owner_id,
    String picture
) {
    public EventResponseDTO(Long eventId, EventDataDTO eventDataDTO, String picture) {
        this(eventId, eventDataDTO.name(), eventDataDTO.description(), eventDataDTO.type(), eventDataDTO.owner_id(), picture);
    }

    public EventResponseDTO(Long eventId, EventDataEditDTO eventDataEditDTO, String picture, Long owner_id) {
        this(eventId, eventDataEditDTO.name(), eventDataEditDTO.description(), eventDataEditDTO.type(), owner_id, picture);
    }

}
