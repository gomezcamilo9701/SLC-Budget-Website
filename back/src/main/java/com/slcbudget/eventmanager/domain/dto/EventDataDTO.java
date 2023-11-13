package com.slcbudget.eventmanager.domain.dto;

import com.slcbudget.eventmanager.domain.TypeEvent;

public record EventDataDTO (String name, String description, TypeEvent type, Long owner_id) {

}
