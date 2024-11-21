import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = () => {
    let userToken = localStorage.getItem('email');
    console.log(userToken);
    

    return (
        <div>
            {userToken ? <Outlet /> : <Navigate to='/' />}
        </div>
    )
}

export default ProtectedRoute