import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import PetPage from "./pages/PetPage/PetPage";
import { useState, useEffect } from "react";
import LoginContext from "./context/LoginContext";
import MainHeader from "./cmps/MainHeader";
import UsersContext from './context/UsersContext';
import { petService } from "./service/service";

function App() {

  // add 2 lines of context {logginuser}{users} both save in localstorege.
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [users, setUsers] = useState([])


  useEffect(() => {
    const loadUser = async () => {
      const users = petService.loadFromStorage('users')
      if (users) {
        setUsers(users)
      }
    }
    loadUser()
  }, [])

  // when i do signup i need to upload the user to the array of users.

  return (
    <div>
      <UsersContext.Provider value={[users, setUsers]}>
        <LoginContext.Provider value={[loggedInUser, setLoggedInUser]}>
          <BrowserRouter>
            <MainHeader />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/admin' element={<AdminPage />} />
              <Route path='/profile' element={<PetPage />} />
            </Routes>
          </BrowserRouter>
        </LoginContext.Provider>
      </UsersContext.Provider >
    </div>
  )
}

export default App
