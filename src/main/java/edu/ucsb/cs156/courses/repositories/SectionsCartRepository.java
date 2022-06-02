package edu.ucsb.cs156.courses.repositories;

import edu.ucsb.cs156.courses.entities.SectionsCart;

import org.springframework.beans.propertyeditors.StringArrayPropertyEditor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionsCartRepository extends CrudRepository<SectionsCart, Long> {
  
}