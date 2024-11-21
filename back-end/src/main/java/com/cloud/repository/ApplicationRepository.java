package com.cloud.repository;
import com.cloud.entity.Applications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface ApplicationRepository extends JpaRepository<Applications, UUID> {

    Applications findByCandidate_CandidateEmailAndJobs_JobId(String candidateEmail, UUID jobId);


    List<Applications> findByCandidate_CandidateEmail(String email);

    List<Applications> findByJobsJobId(UUID jobId);

    Applications findByJobsJobIdAndCandidateCandidateEmail(UUID jobId, String userEmail);
}
