import { useLocation, useNavigate } from "react-router-dom"

const ApplyForJob = () => {

    let location = useLocation();
    let message = location.state.message;  

    const navigate = useNavigate();
    let handleClickHome = () => {
        navigate('/jobs')
    }

    return (

        <div className="flex items-center  justify-center min-h-screen bg-slate-100">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 max-w-lg text-center">
                <h1 className="text-xl font-bold text-gray-800 mb-4">Application Status</h1>
                <p className={`text-lg ${message.includes("SUCCESSFULLY") ? "text-green-600" : "text-red-600"}`}>
                    {message}
                </p>
                <div>
                    <button onClick={handleClickHome} className="mt-3 py-2 px-4 bg-blue-700 rounded-md text-lg font-bold">Home</button>
                    {/* <button>View Job Status</button>     */}
                </div>
            </div>
        </div>
    )
}

export default ApplyForJob