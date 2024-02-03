import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../auth/Resgister";
import Login from "../auth/Login";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import Verify from "../auth/Verify";
import PersonalInfo from "../application/PersonalInfo";
import Address from "../application/Address";
import RTWUpload from "../application/RTWUpload";
import Certificate from "../application/Certificates";
import DBS from "../application/DBS";
import Welcome from "../application/Welcome";
import Home from "../Home";
import Domiciliary from "../healthcare/Domiciliary";
import LitmusHealthcare from "../pages/Healthcare";
import LiveCare from "../healthcare/LiveInCare";
import UploadPOI from "../application/UploadPOI";
import WorkHistory from "../application/WorkHistory";
import UploadResume from "../application/UploadResume";
import Contact from "../pages/ContactUs";

export const AppRoutes = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Home />} />
        <Route path="/healthcare/" element={<LitmusHealthcare />} />
        <Route path="/healthcare/domiciliary" element={<Domiciliary />} />
        <Route path="/healthcare/live-in-care" element={<LiveCare />} />
        <Route path="/career/" element={<Home />} />
        <Route path="/contact/" element={<Contact />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/verify/:user/:token" element={<Verify />} />
        <Route path="/welcome/" element={<Welcome />} />
        {/* <Route path="/healthcare" element={<LitmusHealthcare />} /> */}
        <Route path="/application/personal-info" element={<PersonalInfo />} />
        <Route path="/application/address" element={<Address />} />
        <Route path="/application/right-to-work" element={<RTWUpload />} />
        <Route path="/application/id-upload" element={<UploadPOI />} />
        <Route path="/application/resume" element={<UploadResume />} />
        <Route
          path="/application/training/certificate"
          element={<Certificate />}
        />
        <Route path="/application/work-history" element={<WorkHistory />} />
        <Route path="/application/bg-check/dbs" element={<DBS />} />

        {/* <Route path="/apply/:job" element={<Vacancy />} /> */}
      </Routes>
    </BrowserRouter>
  );
};


import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useUserInfo } from "../components/GetUserInfo";
import { UserContextProvider } from "../components/UserContext";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AbsoluteCenter, Box } from "@chakra-ui/react";
import { USER_LEVELS } from "../util/data";
import Home from "../Home";
import Welcome from "../application/Welcome";
import LitmusHealthcare from "../pages/Healthcare";
import Career from "../career/Career";
import JobDetails from "../career/ViewVacancy";
import Register from "../auth/Resgister";
import Login from "../auth/Login";
import ForgotPassword from "../auth/ForgotPassword";
import Verify from "../auth/Verify";
import Test from "../application/UploadTest";
import Contact from "../pages/ContactUs";
import ResetPassword from "../auth/ResetPassword";
import Error404 from "../pages/Error404";
import PersonalInfo from "../application/PersonalInfo";
import WorkHistory from "../application/WorkHistory";
import Certificate from "../application/Certificates";
import UploadResume from "../application/UploadResume";
import Address from "../application/Address";
import UploadPOI from "../application/UploadPOI";
import Nok from "../application/Nok";
import MobilityStatus from "../application/MobilityStatus";
import RTWUpload from "../application/RTWUpload";
import InterviewScheduler from "../Interview/InterviewScheduler";
import InterviewFeedbackForm from "../Interview/InterviewFeedbackForm";
import ProvisonalOffer from "../offer/ProvisonalOffer";
import Onboarding from "../onboarding/Onboarding";
import Reference from "../onboarding/Reference";
import Dashboard from "../dashboard/Dashboard";
import Complaince from "../dashboard/compliance/Compliance";
import Timesheet from "../dashboard/TimeSheet";

import Profile from "../dashboard/profile/Profile";
import { Referee } from "../onboarding/Referee";
import DBS from "../application/DBS";
import LiveCare from "../healthcare/LiveInCare";
import Domiciliary from "../healthcare/Domiciliary";
import { useAccessLevel } from "../auth/getUserAccessLevel";
import { useAuthentication } from "../auth/useAuthentication";

export const AppRoutes = () => {

  const isAuthenticated = useAuthentication();
  // const isLoggedIn = Cookies.get("isLoggedin");
  // const userLevel = Cookies.get("userLevel") || null;
  const userLevel = useAccessLevel();
  const { loading, userDetails, getUsersInfo } = useUserInfo();
  if (isAuthenticated) {
    getUsersInfo();
  }
  // useEffect(() => {

  //     // Fetch user info
  //     if (isAuthenticated) {
  //       getUsersInfo();
  //     }

  //     // Run the redirection logic
  //     // Add your redirection logic here if needed

  //     // You can also check if user information is available before redirecting
  //     // For example, if (userDetails && userDetails.someProperty) { navigate('/some-route'); }



  //   // Run the redirection logic
  //   // fetchUserInfo();
  // }, [isAuthenticated, getUsersInfo]);

  if (loading) {
    return (
      <Box py={"17em"} alignItems={"center"} justifyItems={"center"} height={"100vh"}>
        <LoadingSpinner />
      </Box>
    );
  }



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/healthcare" element={<LitmusHealthcare />} />
        <Route path="/healthcare/domiciliary" element={<Domiciliary />} />
        <Route path="/healthcare/live-in-care" element={<LiveCare />} />
        <Route path="/career" element={<Career />} />
        <Route path="/career/:jobToken/" element={<JobDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/test" element={<Test />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reset-password/:user_id/:reset_token/" element=
          {<ResetPassword />} />
        <Route path="/reference/:token" element={<Reference />} />
      </Routes>
      <UserContextProvider userDetails={userDetails}>
        <Routes>
          {/* Routes that are only accessible to APPLICATION_PROCESS users */}
          {userLevel >= USER_LEVELS.APPLICATION_PROCESS && (
            <>
              <Route path="/application/personal-info" element={<PersonalInfo />} />
              <Route path="/application/work-history" element={<WorkHistory />} />
              <Route path="/application/training/certificate" element={<Certificate />} />
              <Route path="/application/resume" element={<UploadResume />} />
              <Route path="/application/address" element={<Address />} />
              <Route path="/application/id-upload" element={<UploadPOI />} />
              <Route path="/application/next-of-kin" element={<Nok />} />
              <Route path="/application/mobility-status" element={<MobilityStatus />} />
              <Route path="/application/right-to-work" element={<RTWUpload />} />
            </>
          )}
          {/* Routes that are only accessible to ONBOARDING users */}
          {userLevel >= USER_LEVELS.INTERVIEW && (
            <>
              <Route path="/interview/schedule" element={<InterviewScheduler />} />
              <Route path="/interview/feedback/:applicant_token/" element={<InterviewFeedbackForm />} />
            </>
          )}
          {userLevel >= USER_LEVELS.PRE_EMPLOYMENT_CHECK && (
            <>
              <Route path="/employment-check/provisonal-offer" element={<Onboarding />} />
              <Route path="/employment-check/dbs" element={<DBS />} />
              <Route path="/employment-check/referee" element={<Referee />} />

            </>
          )}
          {userLevel >= USER_LEVELS.OFFER_ACCEPTANCE && (
            <>
              <Route path="/provisional-offer/" element={<ProvisonalOffer />} />
            </>
          )}
          {userLevel >= USER_LEVELS.PRE_EMPLOYMENT_CHECK && (
            <>
              <Route path="/onboarding" element={<Onboarding />} />
              {/* <Route path="/onboarding/dbs" element={<Dbs />} /> */}
              {/* <Route path="/onboarding/referee" element={<Referee />} /> */}

            </>
          )}
          {userLevel >= USER_LEVELS.STAFF && (
            <>
              <Route path="/dashboard/" element={<Dashboard />} />
              <Route path="/dashboard/compliance" element={<Complaince />} />
              <Route path="/dashboard/timesheet" element={<Timesheet />} />
              <Route path="/dashboard/profile/edit" element={<Profile />} />
            </>
          )
          }

          <Route path="" element={<Error404 />} />

        </Routes>
      </UserContextProvider>

    </BrowserRouter>
  );
};
