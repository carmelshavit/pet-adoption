import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import PetPage from "./pages/PetPage/PetPage";
import { useState, useEffect } from "react";
import LoginContext from "./context/LoginContext";
import MainHeader from "./cmps/MainHeader";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { petService } from "./service/pet.service";
import { localStorageService } from "./service/localStorage";
import "./assets/style/main.scss";
import PetsContext from "./context/PetsContext";
import LikedContext from "./context/LikedContext";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [pets, setPets] = useState(null);
  const [likedPet, setLikedPet] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      const userId = localStorageService.loadUserFromStorage();
      // console.log(userId);
      if (userId) {
        const user = await petService.getCurrentLoggedInUser();
        // console.log(user);
        setLoggedInUser(user);
      }
    };
    loadUser();
  }, []);

  return (
    <div>
      <PetsContext.Provider value={{ pets, setPets }}>
        <LoginContext.Provider value={{ loggedInUser, setLoggedInUser }}>
          <LikedContext.Provider value={{ likedPet, setLikedPet }}>
            <BrowserRouter>
              <MainHeader />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/users" element={<AdminPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/pet/:id" element={<PetPage />} />
              </Routes>
            </BrowserRouter>
          </LikedContext.Provider>
        </LoginContext.Provider>
      </PetsContext.Provider>
    </div>
  );
}

export default App;
