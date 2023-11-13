package com.slcbudget.eventmanager.persistence;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.slcbudget.eventmanager.domain.Activity;
import com.slcbudget.eventmanager.domain.Event;
import com.slcbudget.eventmanager.domain.projections.EventProjection;

public interface EventRepository extends JpaRepository<Event, Long> {
  
  @Query("SELECT " + 
    "e.event_id as event_id," +
    "e.name as name," +
    "e.description as description, "+ 
    "e.type as type, "+ 
    "e.picture as picture, "+ 
    "e.owner.id as owner_id "+ 
    "FROM Event e " +
    "WHERE e.owner.id = :userId")
  Page<EventProjection> findEventsByOwnerId(@Param("userId") Long userId, Pageable pageable);

  @Query("SELECT a FROM Activity a WHERE a.event.event_id = :eventId")
  Page<Activity> findActivitiesByEventId(@Param("eventId") Long eventId, Pageable pageable);

  Page<Event> findByOwnerId(Long userId, Pageable pageable);

}
