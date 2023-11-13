package com.slcbudget.eventmanager.domain.dto;

import com.slcbudget.eventmanager.domain.TypeEvent;

public record EventDataEditDTO (    
    String name, 
    String description, 
    TypeEvent type)  {

}
