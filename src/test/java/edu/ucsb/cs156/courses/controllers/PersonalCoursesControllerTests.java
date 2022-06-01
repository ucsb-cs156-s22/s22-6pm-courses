package edu.ucsb.cs156.courses.controllers;

import edu.ucsb.cs156.courses.repositories.UserRepository;
import edu.ucsb.cs156.courses.services.UCSBCurriculumService;
import edu.ucsb.cs156.courses.testconfig.TestConfig;
import edu.ucsb.cs156.courses.ControllerTestCase;
import edu.ucsb.cs156.courses.entities.PersonalCourses;
import edu.ucsb.cs156.courses.entities.PersonalSchedule;
import edu.ucsb.cs156.courses.entities.User;
import edu.ucsb.cs156.courses.repositories.PersonalCoursesRepository;
import edu.ucsb.cs156.courses.repositories.PersonalScheduleRepository;

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

@WebMvcTest(controllers = {PersonalCoursesController.class, PersonalSchedulesController.class})
@Import(TestConfig.class)
public class PersonalCoursesControllerTests extends ControllerTestCase {

    @MockBean
    PersonalCoursesRepository personalcoursesRepository;

    @MockBean
    PersonalScheduleRepository personalscheduleRepository;
    @MockBean
    UCSBCurriculumService ucsbCurriculumService;

    @MockBean
    UserRepository userRepository;
    @Test
    public void api_courses_all__logged_out__returns_403() throws Exception {
        mockMvc.perform(get("/api/personalcourses/all"))
                .andExpect(status().is(403));
    }
    
    @WithMockUser(roles = { "USER" })
    @Test
    public void api_courses_all__user_logged_in__returns_200() throws Exception {
        mockMvc.perform(get("/api/personalcourses/all"))
                .andExpect(status().isOk());
    }
    @Test
    public void api_courses_getBypsID__logged_out__returns_403() throws Exception {
        mockMvc.perform(get("/api/personalcourses/getBypsId?psId=1"))
                .andExpect(status().is(403));
    }
    
    @WithMockUser(roles = { "USER" })
    @Test
    public void api_courses_getBypsID__user_logged_in__returns_200() throws Exception {
        mockMvc.perform(get("/api/personalcourses/getBypsId?psId=1"))
                .andExpect(status().isOk());
    }
    
    @Test
    public void api_courses_add__logged_out__returns_403() throws Exception {
        mockMvc.perform(post("/api/personalcourses/add"))
                .andExpect(status().is(403));
    }
    @WithMockUser(roles = { "USER" })
    @Test
    public void api_courses_add__admin__returns_403() throws Exception {
        mockMvc.perform(post("/api/personalcourses/admin/add"))
                .andExpect(status().is(403));
    }


    @WithMockUser(roles = { "USER" })
    @Test
    public void api_courses_admin_all__admin_logged_in__returns_all_courses() throws Exception {



        PersonalCourses p1 = PersonalCourses.builder().psId(1).enrollCd("12345").quarter("20222").id(0L).build();
        PersonalCourses p2 = PersonalCourses.builder().psId(2).enrollCd("78912").quarter("20222").id(1L).build();
        PersonalCourses p3 = PersonalCourses.builder().psId(3).enrollCd("65432").quarter("20222").id(2L).build();
       

        ArrayList<PersonalCourses> expectedCourses = new ArrayList<>();
        expectedCourses.addAll(Arrays.asList(p1, p2, p3));

        when(personalcoursesRepository.findAll()).thenReturn(expectedCourses);

        
        MvcResult response = mockMvc.perform(get("/api/personalcourses/all"))
                .andExpect(status().isOk()).andReturn();

        

        verify(personalcoursesRepository, times(1)).findAll();
        String expectedJson = mapper.writeValueAsString(expectedCourses);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }


    @WithMockUser(roles = { "USER" })
    @Test
    public void api_courses__admin_logged_in__get_courses_by_personal_schedule_ID() throws Exception {


        PersonalCourses p1 = PersonalCourses.builder().psId(1).enrollCd("12345").quarter("20222").id(0L).build();
        PersonalCourses p2 = PersonalCourses.builder().psId(1).enrollCd("78912").quarter("20222").id(1L).build();
        PersonalCourses p3 = PersonalCourses.builder().psId(1).enrollCd("65432").quarter("20222").id(2L).build();

        ArrayList<PersonalCourses> expectedCourses = new ArrayList<>();
        expectedCourses.addAll(Arrays.asList(p1, p2, p3));


        when(personalcoursesRepository.findAllByPsId(1L)).thenReturn(expectedCourses);


        MvcResult response = mockMvc.perform(get("/api/personalcourses/getBypsId?psId=1"))
                .andExpect(status().isOk()).andReturn();


        verify(personalcoursesRepository, times(1)).findAllByPsId(1L);
        String expectedJson = mapper.writeValueAsString(expectedCourses);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }
    
    // Valid PS ID
    @WithMockUser(roles = { "USER" })
    @Test
    public void api_courses_add_success__user_logged_in() throws Exception {
        User u = currentUserService.getCurrentUser().getUser();
        
        PersonalSchedule myPersonalschedule = PersonalSchedule.builder().name("Name 1").description("Description 1").quarter("20222").user(u).id(1L)
                .build();
        
        
        
        PersonalCourses expectedCourse = PersonalCourses.builder().psId(1).enrollCd("1000").quarter("20222").id(0L).build();

        when(personalscheduleRepository.findByIdAndUser(eq(1L),eq(u))).thenReturn(Optional.of(myPersonalschedule));
        when(personalscheduleRepository.findById(eq(1L))).thenReturn(Optional.of(myPersonalschedule));
        when(ucsbCurriculumService.getSectionJSON(eq("20222"), eq("1000"))).thenReturn("json: {} contentType: {} statusCode: {}");

        when(personalcoursesRepository.save(eq(expectedCourse))).thenReturn(expectedCourse);

        MvcResult response = mockMvc.perform(
                post("/api/personalcourses/add?psId=1&enrollCd=1000&quarter=20222")
                        .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        
        verify(personalcoursesRepository, times(1)).save(expectedCourse);
        String expectedJson = mapper.writeValueAsString(expectedCourse);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }

    // Invalid PS ID
    @WithMockUser(roles = { "USER" })
    @Test
    public void api_courses_add_fail__user_logged_in() throws Exception {
        User u = currentUserService.getCurrentUser().getUser();
        User otherUser = User.builder().id(999L).build();
        PersonalSchedule myPersonalschedule = PersonalSchedule.builder().name("Name 1").description("Description 1").quarter("20221").user(u).id(1L)
                .build();
        PersonalSchedule otherUsersPersonalschedule = PersonalSchedule.builder().name("Name 1").description("Description 1").quarter("20221").user(otherUser).id(2L)
                .build();
        personalscheduleRepository.save(myPersonalschedule);
        personalscheduleRepository.save(otherUsersPersonalschedule);
        
        
        MvcResult response = mockMvc.perform(
                post("/api/personalcourses/add?psId=2&enrollCd=12345&quarter=20222")
                        .with(csrf()))
                .andExpect(status().isNotFound()).andReturn();

        Map<String, Object> json = responseToJson(response);
        assertEquals("Invalid personal schedule ID 2", json.get("message"));
    }
    // Invalid PS ID for Admin
    @WithMockUser(roles = { "ADMIN", "USER" })
    @Test
    public void api_courses_add_fail__admin_logged_in() throws Exception {
        User u = currentUserService.getCurrentUser().getUser();
        User otherUser = User.builder().id(999L).build();
        PersonalSchedule myPersonalschedule = PersonalSchedule.builder().name("Name 1").description("Description 1").quarter("20221").user(u).id(1L)
                .build();
        PersonalSchedule otherUsersPersonalschedule = PersonalSchedule.builder().name("Name 1").description("Description 1").quarter("20221").user(otherUser).id(2L)
                .build();
        personalscheduleRepository.save(myPersonalschedule);
        personalscheduleRepository.save(otherUsersPersonalschedule);
        
        
        MvcResult response = mockMvc.perform(
                post("/api/personalcourses/admin/add?psId=3&enrollCd=12345&quarter=20222")
                        .with(csrf()))
                .andExpect(status().isNotFound()).andReturn();

        Map<String, Object> json = responseToJson(response);
        assertEquals("Invalid personal schedule ID 3", json.get("message"));
    }
    // valid PS ID for ADMIN
    @WithMockUser(roles = { "ADMIN", "USER" })
    @Test
    public void api_courses_add_success__admin_logged_in() throws Exception {
        User u = currentUserService.getCurrentUser().getUser();
        
        PersonalSchedule myPersonalschedule = PersonalSchedule.builder().name("Name 1").description("Description 1").quarter("20222").user(u).id(1L)
                .build();
        
        PersonalCourses expectedCourse = PersonalCourses.builder().psId(1).enrollCd("12345").quarter("20222").id(0L).build();

        when(personalscheduleRepository.findById(eq(1L))).thenReturn(Optional.of(myPersonalschedule));
        when(ucsbCurriculumService.getSectionJSON(eq("20222"), eq("12345"))).thenReturn("json: {} contentType: {} statusCode: {}");

        when(personalcoursesRepository.save(eq(expectedCourse))).thenReturn(expectedCourse);

        MvcResult response = mockMvc.perform(
                post("/api/personalcourses/admin/add?psId=1&enrollCd=12345&quarter=20222")
                        .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        
        verify(personalcoursesRepository, times(1)).save(expectedCourse);
        String expectedJson = mapper.writeValueAsString(expectedCourse);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }

    //For invalid course enrollCd
    @WithMockUser(roles = { "USER" })
    @Test
    public void api_courses_add_Invalid_course_enroll_code1__user_logged_in() throws Exception {
        
        MvcResult response = mockMvc.perform(
                post("/api/personalcourses/add?psId=1&enrollCd=abc&quarter=20222")
                        .with(csrf()))
                .andExpect(status().isNotFound()).andReturn();

        
        Map<String, Object> json = responseToJson(response);
        assertEquals("Invalid EnrollCd abc (EnrollCd should be numeric and no more than five digits)", json.get("message"));
    }
    //For invalid course enrollCd
    @WithMockUser(roles = { "USER" })
    @Test
    public void api_courses_add_Invalid_course_enroll_code2__user_logged_in() throws Exception {
        
        MvcResult response = mockMvc.perform(
                post("/api/personalcourses/add?psId=1&enrollCd=123456&quarter=20222")
                        .with(csrf()))
                .andExpect(status().isNotFound()).andReturn();

        
        Map<String, Object> json = responseToJson(response);
        assertEquals("Invalid EnrollCd 123456 (EnrollCd should be numeric and no more than five digits)", json.get("message"));
    }
    //For invalid course enrollCd ADMIN
    @WithMockUser(roles = { "ADMIN","USER" })
    @Test
    public void api_courses_add_Invalid_course_enroll_code2__admin_logged_in() throws Exception {
        MvcResult response = mockMvc.perform(
                post("/api/personalcourses/admin/add?psId=1&enrollCd=123456&quarter=20222")
                        .with(csrf()))
                .andExpect(status().isNotFound()).andReturn();

        
        Map<String, Object> json = responseToJson(response);
        assertEquals("Invalid EnrollCd 123456 (EnrollCd should be numeric and no more than five digits)", json.get("message"));
    }
    // valid Quarter for ADMIN
    @WithMockUser(roles = { "ADMIN", "USER" })
    @Test
    public void api_courses_add_success_valid_quarter__admin_logged_in() throws Exception {
        User u = currentUserService.getCurrentUser().getUser();
        
        PersonalSchedule myPersonalschedule = PersonalSchedule.builder().name("Name 1").description("Description 1").quarter("20221").user(u).id(1L)
                .build();
        
        PersonalCourses expectedCourse = PersonalCourses.builder().psId(1).enrollCd("12345").quarter("20221").id(0L).build();

        when(personalscheduleRepository.findById(eq(1L))).thenReturn(Optional.of(myPersonalschedule));
        when(ucsbCurriculumService.getSectionJSON(eq("20221"), eq("12345"))).thenReturn("json: {} contentType: {} statusCode: {}");

        when(personalcoursesRepository.save(eq(expectedCourse))).thenReturn(expectedCourse);

        MvcResult response = mockMvc.perform(
                post("/api/personalcourses/admin/add?psId=1&enrollCd=12345&quarter=20221")
                        .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        
        verify(personalcoursesRepository, times(1)).save(expectedCourse);
        String expectedJson = mapper.writeValueAsString(expectedCourse);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }

    // Invalid Quarter for ADMIN
    @WithMockUser(roles = { "ADMIN", "USER" })
    @Test
    public void api_courses_add_fail_invalid_quarter__admin_logged_in() throws Exception {
        User u = currentUserService.getCurrentUser().getUser();
        
        PersonalSchedule myPersonalschedule = PersonalSchedule.builder().name("Name 1").description("Description 1").quarter("20221").user(u).id(1L)
                .build();
        
        PersonalCourses expectedCourse = PersonalCourses.builder().psId(1).enrollCd("12345").quarter("20221").id(0L).build();

        when(personalscheduleRepository.findById(eq(1L))).thenReturn(Optional.of(myPersonalschedule));

        

        MvcResult response = mockMvc.perform(
                post("/api/personalcourses/admin/add?psId=1&enrollCd=12345&quarter=2022")
                        .with(csrf()))
                .andExpect(status().isNotFound()).andReturn();

        
        Map<String, Object> json = responseToJson(response);
        assertEquals("Invalid quarter 2022 (Quarter has to match the one in personal schedule id 1)", json.get("message"));
    }

    // Invalid Quarter
    @WithMockUser(roles = { "USER" })
    @Test
    public void api_courses_add_fail_invalid_quarter__user_logged_in() throws Exception {
        User u = currentUserService.getCurrentUser().getUser();
        
        PersonalSchedule myPersonalschedule = PersonalSchedule.builder().name("Name 1").description("Description 1").quarter("20221").user(u).id(1L)
                .build();
        
        PersonalCourses expectedCourse = PersonalCourses.builder().psId(1).enrollCd("12345").quarter("20221").id(0L).build();
        when(personalscheduleRepository.findByIdAndUser(eq(1L),eq(u))).thenReturn(Optional.of(myPersonalschedule));
        when(personalscheduleRepository.findById(eq(1L))).thenReturn(Optional.of(myPersonalschedule));

        

        MvcResult response = mockMvc.perform(
                post("/api/personalcourses/add?psId=1&enrollCd=12345&quarter=2022")
                        .with(csrf()))
                .andExpect(status().isNotFound()).andReturn();

        
        Map<String, Object> json = responseToJson(response);
        assertEquals("Invalid quarter 2022 (Quarter has to match the one in personal schedule id 1)", json.get("message"));
    }



    
    //For course not found method
    @WithMockUser(roles = { "USER" })
    @Test
    public void api_courses_add_course_not_found__user_logged_in() throws Exception {
        User u = currentUserService.getCurrentUser().getUser();
        
        PersonalSchedule myPersonalschedule = PersonalSchedule.builder().name("Name 1").description("Description 1").quarter("20222").user(u).id(1L)
                .build();
        
        when(personalscheduleRepository.findByIdAndUser(eq(1L),eq(u))).thenReturn(Optional.of(myPersonalschedule));
        when(personalscheduleRepository.findById(eq(1L))).thenReturn(Optional.of(myPersonalschedule));
        when(ucsbCurriculumService.getSectionJSON(eq("20222"), eq("234"))).thenReturn("{\"error\": \"404 (Not Found): Enroll code does not exist!\"}");
        MvcResult response = mockMvc.perform(
                post("/api/personalcourses/add?psId=1&enrollCd=234&quarter=20222")
                        .with(csrf()))
                .andExpect(status().isNotFound()).andReturn();

        Map<String, Object> json = responseToJson(response);
        assertEquals("Course not found (enroll code:234 quarter:20222)", json.get("message"));
    }
    //For course not found  ADMIN
    @WithMockUser(roles = { "ADMIN","USER" })
    @Test
    public void api_courses_add_course_not_found__admin_logged_in() throws Exception {
        
        User u = currentUserService.getCurrentUser().getUser();
        
        PersonalSchedule myPersonalschedule = PersonalSchedule.builder().name("Name 1").description("Description 1").quarter("20222").user(u).id(1L)
                .build();
        
        when(personalscheduleRepository.findById(eq(1L))).thenReturn(Optional.of(myPersonalschedule));
        when(ucsbCurriculumService.getSectionJSON(eq("20222"), eq("234"))).thenReturn("{\"error\": \"404 (Not Found): Enroll code does not exist!\"}");

        MvcResult response = mockMvc.perform(
                post("/api/personalcourses/admin/add?psId=1&enrollCd=234&quarter=20222")
                        .with(csrf()))
                .andExpect(status().isNotFound()).andReturn();

        Map<String, Object> json = responseToJson(response);
        assertEquals("Course not found (enroll code:234 quarter:20222)", json.get("message"));
    }
    
    @WithMockUser(roles = { "USER" })
    @Test
    public void api_courses__user_logged_in__delete_course() throws Exception {
        // arrange

        
        PersonalCourses pc1 = PersonalCourses.builder().psId(1).enrollCd("12345").quarter("20222").id(15L).build();
        when(personalcoursesRepository.findById(eq(15L))).thenReturn(Optional.of(pc1));

        // act
        MvcResult response = mockMvc.perform(
                delete("/api/personalcourses/delete?id=15")
                        .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        // assert
        verify(personalcoursesRepository, times(1)).findById(15L);
        verify(personalcoursesRepository, times(1)).delete(pc1);
        Map<String, Object> json = responseToJson(response);
        assertEquals("Personal Course with id 15 deleted", json.get("message"));
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_courses__user_logged_in__delete_course_that_does_not_exist() throws Exception {
        // arrange

        PersonalCourses pc1 = PersonalCourses.builder().psId(1).enrollCd("12345").quarter("20222").id(1L).build();
        when(personalcoursesRepository.findById(eq(14L))).thenReturn(Optional.empty());

        // act
        MvcResult response = mockMvc.perform(
                delete("/api/personalcourses/delete?id=14")
                        .with(csrf()))
                .andExpect(status().isNotFound()).andReturn();

        // assert
        verify(personalcoursesRepository, times(1)).findById(14L);
        Map<String, Object> json = responseToJson(response);
        assertEquals("PersonalCourses with id 14 not found", json.get("message"));
    }

}