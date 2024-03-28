import React, { useContext, useState } from "react";
import SearchUserForm from "./SearchUserForm";
import UserList from "../../cmps/UserList";
import LoginContext from "../../context/LoginContext";
import UserDetails from "../../cmps/userDetails";
import { petService } from "../../service/pet.service";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const { loggedInUser } = useContext(LoginContext);
  const [filterBy, setFilterBy] = useState({
    email: "",
    phone_number: "",
    first_name: "",
    last_name: "",
  });

  const updateFilter = (name, value) => {
    setFilterBy((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const searchUser = async () => {
    try {
      const userBySearch = await petService.getUsersBySearch(filterBy);
      setUsers(userBySearch);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loggedInUser?.is_admin && (
        <div>
          <SearchUserForm
            filterBy={filterBy}
            updateFilter={updateFilter}
            searchUser={searchUser}
          />
          <UserList users={users} />
        </div>
      )}
    </>
  );
}
