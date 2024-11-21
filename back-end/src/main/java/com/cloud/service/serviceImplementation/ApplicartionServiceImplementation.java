package com.cloud.service.serviceImplementation;

import com.cloud.DTO.ApplicationDTO;
import com.cloud.DTO.CandidateDTO;
import com.cloud.DTO.JobDTO;
import com.cloud.Exception.JobPortalException;
import com.cloud.entity.Applications;
import com.cloud.entity.Candidate;
import com.cloud.entity.Jobs;
import com.cloud.repository.ApplicationRepository;
import com.cloud.repository.CandidateRepository;
import com.cloud.repository.JobRepository;
import com.cloud.service.serviceInterface.ApplicationService;
import com.cloud.util.DTOConvertions;
import com.cloud.util.ServiceConstants;
import org.apache.tomcat.util.buf.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ApplicartionServiceImplementation implements ApplicationService {
    @Autowired
    private CandidateRepository candidateRepository;
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private ApplicationRepository applicationRepository;

    DTOConvertions dtoConvertions = new DTOConvertions();

    //this method is for apply for job
    public ResponseEntity<String> applyForJob(String candidateEmail, UUID jobId) {
        ApplicationDTO applicationDTO = new ApplicationDTO();
        try {
            Candidate candidate = candidateRepository.findByCandidateEmail(candidateEmail);
            Jobs jobs = jobRepository.findById(jobId).orElse(null);
            if (ObjectUtils.isEmpty(candidate)) {
                throw new JobPortalException(ServiceConstants.CANDIDATES_NOT_FOUND);
            }
            if (ObjectUtils.isEmpty(jobs)) {
                throw new JobPortalException(ServiceConstants.JOBS_NOT_FOUND);
            }
            try {
                validateCandidateForJob(candidate, jobs);
            } catch (JobPortalException j) {
                j.printStackTrace();
                applicationDTO.setMessage(j.getMessage());
                return new ResponseEntity<>(applicationDTO.getMessage(), HttpStatus.BAD_REQUEST);
            }
            Applications existingApplication = applicationRepository.findByCandidate_CandidateEmailAndJobs_JobId(candidateEmail, jobId);
            if (existingApplication != null) {
                applicationDTO.setMessage("YOU ALREADY APPLIED FOR THIS JOB.");
                return new ResponseEntity<>(applicationDTO.getMessage(), HttpStatus.BAD_REQUEST);
            }

            Applications application = new Applications();
            application.setCandidate(candidate);
            application.setJobs(jobs);
            application.setShortListedCandidate(false);
            application.setApplicationDeleted(false);
            applicationRepository.save(application);
            applicationDTO.setMessage("APPLIED SUCCESSFULLY..");
            return new ResponseEntity<>(applicationDTO.getMessage(), HttpStatus.OK);
        } catch (JobPortalException j) {
            j.printStackTrace();
            applicationDTO.setMessage(j.getMessage());
            return new ResponseEntity<>(applicationDTO.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            applicationDTO.setMessage("You Already Applied For this Job");
            return new ResponseEntity<>(applicationDTO.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    private void validateCandidateForJob(Candidate candidate, Jobs job) {
        Set<String> requiredGraduation = job.getRequiredGraduation();
        if (!requiredGraduation.contains(candidate.getGraduation())) {
            throw new JobPortalException("Your Graduation is Not suitable for this Role");
        }
        if (candidate.getPercentage() < job.getMinimumPercentage()) {
            throw new JobPortalException("Percentage required more the job minimum percentage");
        }
        int yearDifference = Math.abs(candidate.getPassedOutYear() - job.getRequiredPassedOutYear());
        if (yearDifference > 2) {
            throw new JobPortalException("Your Passedyear not suitable for job");
        }
        Set<String> requiredSkills = job.getReqskills();
        Set<String> candidateSkills = candidate.getSkills();
        long matchingSkillsCount = candidateSkills.stream()
                .filter(requiredSkills::contains)
                .count();
        if (matchingSkillsCount < 1) {
            throw new JobPortalException("Candidate must have at least two required skills for this job.");
        }
    }


    @Transactional
    public ResponseEntity<String> shortlistCandidateIfEligible(UUID applicationId) {
        ApplicationDTO applicationDTO = new ApplicationDTO();
        try {
            Applications application = applicationRepository.findById(applicationId).orElse(null);
            if (ObjectUtils.isEmpty(application)) {
                throw new JobPortalException("APPLICATION NOT FOUND");
            }
            Candidate candidate = application.getCandidate();
            Jobs job = application.getJobs();
            Set<String> requiredSkills = job.getReqskills();
            Set<String> candidateSkills = candidate.getSkills();
            Set<String> requiredGraduation = job.getRequiredGraduation();

            if (!requiredGraduation.contains(candidate.getGraduation())) {
                applicationDTO.setMessage("Candidate's graduation does not meet the job requirement.");
                return new ResponseEntity<>(applicationDTO.getMessage(), HttpStatus.BAD_REQUEST);
            }
            if (candidate.getPercentage() < job.getMinimumPercentage()) {
                applicationDTO.setMessage("Candidate's percentage is below the minimum required.");
                return new ResponseEntity<>(applicationDTO.getMessage(), HttpStatus.BAD_REQUEST);
            }
            long matchingSkillsCount = candidateSkills.stream()
                    .filter(requiredSkills::contains)
                    .count();

            if (matchingSkillsCount >= 2) {
                application.setShortListedCandidate(true);
                applicationRepository.save(application);  // Save the updated application

                applicationDTO.setMessage("Candidate successfully shortlisted.");
                return new ResponseEntity<>(applicationDTO.getMessage(), HttpStatus.OK);
            } else {
                applicationDTO.setMessage("Candidate does not match enough skills for the job.");
                return new ResponseEntity<>(applicationDTO.getMessage(), HttpStatus.BAD_REQUEST);
            }


        } catch (Exception e) {
            e.printStackTrace();
            applicationDTO.setMessage(e.getMessage());
            return new ResponseEntity<>(applicationDTO.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public ResponseEntity<String> shortlistCandidate(UUID applicationId) {
        ApplicationDTO applicationDTO = new ApplicationDTO();
        try {
            Applications application = applicationRepository.findById(applicationId).orElse(null);
            if (ObjectUtils.isEmpty(application)) {
                throw new JobPortalException("APPLICATION NOT FOUND");
            }
            if (application.getShortListedCandidate()) {
                return new ResponseEntity<>("You Are shortlisted .", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("You are not eligible for this job.", HttpStatus.BAD_REQUEST);
            }
        } catch (JobPortalException j) {
            return new ResponseEntity<>("Object Not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public ResponseEntity<List<ApplicationDTO>> getAllApplications() {
        List<ApplicationDTO> applicationDTO = null;
        try {
            List<Applications> applications = applicationRepository.findAll();
            if (!CollectionUtils.isEmpty(applications)) {
                applicationDTO = applications.stream()
                        .map(dtoConvertions::convert)
                        .collect(Collectors.toList());
                applicationDTO.get(0).setMessage("Application Found");
                return new ResponseEntity<>(applicationDTO, HttpStatus.OK);
            } else {
                throw new JobPortalException("Applications Not Found");
            }
        } catch (JobPortalException j) {
            j.printStackTrace();
            applicationDTO.get(0).setMessage(j.getMessage());
            return new ResponseEntity<>(applicationDTO, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            applicationDTO.get(0).setMessage(e.getMessage());
            return new ResponseEntity<>(applicationDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    public ResponseEntity<List<JobDTO>> getJobsByCandidateEmail(String email) {
        JobDTO jobDTO = new JobDTO();
        try {
            if (ObjectUtils.isEmpty(email)) {
                throw new JobPortalException("Id Should Not be Empty ");
            }
            List<Applications> applicationsList = applicationRepository.findByCandidate_CandidateEmail(email);
            List<JobDTO> jobDTOList = applicationsList.stream().map(applications -> {
                Jobs job = applications.getJobs();
                return dtoConvertions.convert(job);
            }).collect(Collectors.toList());
            return new ResponseEntity<>(jobDTOList, HttpStatus.OK);
        } catch (Exception e) {
            jobDTO.setMessage(e.getLocalizedMessage());
            return new ResponseEntity<>(List.of(jobDTO), HttpStatus.OK);
        }
    }

    @Override
    public  ResponseEntity<List<ApplicationDTO>> getAllApplicationsByJobId(UUID jobId){
        try{
            List<Applications> applications=applicationRepository.findByJobsJobId(jobId);
            if(!CollectionUtils.isEmpty(applications)){
                List<ApplicationDTO> applicationsList=   applications.stream().map(application->{
                    Candidate candidate =  application.getCandidate();
                    CandidateDTO candidateDTO = dtoConvertions.convert(candidate);
                    Jobs jobs = application.getJobs();
                    JobDTO jobDTO = dtoConvertions.convert(jobs);
                    ApplicationDTO convertedApplicationDTO = dtoConvertions.convert(application);
                    convertedApplicationDTO.setCandidateDTO(candidateDTO);
                    convertedApplicationDTO.setJobDTO(jobDTO);
                    return  convertedApplicationDTO;

                }).collect(Collectors.toList());
                return new ResponseEntity<>(applicationsList,HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(Collections.emptyList(),HttpStatus.BAD_REQUEST);
            }
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(Collections.emptyList(),HttpStatus.BAD_REQUEST);
        }

    }

    @Override
    public ResponseEntity<ApplicationDTO> getApplicationByUserEmailAndJobId(String userEmail, UUID jobId) {
        ApplicationDTO responseApplicationDTO = new ApplicationDTO();
        try{
            if(!ObjectUtils.isEmpty(jobId)&& !userEmail.isEmpty())
            {
                Applications applications=applicationRepository.findByJobsJobIdAndCandidateCandidateEmail(jobId,userEmail);
                if(!ObjectUtils.isEmpty(applications)){

                    return new ResponseEntity<>(dtoConvertions.convert(applications),HttpStatus.OK);
                }

            }
            responseApplicationDTO.setMessage("No Data Found");
            return new ResponseEntity<>(responseApplicationDTO,HttpStatus.BAD_REQUEST);
        }
        catch (Exception e){
            e.printStackTrace();
            responseApplicationDTO.setMessage("Error in fetching application");
            return new ResponseEntity<>(responseApplicationDTO,HttpStatus.BAD_REQUEST);
        }

    }
}



