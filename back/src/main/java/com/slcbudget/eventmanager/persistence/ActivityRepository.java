package com.slcbudget.eventmanager.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.slcbudget.eventmanager.domain.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

  
}
