
import {useNavigate} from 'react-router-dom'

const SearchBar = ({ errorMessage, showHome, handleFilter, setShowHome ,jobRole , setJobRole }) => {
    
    let navigate = useNavigate()
    let handleInputChange = (event) => {
        let searchedJobRole = event.target.value;
        setJobRole(searchedJobRole)
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }

    return (
        <>
            <div className="mx-36 flex items-center content-between mb-8">
                <div className="flex justify-start items-center">
                    <input className="w-[400px] h-12 p-2 rounded-[10px] m-[10px] border-[1px] outline-none border-slate-400  focus:border-blue-700 text-lg" type="text" value={jobRole} placeholder="Search for the job" onChange={handleInputChange} />
                    <button className=" p-2 w-24 h-12 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 " type="submit" onClick={() => handleFilter(jobRole)}>Search</button>
                </div>
                <div className="pl-44 w-full flex justify-evenly items-center">
                    <button className="p-2 w-24 h-12 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 " type="submit" onClick={() => setShowHome(!showHome)}>Home</button>
                    <button className=" p-2 w-24 h-12 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 " type="submit" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            {errorMessage ? <h1 className="font-medium text-lg text-center text-red-500">{errorMessage}</h1> : ''}
        </>
    )
}

export default SearchBar