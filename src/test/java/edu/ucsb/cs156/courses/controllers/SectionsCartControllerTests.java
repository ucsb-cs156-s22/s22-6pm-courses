package edu.ucsb.cs156.courses.controllers;

import edu.ucsb.cs156.courses.repositories.UserRepository;
import edu.ucsb.cs156.courses.testconfig.TestConfig;
import edu.ucsb.cs156.courses.ControllerTestCase;
import edu.ucsb.cs156.courses.entities.SectionsCart;
import edu.ucsb.cs156.courses.repositories.SectionsCartRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(controllers = SectionsCartController.class)
@Import(TestConfig.class)
public class SectionsCartControllerTests extends ControllerTestCase {

        @MockBean
        SectionsCartRepository sectionsCartRepository;

        @MockBean
        UserRepository userRepository;

        // Authorization tests for /api/sectionscart/admin/all

        @Test
        public void logged_out_users_cannot_get_all() throws Exception {
                mockMvc.perform(get("/api/sectionscart/all"))
                                .andExpect(status().is(403)); // logged out users can't get all
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_users_can_get_all() throws Exception {
                mockMvc.perform(get("/api/sectionscart/all"))
                                .andExpect(status().is(200)); // logged
        }

        @Test
        public void logged_out_users_cannot_get_by_id() throws Exception {
                mockMvc.perform(get("/api/sectionscart?id=1"))
                                .andExpect(status().is(403)); // logged out users can't get by id
        }

        // Authorization tests for /api/sectionscart/post
        // (Perhaps should also have these for put and delete)

        @Test
        public void logged_out_users_cannot_post() throws Exception {
                mockMvc.perform(post("/api/sectionscart/post"))
                                .andExpect(status().is(403));
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_regular_users_cannot_post() throws Exception {
                mockMvc.perform(post("/api/sectionscart/post"))
                                .andExpect(status().is(403)); // only admins can post
        }

        // Tests with mocks for database actions

        @WithMockUser(roles = { "USER" })
        @Test
        public void test_that_logged_in_user_can_get_by_id_when_the_id_exists() throws Exception {

                // arrange

                SectionsCart aSection = SectionsCart.builder()
                                .courseId("CMPSC 5A")
                                .title("INTRO DATA SCI 1")
                                .section("LECTURE")
                                .location("ELLSN 2617")
                                .enrollment("85/90")
                                .time("17:00--18:15 T R")
                                .instructor("SOLIS S W")
                                .build();

                when(sectionsCartRepository.findById(eq(1L))).thenReturn(Optional.of(aSection));

                // act
                MvcResult response = mockMvc.perform(get("/api/sectionscart?id=1"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(sectionsCartRepository, times(1)).findById(eq(1L));
                String expectedJson = mapper.writeValueAsString(aSection);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void test_that_logged_in_user_can_get_by_id_when_the_id_does_not_exist() throws Exception {

                // arrange

                when(sectionsCartRepository.findById(eq(1L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(get("/api/sectionscart?id=1"))
                                .andExpect(status().isNotFound()).andReturn();

                // assert

                verify(sectionsCartRepository, times(1)).findById(eq(1L));
                Map<String, Object> json = responseToJson(response);
                assertEquals("EntityNotFoundException", json.get("type"));
                assertEquals("SectionsCart with id 1 not found", json.get("message"));
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_user_can_get_all_sections() throws Exception {

                // arrange

                SectionsCart section1 = SectionsCart.builder()
                                .courseId("CMPSC 5A")
                                .title("INTRO DATA SCI 1")
                                .section("LECTURE")
                                .location("ELLSN 2617")
                                .enrollment("85/90")
                                .time("17:00--18:15 T R")
                                .instructor("SOLIS S W")
                                .build();

                SectionsCart section2 = SectionsCart.builder()
                                .courseId("CMPSC 5B")
                                .title("INTRO DATA SCI 2")
                                .section("59659")
                                .location("SSMS 1007")
                                .enrollment("17/25")
                                .time("13:00--13:50 W")
                                .instructor("LU Y")
                                .build();

                ArrayList<SectionsCart> expectedSections = new ArrayList<>();
                expectedSections.addAll(Arrays.asList(section1, section2));

                when(sectionsCartRepository.findAll()).thenReturn(expectedSections);

                // act
                MvcResult response = mockMvc.perform(get("/api/sectionscart/all"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(sectionsCartRepository, times(1)).findAll();
                String expectedJson = mapper.writeValueAsString(expectedSections);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void an_admin_user_can_post_a_new_section() throws Exception {
                // arrange

                SectionsCart aSection = SectionsCart.builder()
                                .courseId("CMPSC 5A")
                                .title("INTRO DATA SCI 1")
                                .section("LECTURE")
                                .location("ELLSN 2617")
                                .enrollment("85/90")
                                .time("17:00--18:15 T R")
                                .instructor("SOLIS S W")
                                .build();

                when(sectionsCartRepository.save(eq(aSection))).thenReturn(aSection);

                // act
                MvcResult response = mockMvc.perform(
                                post("/api/sectionscart/post?courseId=CMPSC 5A&title=INTRO DATA SCI 1&section=LECTURE&location=ELLSN 2617&enrollment=85/90&time=17:00--18:15 T R&instructor=SOLIS S W")
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(sectionsCartRepository, times(1)).save(aSection);
                String expectedJson = mapper.writeValueAsString(aSection);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }
        
        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_can_delete_a_section() throws Exception {
                // arrange

                SectionsCart aSection = SectionsCart.builder()
                                .courseId("CMPSC 5A")
                                .title("INTRO DATA SCI 1")
                                .section("LECTURE")
                                .location("ELLSN 2617")
                                .enrollment("85/90")
                                .time("17:00--18:15 T R")
                                .instructor("SOLIS S W")
                                .build();

                when(sectionsCartRepository.findById(eq(1L))).thenReturn(Optional.of(aSection));

                // act
                MvcResult response = mockMvc.perform(
                                delete("/api/sectionscart?id=1")
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(sectionsCartRepository, times(1)).findById(1L);
                verify(sectionsCartRepository, times(1)).delete(any());

                Map<String, Object> json = responseToJson(response);
                assertEquals("SectionsCart with id 1 deleted", json.get("message"));
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_tries_to_delete_non_existent_section_and_gets_right_error_message()
                        throws Exception {
                // arrange

                when(sectionsCartRepository.findById(eq(1L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(
                                delete("/api/sectionscart?id=1")
                                                .with(csrf()))
                                .andExpect(status().isNotFound()).andReturn();

                // assert
                verify(sectionsCartRepository, times(1)).findById(1L);
                Map<String, Object> json = responseToJson(response);
                assertEquals("SectionsCart with id 1 not found", json.get("message"));
        }
}
