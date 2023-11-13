package com.slcbudget.eventmanager.persistence;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.slcbudget.eventmanager.domain.Activity;
import com.slcbudget.eventmanager.domain.ActivityParticipants;
import com.slcbudget.eventmanager.domain.projections.ActivityParticipantsProjection;

public interface ActivityParticipantsRepository extends JpaRepository<ActivityParticipants, Long> {

  Set<ActivityParticipants> findByActivity(Activity activity);

  @Query("SELECT " + 
  "ap.id as activityParticipationId, " + 
  "ap.participationPercent as participationPercent, " + 
  "ap.staticValueParticipation as staticValueParticipation, " +
  "u.id as userId, " + 
  "u.email as email, " + 
  "u.name as name, " + 
  "u.lastName as lastName, " + 
  "u.username as username, " +
  "u.profileImage as profileImage " +
  "FROM ActivityParticipants ap " +
  "JOIN ap.participant u " +
  "WHERE ap.activity.id = :activityId")
  Page<ActivityParticipantsProjection> findByActivity(@Param("activityId") Long activityId, Pageable pagination);

}
