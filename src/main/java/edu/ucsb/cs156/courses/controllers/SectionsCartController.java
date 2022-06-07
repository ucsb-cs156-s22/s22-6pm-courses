package edu.ucsb.cs156.courses.controllers;

import edu.ucsb.cs156.courses.entities.SectionsCart;
import edu.ucsb.cs156.courses.errors.EntityNotFoundException;
import edu.ucsb.cs156.courses.repositories.SectionsCartRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
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


@Api(description = "SectionsCart")
@RequestMapping("/api/sectionscart")
@RestController
@Slf4j
public class SectionsCartController extends ApiController {

    @Autowired
    SectionsCartRepository sectionsCartRepository;

    @ApiOperation(value = "List all sections saved in the cart")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<SectionsCart> allSections() {
        Iterable<SectionsCart> sections = sectionsCartRepository.findAll();
        return sections;
    }

    @ApiOperation(value = "Get a single saved section by its id")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("")
    public SectionsCart getById(
            @ApiParam("id") @RequestParam Long id) {
        SectionsCart aSection = sectionsCartRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(SectionsCart.class, id));

        return aSection;
    }

    @ApiOperation(value = "Save a new section to the cart")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/post")
    public SectionsCart postSection(
        @ApiParam("courseId") @RequestParam String courseId,
        @ApiParam("title") @RequestParam String title,
        @ApiParam("section") @RequestParam String section,
        @ApiParam("location") @RequestParam String location,
        @ApiParam("enrollment") @RequestParam String enrollment,
        @ApiParam("time") @RequestParam String time,
        @ApiParam("instructor") @RequestParam String instructor
        )
        {

        SectionsCart aSection = new SectionsCart();
        aSection.setCourseId(courseId);
        aSection.setTitle(title);
        aSection.setSection(section);
        aSection.setLocation(location);
        aSection.setEnrollment(enrollment);
        aSection.setTime(time);
        aSection.setInstructor(instructor);

        SectionsCart savedSection = sectionsCartRepository.save(aSection);

        return savedSection;
    }
    
    @ApiOperation(value = "Delete a section from the cart")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("")
    public Object deleteSection(
            @ApiParam("id") @RequestParam Long id) {
        SectionsCart aSection = sectionsCartRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(SectionsCart.class, id));

        sectionsCartRepository.delete(aSection);
        return genericMessage("SectionsCart with id %s deleted".formatted(id));
    }
}