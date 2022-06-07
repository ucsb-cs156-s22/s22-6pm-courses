package edu.ucsb.cs156.courses.entities;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;

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
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  private String courseId;
  private String title;
  private String section;
  private String location;
  private String enrollment;
  private String time;
  private String instructor;
}