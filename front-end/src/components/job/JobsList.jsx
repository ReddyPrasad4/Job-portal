
const JobsList = ({jobs,handleButtonClick= () => console.log("Default onClick") ,buttonName }) => {
    return (
        <>
            <ul >
                {jobs && jobs.map((job, index) => (
                    <li className="border border-slate-400 m-[10px] p-[10px] mx-[150px] rounded-[15px] drop-shadow-sm bg-white hover:scale-[1.01]" key={index}>
                        <div className="flex flex-col pl-3 md:flex-row justify-between items-start md:items-center">
                            <div>
                                <p className="text-xl font-semibold text-gray-800 mb-2">Job Role : {job.jobRole}</p>
                                <p className="text-gray-600 mb-2">Percentage Required : {job.minimumPercentage}</p>
                                <p className="text-gray-600 mb-2">Required Skills : {job.reqskills.join(", ")}</p>
                            </div>
                            <button className="mt-2 md:mt-0 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-600  font-semibold" onClick={() => handleButtonClick(job.jobId)}>{buttonName}</button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default JobsList