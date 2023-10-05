  import { useState } from "react";
  import "./App.css";
  import IDEPage from "./pages/IDEPage";
  import LoginPage from "./pages/LoginPage/components/login";
  import SignUpPage from "./pages/LoginPage/components/signup"
  import PasswordEmailPage from "./pages/LoginPage/components/password/passwordemail"
  import PasswordResetPage from "./pages/LoginPage/components/password/passwordreset"

  import { Routes, Route, BrowserRouter } from "react-router-dom";

  function App() {
    const [count, setCount] = useState(0);

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/idepage" element={<IDEPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/password" element={<PasswordEmailPage />} />
          <Route path="/password/reset" element={<PasswordResetPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;
