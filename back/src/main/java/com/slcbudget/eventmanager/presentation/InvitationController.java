package com.slcbudget.eventmanager.presentation;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.slcbudget.eventmanager.domain.Event;
import com.slcbudget.eventmanager.domain.EventContact;
import com.slcbudget.eventmanager.domain.Invitation;
import com.slcbudget.eventmanager.domain.InvitationState;
import com.slcbudget.eventmanager.domain.UserEntity;
import com.slcbudget.eventmanager.domain.dto.InvitationCreateDTO;
import com.slcbudget.eventmanager.domain.dto.InvitationResponseDTO;
import com.slcbudget.eventmanager.domain.projections.InvitationContactInfoProjection;
import com.slcbudget.eventmanager.domain.projections.InvitationEventInfoProjection;
import com.slcbudget.eventmanager.persistence.EventContactRepository;
import com.slcbudget.eventmanager.persistence.EventRepository;
import com.slcbudget.eventmanager.persistence.InvitationRepository;
import com.slcbudget.eventmanager.persistence.UserRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/invitation")
public class InvitationController {

  @Autowired
  private InvitationRepository invitationRepository;

  @Autowired
  private EventContactRepository eventContactRepository;
  
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private EventRepository eventRepository;

  @GetMapping("{id}")
  public ResponseEntity<Invitation> getInvitationById(@PathVariable Long id) {
    Optional<Invitation> optionalInvitation = invitationRepository.findById(id);

    if (optionalInvitation.isPresent()) {
      Invitation invitation = optionalInvitation.get();
      return ResponseEntity.ok().body(invitation);
    }
    return ResponseEntity.badRequest().build();
  }

  @GetMapping("/user/{contactId}")
  public ResponseEntity<Page<InvitationEventInfoProjection>> getInvitationByUserId(@PathVariable Long contactId,
    @PageableDefault(size = 3) Pageable pagination) {
    Page<InvitationEventInfoProjection> optionalInvitation = invitationRepository.findInvitationsByContactId(contactId, pagination);

      return ResponseEntity.ok().body(optionalInvitation);
  }

  /**
   * 
   * @param event_id
   * @param pagination
   * @return all invitations by eventId with invitation_state='PENDING'
   */
  @GetMapping("/by-event/{event_id}")
  public ResponseEntity<Page<InvitationContactInfoProjection>> getInvitationByEventId(@PathVariable Long event_id,
      @PageableDefault(size = 3) Pageable pagination) {
        
    Page<InvitationContactInfoProjection> invitations = invitationRepository.findInvitationsByEventId(event_id, pagination);
    return ResponseEntity.ok(invitations);
  }

  @GetMapping("/by-event/two/{event_id}")
  public ResponseEntity<List<Invitation>> getInvitationByEventId2(@PathVariable Long event_id) {
        
    List<Invitation> invitations = invitationRepository.findInvitationsByEventId(event_id);
    return ResponseEntity.ok(invitations);
  }

  @PostMapping("/create")
  @Transactional
  public ResponseEntity<?> createInvitation(
      @Valid @RequestBody InvitationCreateDTO invitationCreateDTO) {

    try {
      Optional<UserEntity> contactOptional = userRepository.findById(invitationCreateDTO.contactId());
      Optional<Event> eventOptional = eventRepository.findById(invitationCreateDTO.eventId());

      if (contactOptional.isPresent() && eventOptional.isPresent()) {
        UserEntity contact = contactOptional.get();
        Event event = eventOptional.get();

        List<Invitation> existingInvitations = invitationRepository.findInvitationsByEventId(invitationCreateDTO.eventId());

        boolean hasPendingOrAcceptedInvitation = existingInvitations.stream()
          .anyMatch(invitation -> invitation.getContact().equals(contact)
          && (invitation.getInvitation_state() == InvitationState.PENDING
                  || invitation.getInvitation_state() == InvitationState.ACCEPTED));

        boolean hasRejectedInvitation = existingInvitations.stream()
          .anyMatch(invitation -> invitation.getInvitation_state() == InvitationState.REJECTED);

        Invitation invitationFinal = null;

        if (hasPendingOrAcceptedInvitation) {
          return ResponseEntity.badRequest().body("El contacto ya tiene una invitación pendiente o aceptada.");
        } else if (hasRejectedInvitation) {
          invitationFinal = existingInvitations.stream()
            .filter(invitation -> invitation.getContact().equals(contact)
                    && invitation.getInvitation_state() == InvitationState.REJECTED)
            .findFirst()
            .orElse(null);
            if (invitationFinal != null) {
              invitationFinal.setInvitation_state(InvitationState.PENDING);

              invitationRepository.save(invitationFinal);
          }
        } else {
          invitationFinal = invitationRepository
              .save(new Invitation(contact, event, InvitationState.PENDING));
        }
        InvitationResponseDTO invitationResponseDTO = new InvitationResponseDTO(invitationFinal);
        return ResponseEntity.ok(invitationResponseDTO);
      } else {
        return ResponseEntity.notFound().build();
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error desconocido" + e.getMessage());
    }

  }

  @GetMapping("/update/{invitation_id}")
  public ResponseEntity<InvitationResponseDTO> acceptInvitation(@PathVariable Long invitation_id,
      @RequestParam InvitationState invitationState) {

    Optional<Invitation> optionalInvitation = invitationRepository.findById(invitation_id);

    if (optionalInvitation.isPresent()) {
      Invitation invitation = optionalInvitation.get();

    InvitationResponseDTO invitationResponseDTO = null;

      switch (invitationState) {
        case ACCEPTED:
          invitation.setInvitation_state(InvitationState.ACCEPTED);
          invitationRepository.save(invitation);
          EventContact eventContact = new EventContact();
          eventContact.setEvent(invitation.getEvent());
          eventContact.setContact(invitation.getContact());
          eventContactRepository.save(eventContact);
          invitationResponseDTO = new InvitationResponseDTO(invitation);
          return ResponseEntity.ok(invitationResponseDTO);
          
          case REJECTED:
          invitation.setInvitation_state(InvitationState.REJECTED);
          invitationRepository.save(invitation);
          invitationResponseDTO = new InvitationResponseDTO(invitation);
          return ResponseEntity.ok(invitationResponseDTO);
        default:
          return ResponseEntity.badRequest().build();
      }
    } else {
      return ResponseEntity.notFound().build();
    }
  }

}
