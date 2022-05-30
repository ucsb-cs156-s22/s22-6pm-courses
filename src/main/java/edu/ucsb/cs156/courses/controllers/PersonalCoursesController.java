package edu.ucsb.cs156.courses.controllers;


import edu.ucsb.cs156.courses.entities.PersonalCourses;

import edu.ucsb.cs156.courses.entities.User;
import edu.ucsb.cs156.courses.errors.EntityNotFoundException;
import edu.ucsb.cs156.courses.errors.EnrollCdInvalidException;
import edu.ucsb.cs156.courses.models.CurrentUser;

import edu.ucsb.cs156.courses.repositories.PersonalCoursesRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;


  


@Api(description = "PersonalCourses")
//CHECK
@RequestMapping("/api/personalcourses")
@RestController
@Slf4j
public class PersonalCoursesController extends ApiController {
    
    //FIX (Replace with UCSB course search method)
    static boolean STUBfunc(String enrollCd, String quarter) {
        if(quarter.length()==5 && enrollCd.length()==6){
            return true;
        }
        else{
            return false;
        }
        
    }
    
    @Autowired
    PersonalCoursesRepository personalcoursesRepository;
    
    @ApiOperation(value = "List all personal courses")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<PersonalCourses> allPersonalCourses() {
        Iterable<PersonalCourses> personalcourses = personalcoursesRepository.findAll();
        return personalcourses;
    }

    @ApiOperation(value = "List personal courses in a personal schedule")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/getBypsId")
    public Iterable<PersonalCourses> getPersonalCoursesByPersonalScheduleID (
        @ApiParam("personal schedule id") @RequestParam Long psId
    ) {
        Iterable<PersonalCourses> personalcourses = personalcoursesRepository.findAllByPsId(psId);
        
        return personalcourses;
    }
    
    @ApiOperation(value = "Add a new personal course")
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/add")
    public PersonalCourses addCourse(
            @ApiParam("enrollCd") @RequestParam String enrollCd,
            @ApiParam("psID") @RequestParam long psId,
            @ApiParam("Quarter (in yyyyq)") @RequestParam String quarter) {
        //FIX (Replace with course search method)
        if(!STUBfunc(enrollCd,quarter)){
            throw new EnrollCdInvalidException(enrollCd,quarter);
        }

        PersonalCourses personalcourse = new PersonalCourses();
        personalcourse.setEnrollCd(enrollCd);
        personalcourse.setQuarter(quarter);
        personalcourse.setPsId(psId);
        PersonalCourses savedPersonalCourse = personalcoursesRepository.save(personalcourse);
        return savedPersonalCourse;
    }

    @ApiOperation(value = "Delete a personal course")
    @PreAuthorize("hasRole('ROLE_USER')")
    @DeleteMapping("/delete")
    public Object deleteSchedule(
            @ApiParam("id") @RequestParam Long id) {
        
        PersonalCourses personcourse = personalcoursesRepository.findById(id)
          .orElseThrow(() -> new EntityNotFoundException(PersonalCourses.class, id));

          personalcoursesRepository.delete(personcourse);

        return genericMessage("Personal Course with id %s deleted".formatted(id));

    }

    
}