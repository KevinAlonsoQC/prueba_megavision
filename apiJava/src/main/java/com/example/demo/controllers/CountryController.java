package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.Optional;

import com.example.demo.models.CountryModel;
import com.example.demo.services.CountryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Country")
public class CountryController {
    @Autowired
    CountryService countryService;

    @GetMapping()
    public ArrayList<CountryModel> obtenerPaises() {
        return countryService.obtenerPaises();
    }

    @PostMapping()
    public CountryModel guardarPais(@RequestBody CountryModel country) {
        return this.countryService.guardarPais(country);
    }

    @GetMapping(path = "/{id}")
    public Optional<CountryModel> obtenerPaisPorId(@PathVariable("id") Long id) {
        return this.countryService.obtenerPorId(id);
    }

    @DeleteMapping(path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Long id) {
        boolean ok = this.countryService.eliminarPais(id);
        if (ok) {
            return "Se eliminó el país con id " + id;
        } else {
            return "No pudo eliminar el país con id " + id;
        }
    }
}
