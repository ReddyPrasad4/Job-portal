import { useState } from 'react';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API } from '../../auth';

const AdminRegistration = () => {
    let navigate = useNavigate()
    const [companyData, setCompanyData] = useState({
        companyName: '',
        companyEmail: '',
        companyPassword: '',
        companyAddress: '',

    });
    const [errorMessage, setErrorMessage] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCompanyData({
            ...companyData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrorMessage = {
            name: '',
            email: '',
            password: '',
            address: '',
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let isValid = true;
        if (!companyData.companyEmail) {
            newErrorMessage.candidateEmailErrorMessage = 'Email Must Not Be Empty'
            isValid = false;

        }
        else if (!emailRegex.test(companyData.companyEmail)) {
            newErrorMessage.candidateEmailErrorMessage = 'Email should be in proper format'
            isValid = false;

        }
        if (!companyData.companyName) {
            newErrorMessage.candidateNameErrorMessage = 'Name should not be empty'
            isValid = false
        }
        if (!companyData.companyAddress) {
            newErrorMessage.graduationErrorMessage = 'Address should not be empty'
            isValid = false

        }
        const passwordRegax = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        if (!companyData.companyPassword) {
            newErrorMessage.password = "Password should not be empty'"
            isValid = false;

        }
        else if(!passwordRegax.test(companyData.companyPassword))
        {
            newErrorMessage.password = "Password must contain Minimum eight characters, one uppercase letter, one lowercase letter, one number and one special character "
            isValid = false;
        }
        
        
        setErrorMessage(newErrorMessage)
        if (isValid) {
            console.log(companyData);
            
            try {
                const response = await axios.post(COMPANY_API.REGISTER,companyData);
                console.log(response);
                if (response.status === 200) {
                    localStorage.setItem("email", companyData.companyEmail);
                }
                navigate('/companyHome')

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

        <div className='flex items-center justify-center'>
            <form onSubmit={handleSubmit}>
                <h1>Admin Registration Page</h1>
                <Input
                    label="Enter Company Name : "
                    type="text" name="companyName"
                    placeholder="Enter company name"
                    onChange={handleChange}
                    value={companyData.name}
                    errorMessage={errorMessage.name}
                />

                <Input
                    label="Enter Email Id : "
                    type="email"
                    name="companyEmail"
                    placeholder="Enter company email"
                    onChange={handleChange}
                    value={companyData.email}
                    errorMessage={errorMessage.email}
                />

                <Input
                    label="Enter Password"
                    type="password"
                    name="companyPassword"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    value={companyData.password}
                    errorMessage={errorMessage.password}
                />
                <Input
                    label="Re-enter Password"
                    type="password"
                    name="companyPassword"
                    placeholder="Re-enter Password"
                    onChange={handleChange}
                    value={companyData.password}
                    errorMessage={errorMessage.password}
                />
                <Input
                    label="Enter address"
                    type="text"
                    name="companyAddress"
                    placeholder="Enter company address"
                    onChange={handleChange}
                    value={companyData.address}
                    errorMessage={errorMessage.address}
                />
               
                <button type="submit">Register</button>
                {errorMessage.postError && <h2 className='text-red-500' >{errorMessage.postError}</h2>}
                <p>Already have an account ? <span className='cursor-pointer text-blue-600 hover:text-blue-300' onClick={()=> navigate  ('/')}>Click here</span></p>

            </form>
        </div>
    )
}

export default AdminRegistration