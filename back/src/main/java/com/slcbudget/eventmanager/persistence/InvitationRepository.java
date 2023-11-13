package com.slcbudget.eventmanager.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.slcbudget.eventmanager.domain.Event;
import com.slcbudget.eventmanager.domain.Invitation;
import com.slcbudget.eventmanager.domain.projections.InvitationContactInfoProjection;
import com.slcbudget.eventmanager.domain.projections.InvitationEventInfoProjection;

import java.util.List;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {

  @Query("SELECT " +
  "i.invitation_id as invitation_id, " + 
  "i.invitation_state as invitation_state, " + 
  "i.contact.id as contactId, " + 
  "i.contact.email as contactEmail, " + 
  "i.contact.name as contactName, " + 
  "i.contact.lastName as contactLastName, " + 
  "i.contact.username as contactUsername, " + 
  "i.contact.profileImage as contactProfileImage " + 
  "FROM Invitation i " + 
  "WHERE i.event.event_id = :eventId AND i.invitation_state = com.slcbudget.eventmanager.domain.InvitationState.PENDING")
  Page<InvitationContactInfoProjection> findInvitationsByEventId(@Param("eventId") Long eventId, Pageable pageable);

  @Query("SELECT i FROM Invitation i WHERE i.event.event_id = :eventId")
  List<Invitation> findInvitationsByEventId(@Param("eventId") Long eventId);

  @Query("SELECT " +
  "i.invitation_id as invitation_id, " + 
  "i.invitation_state as invitation_state, " + 
  "i.event.event_id as event_id, " + 
  "i.event.name as eventName, " + 
  "i.event.description as eventDescription, " + 
  "i.event.type as eventType, " + 
  "i.event.picture as eventPicture, " + 
  "i.event.owner.id as eventOwnerId, " + 
  "i.event.owner.name as eventOwnerName, " + 
  "i.event.owner.email as eventOwnerEmail, " + 
  "i.event.owner.profileImage as eventOwnerProfileImage " + 
  "FROM Invitation i " + 
  "WHERE i.contact.id = :contactId AND i.invitation_state = com.slcbudget.eventmanager.domain.InvitationState.PENDING")
  Page<InvitationEventInfoProjection> findInvitationsByContactId(@Param("contactId") Long contactId, Pageable pageable);
}
