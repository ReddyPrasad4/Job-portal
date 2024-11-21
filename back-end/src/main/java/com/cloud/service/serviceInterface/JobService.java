package com.cloud.service.serviceInterface;
import com.cloud.DTO.JobDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public interface JobService {

    ResponseEntity<String> createJob(JobDTO jobDTO , String companyEmail);
    ResponseEntity<List<JobDTO>> getAllJobs();
    ResponseEntity<List<JobDTO>>searchJobsByRole(String jobRole);
    ResponseEntity<String> deleteJob(UUID jobId);
    ResponseEntity<JobDTO> getJob(UUID jobId);
}
