import { useEffect, useState } from "react"
import { APPLICATION_API } from "../../auth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";

const ViewApplications = () => {
    let [applicants, setApplicants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    let location = useLocation();
    const jobId = location.state.jobId;
    const[shortListMessage,setShortListMessageMessage] = useState('')

    useEffect(() => {
        let handleApplications = async () => {
            try {
                let response = await axios.get(`${APPLICATION_API.GET_APPLICATIONS_BY_JOB_ID}/${jobId}`);
                setApplicants(response.data);
            }
            catch (error) {
                console.error(error)
            }
            setIsLoading(false);
        }
        handleApplications();
    }, [shortListMessage])
        
    let handleGoHome = ()=>{
        navigate('/companyHome')
    }

    let handleShortList = async (applicationId)=>{
        try{
            let response = await axios.put(`${APPLICATION_API.SAVE_SHORTLISTED}/${applicationId}`)
            setShortListMessageMessage(response.data)
            console.log(response);
            
        }
        catch(error)
        {
            console.log(error);
        }
        
    }


    return (
        <>
            {isLoading ?
                <Loader /> :
                <div className="m-4">
                    <button onClick={handleGoHome} className=" w-24 h-10 rounded-md text-white font-bold bg-blue-600">Home</button>
                    <table className="mt-2 w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600">Candidate Email</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600">Candidate Name</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600">Graduation</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600">Passed Out Year</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600">Percentage</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600">Skills</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600">Shortlist</th>

                            </tr>
                        </thead>
                        <tbody>
                            { applicants.length===0 ?
                             <tr>
                                <td colSpan={7} className="text-center font-bold bg-gray-300">No Aplicants yet</td>
                             </tr> :
                                applicants.map((applicant, index) => (
                                    <tr className="hover:bg-gray-50" key={index}>
                                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{applicant.candidateDTO.candidateEmail}</td>
                                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{applicant.candidateDTO.candidateName}</td>
                                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{applicant.candidateDTO.graduation}</td>
                                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{applicant.candidateDTO.passedOutYear}</td>
                                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{applicant.candidateDTO.percentage}%</td>
                                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">{applicant.candidateDTO.skills.join(', ')}</td>
                                        <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                                            <button className="p-2 px-4 font-bold text-white rounded-md bg-blue-500 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled={applicant.shortListedCandidate===true} onClick={()=>handleShortList(applicant.applicationId)}>{applicant.shortListedCandidate===false ? "Shortlist":"Shortlisted"}</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    
                </div>}
        </>
    )
}

export default ViewApplications