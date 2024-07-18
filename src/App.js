import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './components/store';
import './App.css';
import Services from "./pages/services";
import About from "./pages/about";
import Home from "./pages/Home";
import Signuppage from "./pages/signuppage";
import Loginpage from "./pages/loginpage";
import ContactPage from "./pages/contactpage";
import AddContact from "./pages/feature/addcontact";
import DashboardPage from "./pages/dashboardpage";
import HistoryPage from "./pages/historypage";
import UploadPage from "./pages/uploadpage";
import LogoutSection from "./pages/logoutsection";
import ProfilePage from "./pages/profilepage";
import ForgotPasswordPage from "./pages/forgetpage";
import ProtectedRoute from './ProtectedRoute';
import { FileProvider } from './contexts/FileContext'; 
import ResetPasswordPage from "./pages/resetPasswordPage";

const App = () => (
  <Router>
    <Provider store={store}>
      <FileProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
          <Route path="/contact/addcontact" element={<AddContact />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/logout" element={<LogoutSection />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgetpassword" element={<ForgotPasswordPage />} />
          <Route path="/resetpassword" element={<ResetPasswordPage/>}/>
        </Routes>
      </FileProvider>
    </Provider>
  </Router>
);

export default App;
