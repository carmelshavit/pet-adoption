import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import PetPage from "./pages/PetPage/PetsPage";
import { useState } from "react";
import LoginContext from "./context/LoginContext";
import MainHeader from "./cmps/MainHeader";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);


  return (
    <div>
        <LoginContext.Provider value={{ loggedInUser, setLoggedInUser }}>
          <BrowserRouter>
            <MainHeader />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/pets" element={<PetPage />} />
            </Routes>
          </BrowserRouter>
        </LoginContext.Provider>
    </div>
  );
}

export default App;
