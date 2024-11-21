import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CANDIDATE_API } from '../../auth';
import Input from './Input';
import styles from './register.module.css'

const Register = () => {
    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        candidateName: '',
        candidateEmail: '',
        graduation: '',
        percentage: '',
        passedOutYear: '',
        candidatePassword: '',
        candidateRePassword: '',
        skills: []
    });
    const [errorMessage, setErrorMessage] = useState({
        candidateNameErrorMessage: '',
        candidateEmailErrorMessage: '',
        graduationErrorMessage: '',
        percentageErrorMessage: '',
        passedOutYearErrorMessage: '',
        candidatePasswordErrorMessage: '',
        candidateRePasswordErrorMessage: '',
        skillsErrorMessage: '',
        postError: ''
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        
        if (name === 'graduation') {
            console.log(name);
            setFormData({
                ...formData,
                [name]: value.toUpperCase(),

            });
        }
        else {
            setFormData({
                ...formData,
                [name]: value,

            });
        }
    };
    const handleSkillChange = (event) => {
        const { value } = event.target;
        setFormData((previousFormData) => {
            return {
                ...previousFormData,
                skills: value.split(",").map((skill) => skill.trim().toUpperCase())
            }
        })
    }
    // console.log(formData.skills)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrorMessage = {
            candidateNameErrorMessage: '',
            candidateEmailErrorMessage: '',
            graduationErrorMessage: '',
            percentageErrorMessage: '',
            passedOutYearErrorMessage: '',
            skillsErrorMessage: '',
            candidatePasswordErrorMessage: '',
            candidateRePasswordErrorMessage: '',
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let isValid = true;
        if (!formData.candidateEmail) {
            newErrorMessage.candidateEmailErrorMessage = 'Email should not Be Empty'
            isValid = false;

        }
        else if (!emailRegex.test(formData.candidateEmail)) {
            newErrorMessage.candidateEmailErrorMessage = 'Email should be in proper format'
            isValid = false;

        }
        if (!formData.candidateName) {
            newErrorMessage.candidateNameErrorMessage = 'Name should not Be Empty'
            isValid = false
        }
        if (!formData.graduation) {
            newErrorMessage.graduationErrorMessage = 'Graduation should not Be Empty'
            isValid = false

        }
        if (!formData.percentage) {
            newErrorMessage.percentageErrorMessage = "Percentage should not Be Empty'"
            isValid = false;

        }
        if (!formData.passedOutYear) {
            newErrorMessage.passedOutYearErrorMessage = 'Passed out year should not Be Empty'
            isValid = false;

        }
        if (formData.skills.length === 0) {
            newErrorMessage.skillsErrorMessage = 'Skills should Not Be Empty'
            isValid = false;

        }
        const passwordRegax = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        if (!formData.candidatePassword) {
            newErrorMessage.candidatePasswordErrorMessage = 'Password should not be empty'
            isValid = false;

        }
        else if (!passwordRegax.test(formData.candidatePassword)) {
            newErrorMessage.candidatePasswordErrorMessage = 'Password must contain Minimum eight characters, one uppercase letter, one lowercase letter, one number and one special character '
            isValid = false;

        }

        if (!formData.candidateRePassword) {
            newErrorMessage.candidateRePasswordErrorMessage = 'Please re-enter the password'
            isValid = false;

        }
        else if (formData.candidatePassword !== formData.candidateRePassword) {
            newErrorMessage.candidateRePasswordErrorMessage = 'Password not matched'
            isValid = false;
        }


        setErrorMessage(newErrorMessage)
        if (isValid) {
            try {
                console.log(formData);
                const response = await axios.post(CANDIDATE_API.REGISTER, formData);
                console.log(response);
                if (response.status === 201) {
                    localStorage.setItem("email", formData.candidateEmail);
                    navigate('/jobs')
                }

            } catch (error) {
                console.error('There was an error registering:', error);
                console.log(error.response.data);
                setErrorMessage(({
                    postError: error.response.data,
                }))

            }
        }

    }

    return (

        <div className={styles.mainContainer}>
            <form onSubmit={handleSubmit}>
                <h1 className='text-xxl text-fuchsia-700'> User Registration Page</h1>
                <Input
                    label="Enter candidate Name : "
                    type="text" name="candidateName"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    value={formData.name}
                    errorMessage={errorMessage.candidateNameErrorMessage}
                />



                <Input
                    label="Enter Graduation"
                    type="text"
                    name="graduation"
                    placeholder="Enter your Graduation"
                    onChange={handleChange}
                    value={formData.graduation}
                    errorMessage={errorMessage.graduationErrorMessage}
                />
                <Input
                    label="Enter Percentage"
                    type="number"
                    name="percentage"
                    placeholder="Enter your Percentage"
                    onChange={handleChange}
                    value={formData.percentage}
                    errorMessage={errorMessage.percentageErrorMessage}
                />
                <Input
                    label="Enter Passed out Year"
                    type="number"
                    name="passedOutYear"
                    placeholder="Enter your Passed Out Year"
                    onChange={handleChange}
                    value={formData.passedOutYear}
                    errorMessage={errorMessage.passedOutYearErrorMessage}
                />
                <Input
                    label="Enter Skills"
                    type="text"
                    name="skills"
                    placeholder="Enter your Skills"
                    onChange={handleSkillChange}
                    // value={formData.skills}
                    errorMessage={errorMessage.skillsErrorMessage}
                />
                <Input
                    label="Enter Email Id : "
                    type="email"
                    name="candidateEmail"
                    placeholder="Enter your Email"
                    onChange={handleChange}
                    value={formData.email}
                    errorMessage={errorMessage.candidateEmailErrorMessage}
                />
                <Input
                    label="Enter password : "
                    type="password"
                    name="candidatePassword"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    value={formData.candidatePassword}
                    errorMessage={errorMessage.candidatePasswordErrorMessage}
                />
                <Input
                    label="Enter Re-enter password : "
                    type="password"
                    name="candidateRePassword"
                    placeholder="Re-enter Password"
                    onChange={handleChange}
                    value={formData.candidateRePassword}
                    errorMessage={errorMessage.candidateRePasswordErrorMessage}
                />
                <button type="submit"  >Register</button>
                {errorMessage.postError && <h2 className='text-red-500' >{errorMessage.postError}</h2>}
                <p>Already have an account ? <span className='cursor-pointer text-blue-600 hover:text-blue-300' onClick={() => navigate('/')}>Click here</span></p>
            </form>
        </div>
    )
}

export default Register