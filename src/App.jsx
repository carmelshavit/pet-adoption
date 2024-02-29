import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AdminLayout from "./pages/AdminPage/AdminLayout";
import PetPage from "./pages/PetPage/PetsPage";
import { useState, useEffect } from "react";
import LoginContext from "./context/LoginContext";
import MainHeader from "./cmps/MainHeader";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { petService } from "./service/pet.service";
import { localStorageService } from "./service/localStorage";
import "./assets/style/main.scss";
import Gallery from "./Gallery";
import PetsContext from "./context/PetsContext";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [pets, setPets] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const userId = localStorageService.loadUserFromStorage();
      console.log(userId);
      if (userId) {
        const user = await petService.getCurrentLoggedInUser();
        console.log(user);
        setLoggedInUser(user);
      }
    };
    loadUser();
  }, []);

  return (
    <div>
      <PetsContext.Provider value={{ pets, setPets }}>
        <LoginContext.Provider value={{ loggedInUser, setLoggedInUser }}>
          <BrowserRouter>
            <MainHeader />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/admin" element={<AdminLayout />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/pets" element={<PetPage />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </BrowserRouter>
        </LoginContext.Provider>
      </PetsContext.Provider>
    </div>
  );
}

export default App;
