package com.cloud.service.serviceInterface;
import com.cloud.DTO.ApplicationDTO;
import com.cloud.DTO.CandidateDTO;
import com.cloud.DTO.JobDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface ApplicationService {
    ResponseEntity<String> applyForJob(String candidateEmail, UUID jobId);
    ResponseEntity<String> shortlistCandidateIfEligible(UUID applicationId);
    ResponseEntity<String> shortlistCandidate( UUID applicationId);
    ResponseEntity<List<ApplicationDTO>> getAllApplications();
    ResponseEntity<List<JobDTO>> getJobsByCandidateEmail(String email);
    ResponseEntity<List<ApplicationDTO>> getAllApplicationsByJobId(UUID jobId);

    ResponseEntity<ApplicationDTO> getApplicationByUserEmailAndJobId(String userEmail, UUID jobId);
}
