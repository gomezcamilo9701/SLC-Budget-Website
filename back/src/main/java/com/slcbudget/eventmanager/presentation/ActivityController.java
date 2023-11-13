package com.slcbudget.eventmanager.presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.slcbudget.eventmanager.domain.Activity;
import com.slcbudget.eventmanager.domain.dto.ActivityCreateDTO;
import com.slcbudget.eventmanager.service.ActivityService;
import com.slcbudget.eventmanager.utils.Result;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/activity")
public class ActivityController {

  @Autowired
  private ActivityService activityService;

  @PostMapping("/create")
  public ResponseEntity<?> createActivity(@RequestBody ActivityCreateDTO activityDTO) {
      Result<Activity> result = activityService.createActivity(activityDTO);

      if (result.isSuccess()) {
            return ResponseEntity.ok(result.getData());
        } else {
            return ResponseEntity.badRequest().body(result.getError());
        }
  }

  @PutMapping("/edit/{activityId}")
  public ResponseEntity<?> editActivity(
    @PathVariable Long activityId,
    @RequestBody @Valid ActivityCreateDTO activityDTO) {

    Result<Activity> result = activityService.editActivity(activityId, activityDTO);

    if (result.isSuccess()) {
      return ResponseEntity.ok(result.getData());
    } else {
        return ResponseEntity.badRequest().body(result.getError());
    }
  }


  @GetMapping("{activityId}")
  public ResponseEntity<?> getActivityById(@PathVariable Long activityId) {
    Result<Activity> result = activityService.getActivityById(activityId);

    if (result.isSuccess()) {
        return ResponseEntity.ok(result.getData());
    } else {
        return ResponseEntity.badRequest().body(result.getError());
    }
  }
  
}
