import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./components/registration/Register"
import Jobs from "./components/job/Jobs"
import JobDetails from "./components/job/JobDetails"
import ApplyForJob from "./components/job/ApplyForJob"
import AppliedJobs from "./components/job/AppliedJobs"
import Login from "./components/login/Login"
import AdminRegistration from "./components/registration/AdminRegistration"
import CompanyHomePage from "./components/company/CompanyHomePage"
import PostJobs from "./components/company/PostJobs"
import ViewApplications from "./components/company/ViewApplications"
import ApplicationStatus from "./components/job/ApplicationStatus"
import ProtectedRoute from "./ProtectedRoute"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<ProtectedRoute />} >
            <Route path="/companyHome" element={<CompanyHomePage />} />
            <Route path="/postJobs" element={<PostJobs />} />
            <Route path="/viewApplications" element={<ViewApplications />} />

            <Route path='/jobs' element={<Jobs />} />
            <Route path='/jobDetails' element={<JobDetails />} />
            <Route path='/applyForJob' element={<ApplyForJob />} />
            <Route path='/appliedJobs' element={<AppliedJobs />} />
            <Route path="/viewApplicationsStatus" element={<ApplicationStatus />} />
          </Route>

          <Route path="/" element={<Login />} />
          <Route path='/candidateRegistration' element={<Register />} />
          <Route path='/adminRegistration' element={<AdminRegistration />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App