import { useState } from 'react'
import Login from './Login'

const UserLogin = () => {

 


  return (
    <div>
        <Login handleOnInputChange={handleInputChange} userCredentials={userCredentials} errorMessage=''/>
    </div>
  )
}

export default UserLogin