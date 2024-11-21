import { useNavigate } from "react-router-dom"
import JobsList from "./JobsList"
import { useEffect, useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import { APPLICATION_API } from "../../auth";

const AppliedJobs = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    let userEmail = localStorage.getItem("email")
    let navigate = useNavigate()

    useEffect(() => {
        let handleFilteredData = async () => {
            try {
                let response = await axios.get(`${APPLICATION_API.GET_JOBS_BY_CANDIDATE_EMAIL}/${userEmail}`);
                setJobs(response.data)
            }
            catch (error) {
                console.log(error);
            }
            setIsLoading(false)
        }
        handleFilteredData()
    }, [userEmail])

    let handleBackToHome = () => {
        navigate('/jobs')
    }

    let handleViewStatus = async (jobId)=>{
        try {
            let response = await axios.get(`${APPLICATION_API.GET_APPLICATIONS_BY_USER_EMAIL_JOB_ID}/${userEmail}/${jobId}`);
            console.log(response);
            let message ;
            if(response.data.shortListedCandidate===true)
            {
                 message = `You are shortlisted for the interview rounds. Please check your email starts with ${userEmail.substring(0,userEmail.indexOf('@')/2)}${new Array(userEmail.length-3).fill('*').join('')} `
            }
            else{
                message =  "Your status is in pending"
            }
            navigate('/viewApplicationsStatus',{
                state :{
                    message : message
                }
            })
           
            
        }
        catch(error)
        {
            console.error(error)
        }

       
    }
    return (
        <>
            {isLoading ?
                <Loader /> :
                <div className="mt-10 p-2">
                    <button className="ml-36 font-medium p-2 rounded-md bg-blue-700 text-white" onClick={handleBackToHome} >Back Home</button>

                    <JobsList jobs={jobs} handleButtonClick={handleViewStatus}  buttonName="View status" />
                    {jobs.length === 0 ? <h1 className="text-center">You have not applied a job yet Please apply jobs by <span className="text-blue-700 cursor-pointer hover:text-blue-300" onClick={() => navigate('/jobs')}>Clicking Here</span> </h1> : ''}
                </div>}

        </>

    )
}

export default AppliedJobs