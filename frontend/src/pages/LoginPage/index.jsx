import LogIn from "./components/login";
import SignUp from "./components/signup";
import PasswordEmail from "./components/password/passwordemail";
import PasswordReset from "./components/password/passwordreset";
import { Routes, Route } from "react-router-dom";
import React from "react";

const index = () => {
  return (
    <div className="min-h-screen bg-center bg-no-repeat bg-cover z-0">
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="password" element={<PasswordEmail />} />
        <Route path="reset" element={<PasswordReset />} />
      </Routes>
    </div>
  );
};

export default index;
