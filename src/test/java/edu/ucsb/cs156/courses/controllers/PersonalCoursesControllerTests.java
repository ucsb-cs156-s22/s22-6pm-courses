package edu.ucsb.cs156.courses.controllers;

import edu.ucsb.cs156.courses.repositories.UserRepository;
import edu.ucsb.cs156.courses.testconfig.TestConfig;
import edu.ucsb.cs156.courses.ControllerTestCase;
import edu.ucsb.cs156.courses.entities.PersonalCourses;
import edu.ucsb.cs156.courses.entities.User;
import edu.ucsb.cs156.courses.repositories.PersonalCoursesRepository;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(controllers = PersonalCoursesController.class)
@Import(TestConfig.class)
public class PersonalCoursesControllerTests extends ControllerTestCase {

    @MockBean
    PersonalCoursesRepository personalcoursesRepository;

    @MockBean
    UserRepository userRepository;
    
    @Test
    public void api_schedules_post__logged_out__returns_403() throws Exception {
        mockMvc.perform(post("/api/personalcourses/post"))
                .andExpect(status().is(403));
    }

    
    @WithMockUser(roles = { "USER" })
    @Test
    public void api_courses_add__user_logged_in() throws Exception {
        
        PersonalCourses expectedCourse = PersonalCourses.builder().psId(1).enrollCd("123456").quarter("20222").id(0L).build();

        when(personalcoursesRepository.save(eq(expectedCourse))).thenReturn(expectedCourse);

        
        MvcResult response = mockMvc.perform(
                post("/api/personalcourses/add?psId=1&enrollCd=123456&quarter=20222")
                        .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        
        verify(personalcoursesRepository, times(1)).save(expectedCourse);
        String expectedJson = mapper.writeValueAsString(expectedCourse);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }
    

}