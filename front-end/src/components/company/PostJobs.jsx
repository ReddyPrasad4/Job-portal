import { useState } from 'react'
import Input from '../registration/Input';
import axios from 'axios';
import { JOB_API } from '../../auth';
import { useNavigate } from 'react-router-dom';

const PostJobs = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(false)
    const [getPostedJob, setPostJob] = useState({
        jobRole: "",
        noOfOpenings: 0,
        minimumPercentage: 0.0,
        requiredPassedOutYear: 0,
        reqskills: [],
        requiredGraduation: []
    })
    const [errorMessage, setErrorMessage] = useState({
        jobRoleError: "",
        noOfOpeningsError: "",
        minimumPercentageError: "",
        requiredPassedOutYearError: "",
        reqskillsError: "",
        requiredGraduationError: ""
    })
    function handleOnChange(e) {
        const { name, value } = e.target;
        setPostJob({
            ...getPostedJob,
            [name]: value
        })
    }
    function handleChangeList(e) {
        const { name, value } = e.target;
        setPostJob((prev) => ({
            ...prev,
            [name]: value.split(",").map((skill)=> skill.trim().toUpperCase()),
        }
        ))
    }
    const postJob = async (e) => {
        e.preventDefault();
        const error = {
            jobRoleError: "",
            noOfOpeningsError: "",
            minimumPercentageError: "",
            requiredPassedOutYearError: "",
            reqskillsError: "",
            requiredGraduationError: ""
        }
        let isValid = true;
        if (!getPostedJob.jobRole) {
            error.jobRoleError = "Job role should not be empty"
            isValid = false;
        }
        if (!getPostedJob.minimumPercentage) {
            error.minimumPercentageError = "Minimum percentage should not be empty"
            isValid = false;
        }
        if (!getPostedJob.noOfOpenings) {
            error.noOfOpeningsError = "Number of openings should not be empty"
            isValid = false;
        }
        if (!getPostedJob.requiredPassedOutYear) {
            error.requiredPassedOutYearError = "Required passed out year should not be empty"
            isValid = false
        }
        if (getPostedJob.reqskills.length === 0) {
            error.reqskillsError = "reqskills must not be empty"
            isValid = false;
        }
        if (getPostedJob.requiredGraduation.length === 0) {
            error.requiredGraduationError = "Required graduation should not be empty"
            isValid = false;
        }
        setErrorMessage(error)
        if (isValid) {
            try {

                let response = await axios.post(`${JOB_API.POST_JOB}/${localStorage.getItem('email')}`, getPostedJob)
                console.log(response)
                setMessage(true)
                setTimeout(() => {
                    setMessage(false);
                    navigate("/companyHome");
                }, 1500);
            } catch (error) {
                console.error(error)
                setMessage()
            }
        }
    }
    function handleClick() {
        navigate("/companyHome")
    }
    return (
        <div>
            <button className='bg-blue-600 rounded-lg p-2 px-4 text-white ml-24 mt-4' onClick={handleClick}>Go-Back</button>
            <div className='flex items-center justify-center'>
                <form onSubmit={postJob}>
                    <h1>Post Job</h1>
                    <Input label="Enter Job Role: "
                        type="text" name="jobRole"
                        placeholder="Enter job role"
                        onChange={handleOnChange}
                        errorMessage={errorMessage.jobRoleError}
                    />
                    <Input label="Enter number Of Openings: "
                        type="text" name="noOfOpenings"
                        placeholder="Enter number Of Openings"
                        onChange={handleOnChange}
                        errorMessage={errorMessage.noOfOpeningsError}
                    />
                    <Input label="Enter minimum percentage: "
                        type="text" name="minimumPercentage"
                        placeholder="Enter minimum percentage Required"
                        onChange={handleOnChange}
                        errorMessage={errorMessage.minimumPercentageError}
                    />
                    <Input label="Enter required passed-out Year: "
                        type="text" name="requiredPassedOutYear"
                        placeholder="Enter required passed out year"
                        onChange={handleOnChange}
                        errorMessage={errorMessage.requiredPassedOutYearError}
                    />
                    <Input label="Enter reqskills: "
                        type="text" name="reqskills"
                        placeholder="Enter required Skills"
                        onChange={handleChangeList}
                        errorMessage={errorMessage.reqskillsError}
                    />
                    <Input label="Enter required graduation: "
                        type="text" name="requiredGraduation"
                        placeholder="Enter required graduation"
                        onChange={handleChangeList}
                        errorMessage={errorMessage.requiredGraduationError}
                    />
                    <button type="submit" className="bg-blue-600 rounded-lg p-2 px-4 text-white">post</button>
                    {/* {message && <p className='text-green-500'>Job Posted Successfully</p>} */}
                </form>
                {message && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                        <div className='bg-white flex items-center gap-y-8 flex-col p-4 rounded shadow font-bold'>
                            <h1 className=' text-green-500'>{getPostedJob.jobRole} job successfully posted</h1>
                            <button onClick={() => navigate('/companyHome')} className='w-16 p-2 rounded-md bg-gray-400 hover:bg-gray-600 hover:text-white' >Ok</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostJobs