let BASE_URL = "http://localhost:8080";

export const CANDIDATE_API = {
    REGISTER : `${BASE_URL}/candidate/saveCandidate`,
    UPDATE_MAIL : `${BASE_URL}/candidate/updateEmail`,      // updateEmail/{candidateId}/{newEmail}
    LOGIN : `${BASE_URL}/candidate/candidatelogin`

}

export const COMPANY_API = {
    REGISTER : `${BASE_URL}/company/saveCompany`,
    LOGIN : `${BASE_URL}/company/companyLogin`,
}

export const JOB_API = {
    POST_JOB : `${BASE_URL}/job/saveJob`,
    GET_ALL : `${BASE_URL}/job/getAllJobs`,
    GET_BY_ROLE : `${BASE_URL}/job/getAllJobsByRole`,
    DELETE : `${BASE_URL}/job/deleteJob`,                   // deleteJob/{jobId}
    GET_BY_ID : `${BASE_URL}/job/getJob`,                 
    GET_BY_COMPANY_EMAIL :`${BASE_URL}/job/getAllJobsByCompany`,
    

}

export const APPLICATION_API = {
    APPLY : `${BASE_URL}/application/applyForJob`,               // applyForJob/{candidateEmail}/{jobId}
    SAVE_SHORTLISTED : `${BASE_URL}/application/saveShortlistedCandidates`, // saveShortlistedCandidates/{applicationId}
    GET_BY_ROLE : `${BASE_URL}/application/getAllJobsByRole`,
    GET_JOBS_BY_CANDIDATE_EMAIL : `${BASE_URL}/application/getJobsByCandidateId`,
    DELETE : `${BASE_URL}/application/deleteJob`,
    GET_APPLICATIONS_BY_JOB_ID : `${BASE_URL}/application/getApplicationsByJobId`,
    GET_APPLICATIONS_BY_USER_EMAIL_JOB_ID : `${BASE_URL}/application/getApplication`
}
