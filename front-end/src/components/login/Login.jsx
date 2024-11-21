import { useState } from 'react';
import Input from '../registration/Input'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CANDIDATE_API, COMPANY_API } from '../../auth';
const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        type: '',
    });

    const [errorMessage, setErrorMessage] = useState({
        emailMessage: '',
        passwordMessage: '',
        typeMessage: '',
        userFoundMessage :'',
    });
    let navigate = useNavigate();

    let handleInputChange = (event) => {
        const { name, value } = event.target;

        setCredentials(({
            ...credentials,
            [name]: value,
        }))
    }

    let handleFormSubmit = (event) => {
        event.preventDefault();
        let message = {
            emailMessage: '',
            passwordMessage: '',
            typeMessage: '',
            userFoundMessage:'',
        };
        let isValid = true;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!credentials.email)
        {
            isValid = false;
            message.emailMessage = "Email should not be empty"
        }
        else if(!emailRegex.test(credentials.email))
        {
            isValid = false;
            message.emailMessage = 'Enter proper email format'
        }
        if(!credentials.password)
        {
            isValid = false;
            message.passwordMessage ='Password should not be empty'
        }
        if (!credentials.type)
        {
            isValid = false;
            message.typeMessage = 'Please select the type'
        }
    
        setErrorMessage(message);
        if(isValid)
        {
            if(credentials.type ==='Admin')
            {
                
                let validateAdminCredentials = async ()=>{
                    // console.log(credentials);
                    
                    try {
                        let response = await axios.get(`${COMPANY_API.LOGIN}/${credentials.email}/${credentials.password}`);
                        console.log(response.data);
                        localStorage.setItem("email", credentials.email);
                        navigate('/companyHome');
                    }
                    catch (error)
                    {
                        console.error(error);
                        setErrorMessage({userFoundMessage:"Enter admin valid credentials"});
                    }
                }
                validateAdminCredentials();
            }
            else if (credentials.type === 'User')
            {
                console.log(credentials);   
                let validateUserCredentials = async () =>{
                    try {
                        let response = await axios.get(`${CANDIDATE_API.LOGIN}?email=${credentials.email}&password=${credentials.password}`);
                        localStorage.setItem("email", credentials.email);
                        console.log( response.data);
                        navigate('/jobs')
                        
                    }
                    catch (error)
                    {
                        console.log(error.response);
                        setErrorMessage(prev => ({ 
                            ...prev, 
                            userFoundMessage: "Enter user valid credentials" 
                        }));
                        
                    }
                }
                validateUserCredentials();
            }
            
        }

    }
    // console.log(errorMessage);
    

    return (
        <div className='h-screen flex items-center justify-center bg-stone-100'>
            <form  onSubmit={handleFormSubmit}>
                <h1>Login Page</h1>
                <Input
                    label="Enter Email :"
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    onChange={handleInputChange}
                    value={credentials.email}
                    errorMessage={errorMessage.emailMessage} />

                <Input
                    label="Enter Passowrd : "
                    type="password" name="password"
                    placeholder="Enter your name"
                    onChange={handleInputChange}
                    value={credentials.password}
                    errorMessage={errorMessage.passwordMessage}
                />
                <select name="type" value={credentials.type} onChange={handleInputChange} className={`border-[1px] pl-2 font-bold border-blue-400 outline-none w-64 p h-10 rounded-md  ${errorMessage.typeMessage &&  'border-red-400'}`} >
                    <option  className='hover:bg-blue-600 ' value="">Select Role</option>
                    <option className='' value="Admin">Admin</option>
                    <option className='hover:bg-blue-600' value="User">User</option>
                </select>
                {errorMessage.typeMessage && <h2 className='text-red-500'>{errorMessage.typeMessage}</h2> }
                <button>Login</button>
                {errorMessage.userFoundMessage && <h2 className='font-bold text-red-500' >{errorMessage.userFoundMessage}</h2>}

                <span >Don&apos;t have an account &nbsp; 
                    <span className='text-blue-600 cursor-pointer hover:text-blue-300' onClick={()=> navigate('/candidateRegistration')}>User ?</span > or &nbsp; 
                    <span className='text-blue-600 cursor-pointer hover:text-blue-300' onClick={()=> navigate('/adminRegistration')}>Admin ?</span >
                </span>
                
            </form>
        </div>
    )
}

export default Login