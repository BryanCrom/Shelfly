import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./utils/ZustandUtil";
import { useEffect } from "react";
import AuthWrapper from "./lib/AuthWrapper";

function App() {
  useEffect(() => {
    useAuth.getState().init();
  }, []);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/home"
            element={
              <AuthWrapper>
                <SearchPage />
              </AuthWrapper>
            }
          />
          <Route
            path="/details/:id"
            element={
              <AuthWrapper>
                <DetailPage />
              </AuthWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
