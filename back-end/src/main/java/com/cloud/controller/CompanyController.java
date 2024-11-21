package com.cloud.controller;
import com.cloud.DTO.CompanyDTO;
import com.cloud.service.serviceInterface.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;
    @PostMapping("/saveCompany")
    public ResponseEntity<String> saveCompany(@RequestBody CompanyDTO companyDto) {
        return companyService.createCompany(companyDto);
    }

    @DeleteMapping("/deleteCompany")
    public ResponseEntity<String> deleteCompany(UUID companyId){
        return  companyService.softDeleteCompany(companyId);
    }

    @GetMapping("/companyLogin/{companyEmail}/{companyPassword}")
    public ResponseEntity<CompanyDTO> login(@PathVariable String companyEmail, @PathVariable String companyPassword)
    {
        return companyService.companyLogin(companyEmail, companyPassword) ;
    }
}
