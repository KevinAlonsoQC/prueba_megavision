package com.example.demo.services;

import java.util.ArrayList;
import java.util.Optional;

import com.example.demo.models.CountryModel;
import com.example.demo.repositories.CountryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CountryService {
    @Autowired
    CountryRepository countryRepository;

    public ArrayList<CountryModel> obtenerPaises() {
        return (ArrayList<CountryModel>) countryRepository.findAll();
    }

    public CountryModel guardarPais(CountryModel country) {
        return countryRepository.save(country);
    }

    public Optional<CountryModel> obtenerPorId (Long id) {
        return countryRepository.findById(id);
    }

    public boolean eliminarPais(Long id) {
        try {
            countryRepository.deleteById(id);
            return true;
        } catch (Exception err) {
            return false;
        }
    }
}
