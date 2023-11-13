package com.slcbudget.eventmanager.presentation;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.slcbudget.eventmanager.domain.EventContact;
import com.slcbudget.eventmanager.domain.projections.EventContactProjection;
import com.slcbudget.eventmanager.domain.projections.EventInfoProjection;
import com.slcbudget.eventmanager.persistence.EventContactRepository;


@RestController
@RequestMapping("/event-contacts")
public class EventContactController {

  @Autowired
  private EventContactRepository eventContactRepository;

  @GetMapping("{id}")
  public ResponseEntity<EventContact> getEventContactById(@PathVariable Long id) {
    Optional<EventContact> eventCOptional = eventContactRepository.findById(id);

    if (eventCOptional.isPresent()) {
      EventContact eventContact = eventCOptional.get();
      return ResponseEntity.ok().body(eventContact);
    }
    return ResponseEntity.badRequest().build();
  }

  @GetMapping("/by-event/{event_id}")
  public ResponseEntity<Page<EventContactProjection>> getEventContactsByEventId(@PathVariable Long event_id,
      @PageableDefault(size = 3) Pageable pagination) {

    Page<EventContactProjection> eventContact = eventContactRepository.findEventContactByEventId(event_id, pagination);
    
    return ResponseEntity.ok(eventContact);
  }

    @GetMapping("by-contact/{contactId}")
  public ResponseEntity<Page<EventInfoProjection>> getEventsByContactId(@PathVariable Long contactId,
    @PageableDefault(size = 3) Pageable pagination) {
      Page<EventInfoProjection> events = eventContactRepository.findEventsByContactId(contactId, pagination);

      return ResponseEntity.ok().body(events);
  }
}
