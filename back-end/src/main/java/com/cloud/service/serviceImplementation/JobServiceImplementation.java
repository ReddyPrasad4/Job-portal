package com.cloud.service.serviceImplementation;
import com.cloud.DTO.JobDTO;
import com.cloud.Exception.JobPortalException;
import com.cloud.entity.Companies;
import com.cloud.entity.Jobs;
import com.cloud.repository.CompanyRepository;
import com.cloud.repository.JobRepository;
import com.cloud.service.serviceInterface.JobService;
import com.cloud.util.DTOConvertions;
import com.cloud.util.ServiceConstants;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class JobServiceImplementation implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    DTOConvertions dtoConvertions = new DTOConvertions();

    public ResponseEntity<String> createJob(JobDTO jobDto ,String companyEmail) {
        JobDTO jobDTO = new JobDTO();
        try {
            if (!ObjectUtils.isEmpty(jobDto)) {
                Jobs job = dtoConvertions.convert(jobDto);
                Companies companies =  companyRepository.findByCompanyEmail(companyEmail);
                job.setCompanies(companies);
                jobRepository.save(job);
                jobDTO.setMessage(ServiceConstants.SAVED_SUCCESSFULLY);
                return new ResponseEntity<>(jobDTO.getMessage(), HttpStatus.OK);
            } else {
                throw new JobPortalException(ServiceConstants.Object_NULL_ERROR);
            }
        }
        catch (JobPortalException j){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e) {
            e.printStackTrace();
            jobDTO.setMessage(e.getMessage());
            return new ResponseEntity<>(jobDTO.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    public ResponseEntity<List<JobDTO>> getAllJobs() {
        List<JobDTO> jobDTOS = null;
        try {
            List<Jobs> jobs = jobRepository.findAll();
            if (!CollectionUtils.isEmpty(jobs)) {
                jobDTOS = jobs.stream()
                        .map(dtoConvertions::convert)
                        .collect(Collectors.toList());
                jobDTOS.get(0).setMessage("JOBS FOUND SUCCESSFULLY");
                return new ResponseEntity<>(jobDTOS, HttpStatus.OK);
            } else {
                throw new JobPortalException(ServiceConstants.Object_NULL_ERROR);
            }
        }
        catch (JobPortalException j){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e) {
            e.printStackTrace();
            jobDTOS.get(0).setMessage(e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    public ResponseEntity<List<JobDTO>> searchJobsByRole(String jobRole) {
        JobDTO jobDTO = new JobDTO();
        List<JobDTO> jobDTOs = null;
        try {
            if (StringUtils.isEmpty(jobRole)) {
                throw new JobPortalException(ServiceConstants.Object_NULL_ERROR);
            }
            List<Jobs> jobsList = jobRepository.searchByJobRole(jobRole);
            if (CollectionUtils.isEmpty(jobsList)) {
                throw new JobPortalException(ServiceConstants.JOBS_NOT_FOUND);
            }
            jobDTOs = jobsList.stream()
                    .map(dtoConvertions::convert)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(jobDTOs, HttpStatus.OK);
        }
        catch (JobPortalException j){
            return new ResponseEntity<>(jobDTOs,HttpStatus.NOT_FOUND);
        }
        catch (Exception e) {
            e.printStackTrace();
            jobDTO.setMessage(e.getMessage());
            jobDTOs.add(jobDTO);
            return new ResponseEntity<>(jobDTOs,HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> deleteJob(UUID jobId) {
        JobDTO jobDTO = new JobDTO();
        try {
            Jobs jobs = jobRepository.findById(jobId).orElse(null);
            if (!ObjectUtils.isEmpty(jobs)) {
                jobs.setIsJobDeleted(true);
                jobRepository.save(jobs);
                jobDTO = dtoConvertions.convert(jobs);
                jobDTO.setMessage("Job soft Deletion successfully....");
                return new ResponseEntity<>(jobDTO.getMessage(), HttpStatus.OK);
            } else {
                throw new JobPortalException(ServiceConstants.Object_NULL_ERROR);
            }
        }
        catch (JobPortalException j){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e) {
            e.printStackTrace();
            jobDTO.setMessage("JOB Deletion fail...");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<JobDTO> getJob(UUID jobId) {
        JobDTO jobDTO = new JobDTO();
        try {
            Jobs jobs = jobRepository.findById(jobId).orElse(null);
            if (!ObjectUtils.isEmpty(jobs)) {
                jobDTO = dtoConvertions.convert(jobs);
                jobDTO.setCompanyDTO(dtoConvertions.convert(jobs.getCompanies()));
                jobDTO.setMessage("job FOUND SUCCESSFULLY");
                return new ResponseEntity<>(jobDTO, HttpStatus.OK);
            } else {
                jobDTO.setMessage("JOBS NOT FOUND...");
                return new ResponseEntity<>(jobDTO, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
            jobDTO.setMessage(e.getMessage());
            return new ResponseEntity<>(jobDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<JobDTO>> getAllJobsByCompanyEmail(String companyEmail) {
        List<JobDTO> jobDTOS = null;
        try {
            List<Jobs> jobs = jobRepository.findByCompaniesCompanyEmail(companyEmail);
            if (!CollectionUtils.isEmpty(jobs)) {
                jobDTOS = jobs.stream()
                        .map(dtoConvertions::convert)
                        .collect(Collectors.toList());
                jobDTOS.get(0).setMessage("JOBS FOUND SUCCESSFULLY");
                return new ResponseEntity<>(jobDTOS, HttpStatus.OK);
            } else {
                throw new JobPortalException(ServiceConstants.Object_NULL_ERROR);
            }
        }
        catch (JobPortalException j){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e) {
            e.printStackTrace();
            jobDTOS.get(0).setMessage(e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
}

