package edu.ucsb.cs156.courses.errors;

public class CourseNotFoundException extends RuntimeException {
  public CourseNotFoundException(String enrollCd, String quarter) {
    super("STUB (make sure enrollCd is greater than 1000) STUB Course not found (enroll code:%s quarter:%s)"
      .formatted(enrollCd.toString(), quarter.toString()));
  }
}
