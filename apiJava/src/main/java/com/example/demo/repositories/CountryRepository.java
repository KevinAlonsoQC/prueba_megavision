package com.example.demo.repositories;

import com.example.demo.models.CountryModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CountryRepository extends CrudRepository<CountryModel, Long> {
    Optional<CountryModel> findById(Long id);
}
