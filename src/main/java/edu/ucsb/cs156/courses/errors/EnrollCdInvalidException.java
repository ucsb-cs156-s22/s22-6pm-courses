package edu.ucsb.cs156.courses.errors;

public class EnrollCdInvalidException extends RuntimeException {
  public EnrollCdInvalidException(String enrollCd, String quarter) {
    super("Course not found (enroll code:%s quarter:%s)"
      .formatted(enrollCd.toString(), quarter.toString()));
  }
}
