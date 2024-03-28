import "./App.css";
import { Landing } from "./components/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import HeroLayout from "./components/Layout";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { backendUrlAtom } from "./store/urlAtom";
import { getConfig } from "./utils/config";

function App() {
  const setBackendUrl = useSetRecoilState(backendUrlAtom);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const config = await getConfig();
        setBackendUrl(config.backend_url);
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    }
    fetchConfig();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/register" element={<SignUp />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/todos" element={<HeroLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
