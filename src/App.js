import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { supabase } from "./contexts/supabase";

import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Profile from "./components/user/Profile";
import Footer from "./components/Footer";
import Signup from "./components/auth/Signup";
import Navbar from "./components/Navbar";
import Student from "./components/user/Student";
function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const data = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      {session ? <Navbar /> : <></>}
      <BrowserRouter>
        <Routes>
          {session ? (
            <>
              <Route path="/student/:id" element={<Student />} />
              <Route exact path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
      {/* <Footer/> */}
    </>
  );
}

export default App;
