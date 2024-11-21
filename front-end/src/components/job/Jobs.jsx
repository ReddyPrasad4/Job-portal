import axios from "axios";
import { useEffect, useState } from "react";
import { JOB_API } from "../../auth";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import JobsList from "./JobsList";
import SearchBar from "./SearchBar";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    const [showHome, setShowHome] = useState();
    const [jobRole, setJobRole] = useState();
    // const [goToHome ,setGoToHome] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        let fetchJobs = async () => {
            try {
                const response = await axios.get(JOB_API.GET_ALL)
                setJobs(response.data)
                setErrorMessage()
            } catch {
                console.error("error retriving jobs")
                setErrorMessage('No jobs to apply')
            }
            setIsLoading(false);
            setJobRole('')
        }
        fetchJobs();
    }, [showHome])

    let handleFilterJob = async (jobRole) => {

        let errorMessage = "";
        if (jobRole) {
            setIsLoading(true)
            try {
                const response = await axios.get(`${JOB_API.GET_BY_ROLE}/${jobRole}`)
                setJobs(response.data)
                console.log(response.data)
                setIsLoading(false)

            }
            catch {
                console.error("Error filtering Jobs")
                errorMessage = "No Jobs Found"
                setJobs()
                setIsLoading(false)
                
            }
        }
        else {
            errorMessage = "Job Role should not be empty"
        }
        setErrorMessage(errorMessage)
    
    }

    let handleApplyClick = (jobId) => {
        navigate('/jobDetails', {
            state: {
                jobId: jobId,
            }
        })
    
    }
    let handleAppliedJobs = ()=>{
        navigate('/appliedJobs')
    }



    return (
        <>
            {isLoading ?
                <Loader /> :
                <div className="bg-slate-100 p-6 ">
                    <SearchBar errorMessage={errorMessage} handleFilter={handleFilterJob} jobRole={jobRole} setJobRole={setJobRole} setShowHome={setShowHome} showHome={showHome} />
                    <div className="flex items-center justify-between px-40 py-3">
                        {(errorMessage=='Job Role should not be empty' || !errorMessage) ? 
                        <h1 className="text-3xl font-bold text-gray-700 flex flex-col items-center">Available Job{jobs.length > 1 && "'s"} List</h1>:''}
                        <button className="p-2 rounded-md font-medium text-white bg-blue-700" onClick={handleAppliedJobs}>View Applied Jobs</button>
                    </div>
                    <JobsList jobs={jobs} buttonName="Apply" handleButtonClick={handleApplyClick} />
                    
                </div>}
        </>
    )
}

export default Jobs