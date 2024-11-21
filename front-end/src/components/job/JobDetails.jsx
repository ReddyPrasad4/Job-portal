import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { APPLICATION_API, JOB_API } from "../../auth";
import Loader from "../Loader";

const JobDetails = () => {
    let location = useLocation();
    const [isLoading, setIsLoading] = useState(true)
    const [job, setJob] = useState({})
    const navigate = useNavigate();
    // const [message, setMessage] = useState('');
    const jobId = location.state.jobId;
    let userEmail = localStorage.getItem("email");


    useEffect(() => {
        let fetchJob = async () => {
            try {
                let response = await axios.get(`${JOB_API.GET_BY_ID}/${jobId}`);
                setJob(response.data)
                
            }
            catch (error) {
                console.log(error);
            }
            setIsLoading(false)
        }
        fetchJob();

    }, [jobId])


    let handleApplyJob = async () => {
        let message = ""
        try {
            let response = await axios.post(`${APPLICATION_API.APPLY}/${userEmail}/${jobId}`)
            // console.log(response.data);
            message= response.data;
        }
        catch (error) {
            console.log(error); 
            message= error.response.data;
        }
        finally{
            navigate('/applyForJob',{
                state :{
                    message : message,
                }
            });
        }
    }
    // console.log(job);
    

    return (
        <>
            {isLoading ?
                <Loader /> :
                <div className="flex justify-center items-center h-screen bg-slate-200">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full flex flex-col items-center">
                        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Job Details</h1>
                        <ul className="text-gray-700 mb-6 space-y-2">
                            <li><strong>Company Name : {job.companyDTO.companyName}</strong></li>
                            <li><strong>Role:</strong> {job.jobRole}</li>
                            <li><strong>Minimum Percentage:</strong> {job.minimumPercentage}%</li>
                            <li><strong>Required Skills:</strong> {job.reqskills.join(", ")}</li>
                            <li><strong>Required Graduation:</strong> {job.requiredGraduation.join(", ")}</li>
                            <li><strong>Passed Out Year:</strong> {job.requiredPassedOutYear}</li>
                            <li><strong>No. of Openings:</strong> {job.noOfOpenings}</li>
                        </ul>
                        <button
                            className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold "
                            onClick={() => handleApplyJob(job.jobId)}
                        >
                            Apply Now
                        </button>
                    </div>
                </div>}
        </>
    )
}

export default JobDetails