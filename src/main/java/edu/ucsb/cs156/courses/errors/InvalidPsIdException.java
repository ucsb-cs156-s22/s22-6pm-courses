package edu.ucsb.cs156.courses.errors;

public class InvalidPsIdException extends RuntimeException {
  public InvalidPsIdException(long psId) {
    super("Invalid personal schedule ID %s"
      .formatted(String.valueOf(psId)));
  }
}
