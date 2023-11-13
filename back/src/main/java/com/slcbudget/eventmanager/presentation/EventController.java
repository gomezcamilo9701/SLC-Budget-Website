package com.slcbudget.eventmanager.presentation;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import com.slcbudget.eventmanager.domain.Activity;
import com.slcbudget.eventmanager.domain.Event;
import com.slcbudget.eventmanager.service.StorageService;
import com.slcbudget.eventmanager.domain.UserEntity;
import com.slcbudget.eventmanager.domain.dto.EventDataDTO;
import com.slcbudget.eventmanager.domain.dto.EventDataEditDTO;
import com.slcbudget.eventmanager.domain.dto.EventResponseDTO;
import com.slcbudget.eventmanager.persistence.EventRepository;
import com.slcbudget.eventmanager.persistence.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/event")
public class EventController {

  @Autowired
  private EventRepository eventRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private StorageService storageService;

  @GetMapping("{event_id}")
  public ResponseEntity<Event> getEventById(@PathVariable Long event_id,
    UriComponentsBuilder uriComponentsBuilder) {
    
    Optional<Event> optionalEvent = eventRepository.findById(event_id);

    if (optionalEvent.isPresent()) {
      Event event = optionalEvent.get();
      URI url = uriComponentsBuilder.path("/event/{id}").buildAndExpand(event.getEvent_id()).toUri();
      return ResponseEntity.created(url).body(event);
    }
    return ResponseEntity.notFound().build(); 
  }

  @PostMapping("/create")
  public ResponseEntity<EventResponseDTO> createEvent(@Valid @RequestPart("eventData") EventDataDTO eventDataDTO,
        @RequestPart(required = false) MultipartFile picture,
    UriComponentsBuilder uriComponentsBuilder) {

    String imageUrl = null;
    if (picture != null) {
      try {
        imageUrl = storageService.store(picture);
      } catch (IOException e) {
          return ResponseEntity.badRequest().build();
      }
    }

    Optional<UserEntity> userOptional = userRepository.findById(eventDataDTO.owner_id());
    
    if (userOptional.isPresent()) {
      UserEntity user = userOptional.get();
      Event event = eventRepository.save(new Event(eventDataDTO, user, imageUrl));
      URI url = uriComponentsBuilder.path("/event/{id}").buildAndExpand(event.getEvent_id()).toUri();

      EventResponseDTO responseDTO = new EventResponseDTO(event.getEvent_id(), eventDataDTO, imageUrl);
      return ResponseEntity.created(url).body(responseDTO);

    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PatchMapping("/update/{id}")
  public ResponseEntity<EventResponseDTO> updateEvent(@PathVariable Long id,
      @RequestPart("eventData") EventDataEditDTO eventDataEditDTO,
      @RequestPart(required = false) MultipartFile picture,
      UriComponentsBuilder uriComponentsBuilder) {

    Optional<Event> optionalEvent = eventRepository.findById(id);

    if (optionalEvent.isPresent()) {
        Event event = optionalEvent.get();

        String imageUrl = null;

        if (picture != null && !picture.isEmpty()) {
            try {
                imageUrl = storageService.store(picture);
                event.setPicture(imageUrl);
            } catch (IOException e) {
                return ResponseEntity.notFound().build();
            }
        }

        event.setName(eventDataEditDTO.name());
        event.setDescription(eventDataEditDTO.description());
        event.setType(eventDataEditDTO.type());

        eventRepository.save(event);

        URI url = uriComponentsBuilder.path("/event/{id}").buildAndExpand(event.getEvent_id()).toUri();
        EventResponseDTO responseDTO = new EventResponseDTO(event.getEvent_id(), eventDataEditDTO, event.getPicture(), event.getOwner().getId());
        return ResponseEntity.created(url).body(responseDTO);
    } else {
        return ResponseEntity.notFound().build();
    }
  }

  @GetMapping("/activities/{eventId}")
  public ResponseEntity<Page<Activity>> getActivitiesByEventId(@PathVariable Long eventId,
    @PageableDefault(size = 3) Pageable pagination) {
    Page<Activity> activities = eventRepository.findActivitiesByEventId(eventId, pagination);
    return ResponseEntity.ok(activities);
  }
}
