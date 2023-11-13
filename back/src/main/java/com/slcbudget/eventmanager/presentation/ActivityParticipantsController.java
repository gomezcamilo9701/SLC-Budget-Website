package com.slcbudget.eventmanager.presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.slcbudget.eventmanager.domain.projections.ActivityParticipantsProjection;
import com.slcbudget.eventmanager.service.ActivityParticipantsService;
import com.slcbudget.eventmanager.utils.Result;

@RestController
@RequestMapping("/activity-participants")
public class ActivityParticipantsController {
  
  @Autowired
  private ActivityParticipantsService activityParticipantsService;

  @GetMapping("{activityId}")
  public ResponseEntity<?> getActivityParticipantsByActivityId(@PathVariable Long activityId,
    @PageableDefault(size = 3) Pageable pagination) {
    Result<Page<ActivityParticipantsProjection>> result = activityParticipantsService.getActivityParticipantsByActivityId(activityId, pagination);
  
    if (result.isSuccess()) {
      return ResponseEntity.ok(result.getData());
  } else {
      return ResponseEntity.badRequest().body(result.getError());
  }
  }
}
