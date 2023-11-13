package com.slcbudget.eventmanager.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.slcbudget.eventmanager.domain.EventContact;
import com.slcbudget.eventmanager.domain.projections.EventContactProjection;
import com.slcbudget.eventmanager.domain.projections.EventInfoProjection;

public interface EventContactRepository extends JpaRepository<EventContact, Long> {

  @Query("SELECT " +
  "ec.event_contact_id as event_contact_id, " + 
  "ec.contact.id as contactId, " + 
  "ec.contact.email as contactEmail, " + 
  "ec.contact.name as contactName, " + 
  "ec.contact.lastName as contactLastName, " + 
  "ec.contact.username as contactUsername, " + 
  "ec.contact.profileImage as contactProfileImage " + 
  "FROM EventContact ec " + 
  "WHERE ec.event.id = :eventId")
  Page<EventContactProjection> findEventContactByEventId(@Param("eventId") Long eventId, Pageable pageable);

  @Query("SELECT " + 
  "ec.event.event_id as event_id, " + 
  "ec.event.name as name, " +
  "ec.event.description as description, " + 
  "ec.event.type as type, " + 
  "ec.event.picture as picture, " + 
  "ec.event.owner.id as owner_id, " + 
  "ec.event.owner.email as ownerEmail, " + 
  "ec.event.owner.name as ownerName, " + 
  "ec.event.owner.username as ownerUsername, " + 
  "ec.event.owner.profileImage as ownerProfileImage " + 
  "FROM EventContact ec WHERE ec.contact.id = :contactId")
  Page<EventInfoProjection> findEventsByContactId(@Param("contactId") Long contactId, Pageable pageable);
}
