package edu.ucsb.cs156.courses.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "sectionscart")
public class SectionsCart {
  @Id
  private String courseId;
  private String title;
  private String section;
  private String location;
  private String enrollment;
  private String time;
  private String instructor;
}