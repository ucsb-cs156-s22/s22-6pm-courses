package edu.ucsb.cs156.courses.errors;

public class InvalidQuarterException extends RuntimeException {
  public InvalidQuarterException(long psId,String quarter) {
    super("Invalid quarter %s (Quarter has to match the one in personal schedule id %s)"
      .formatted(quarter, String.valueOf(psId)));
  }
}
