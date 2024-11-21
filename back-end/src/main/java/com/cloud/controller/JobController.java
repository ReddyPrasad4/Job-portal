package com.cloud.controller;
import com.cloud.DTO.JobDTO;
import com.cloud.service.serviceImplementation.JobServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.UUID;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/job")
public class JobController {
    @Autowired
    private JobServiceImplementation jobServiceImplementation;

    @PostMapping("/saveJob/{companyEmail}")
    public ResponseEntity<String> SaveJobs(@RequestBody JobDTO jobDTO,@PathVariable String companyEmail){
        return jobServiceImplementation.createJob(jobDTO,companyEmail);
    }

    @GetMapping("/getAllJobs")
    public ResponseEntity<List<JobDTO>> getJobs(){
        return jobServiceImplementation.getAllJobs();
    }

    @GetMapping("/getAllJobsByCompany/{companyEmail}")
    public ResponseEntity<List<JobDTO>> getAllJObsByCompanyID(@PathVariable String companyEmail){
        return jobServiceImplementation.getAllJobsByCompanyEmail(companyEmail);
    }

    @GetMapping("/getAllJobsByRole/{jobRole}")
    public ResponseEntity<List<JobDTO>> getAllJObsByRole(@PathVariable String jobRole){
        return jobServiceImplementation.searchJobsByRole(jobRole);
    }
    @DeleteMapping("/deleteJob/{jobId}")
    public ResponseEntity<String> deleteJob(@PathVariable UUID jobId){
        return jobServiceImplementation.deleteJob(jobId);
    }

    @GetMapping("/getJob/{jobId}")
    public ResponseEntity<JobDTO> getJob(@PathVariable UUID jobId){
        return jobServiceImplementation.getJob(jobId);
    }

}
