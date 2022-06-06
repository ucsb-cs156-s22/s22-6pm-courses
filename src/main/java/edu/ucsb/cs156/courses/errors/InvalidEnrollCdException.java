package edu.ucsb.cs156.courses.errors;

public class InvalidEnrollCdException extends RuntimeException {
  public InvalidEnrollCdException(String enrollCd) {
    super("Invalid EnrollCd %s (EnrollCd should be numeric and no more than five digits)"
      .formatted(enrollCd.toString()));
  }
}
