import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import PetPage from "./pages/PetPage/PetsPage";
import { useState, useEffect } from "react";
import LoginContext from "./context/LoginContext";
import MainHeader from "./cmps/MainHeader";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { petService } from "./service/pet.service";
import "./assets/style/main.scss";
import Gallery from "./Gallery";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const userId = petService.loadUserFromStorage();
      if (userId) {
        const user = await petService.getCurrentLoggedInUser();

        console.log(user);
        // console.log("line 20", user);
        setLoggedInUser(user);
      }
    };
    loadUser();
  }, []);

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
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
