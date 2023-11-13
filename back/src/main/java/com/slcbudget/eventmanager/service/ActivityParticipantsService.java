package com.slcbudget.eventmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;

import com.slcbudget.eventmanager.domain.Activity;
import com.slcbudget.eventmanager.domain.ActivityParticipants;
import com.slcbudget.eventmanager.domain.projections.ActivityParticipantsProjection;
import com.slcbudget.eventmanager.persistence.ActivityParticipantsRepository;
import com.slcbudget.eventmanager.utils.Result;

@Service
public class ActivityParticipantsService {
  
  @Autowired
  private ActivityParticipantsRepository activityParticipantsRepository;

  public Result<Page<ActivityParticipantsProjection>> getActivityParticipantsByActivityId(Long activityId,
    Pageable pagination) {
    Result<Page<ActivityParticipantsProjection>> result = new Result<>();
 
    try {
      Page<ActivityParticipantsProjection> actPage = activityParticipantsRepository.findByActivity(activityId, pagination);
      result.setSuccess(true);
      result.setData(actPage);
    } catch (Exception e) {
      result.setSuccess(false);
      result.setError("Error para recuperar los participantes de la actividad" + e.getMessage());
    }
    return result;
  }
}
