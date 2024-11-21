import { useLocation, useNavigate } from "react-router-dom";

const ApplicationStatus = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let applicationStatus = location.state.message
  console.log(applicationStatus);

  return (
    <>

      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white flex items-center gap-y-8 flex-col p-4 rounded shadow font-bold'>
          <h1 className={`${applicationStatus.includes('pending') && "text-orange-500"} text-green-500`}>{applicationStatus}</h1>
          <button onClick={() => navigate('/appliedJobs')} className='w-16 p-2 rounded-md bg-gray-400 hover:bg-gray-600 hover:text-white' >Ok</button>
        </div>
      </div>

    </>
  )
}

export default ApplicationStatus