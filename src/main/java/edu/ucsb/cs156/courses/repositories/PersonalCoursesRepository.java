package edu.ucsb.cs156.courses.repositories;

import edu.ucsb.cs156.courses.entities.PersonalCourses;
import edu.ucsb.cs156.courses.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface PersonalCoursesRepository extends CrudRepository<PersonalCourses, Long> {
  // Optional<PersonalSchedule> findByIdAndUser(long id, User user);
  // Iterable<PersonalSchedule> findAllByScheduleId(Long user_id);
}