import JobsList from '../job/JobsList';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { JOB_API } from '../../auth';
import Loader from '../Loader';

const CompanyHomePage = () => {
    let navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
   
    let companyEmail = localStorage.getItem("email");
    useEffect(() => {
        let handleCompanyJobs = async () => {
            try {
                let response = await axios.get(`${JOB_API.GET_BY_COMPANY_EMAIL}/${companyEmail}`);
                setJobs(response.data);
                setIsLoading(false)
            }
            catch (error) {
                console.error(error);
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)

            }
        }
        handleCompanyJobs();

    }, [companyEmail]);

    function handleOnClick() {
        navigate("/postJobs")
    }
    let handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }

    let handleViewApplications = (jobId) => {
        navigate('/viewApplications', {
            state: {
                jobId: jobId,
            }
        })
    }
    return (
        <>
            {isLoading ?
                <Loader /> :
                <>
                    <div className="mx-40 flex justify-between items-center">
                        <button onClick={handleOnClick} className="bg-blue-600 font-bold rounded-lg p-2 px-4 mt-5 text-white">Post Jobs</button>
                        <button onClick={handleLogout} className="bg-blue-600 font-bold rounded-lg p-2 px-4 mt-5 text-white">Log Out</button>
                    </div>
                    <JobsList jobs={jobs} handleButtonClick={handleViewApplications} buttonName='View Applications' />
                    {jobs.length === 0 ? <h1 className='text-center'>You have not posted a job yet Please post jobs by <span className="text-blue-700 text-center cursor-pointer hover:text-blue-300" onClick={() => navigate('/postJobs')}>Clicking Here</span> </h1> : ''}

                </>}

        </>
    )
}

export default CompanyHomePage