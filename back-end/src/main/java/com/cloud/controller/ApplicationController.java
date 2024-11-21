package com.cloud.controller;
import com.cloud.DTO.ApplicationDTO;
import com.cloud.DTO.CandidateDTO;
import com.cloud.DTO.JobDTO;
import com.cloud.service.serviceInterface.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/application")
public class ApplicationController {
    @Autowired
    public ApplicationService applicationService;

    @PostMapping("/applyForJob/{candidateEmail}/{jobId}")
    public ResponseEntity<String> applyJob(@PathVariable String candidateEmail, @PathVariable UUID jobId){
        return applicationService.applyForJob(candidateEmail,jobId);
    }

    @GetMapping("/getAllApplications")
    public ResponseEntity<List<ApplicationDTO>> getApplications(){
        return applicationService.getAllApplications();
    }

    @GetMapping("/getApplication/{userEmail}/{jobId}")
    public ResponseEntity<ApplicationDTO> getApplications(@PathVariable String userEmail,@PathVariable UUID jobId){
        return applicationService.getApplicationByUserEmailAndJobId(userEmail,jobId);
    }


    @PutMapping("/saveShortlistedCandidates/{applicationId}")
    public ResponseEntity<String> savedShortlists(@PathVariable UUID applicationId){
        return applicationService.shortlistCandidateIfEligible(applicationId);
    }

    @GetMapping("/shortListed/{applicationId}")
    public ResponseEntity<String> getShortlistedCamdidate(@PathVariable UUID applicationId){
        return applicationService.shortlistCandidate(applicationId);
    }

    @GetMapping("/getJobsByCandidateId/{candidateEmail}")
    public ResponseEntity<List<JobDTO>> getJobsByCandidateId(@PathVariable String candidateEmail){
        return applicationService.getJobsByCandidateEmail(candidateEmail);
    }

    @GetMapping("/getApplicationsByJobId/{jobId}")
    public ResponseEntity<List<ApplicationDTO>> getJobsByCandidateId(@PathVariable UUID jobId){
        return applicationService.getAllApplicationsByJobId(jobId);
    }
}
