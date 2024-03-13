import React, { useContext, useState } from "react";
import SearchUserForm from "./SearchUserForm";
import AdminEditUser from "./AdminEditUser";
import LoginContext from "../../context/LoginContext";

export default function AdminPage() {
  // const [isOpenEditModal, setIsOpenEditModal] = useState(true);
  // const [selectedPet, setSelectedPet] = useState(null);
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
  const [filterBy, setFilterBy] = useState({
    email: "",
    phone_number: "",
    first_name: "",
    last_name: "",
    adoption_status: "",
  });

  const updateFilter = (name, value) => {
    console.log(name, value);
    setFilterBy((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };
  const searchUser = async (filterBy) => {
    try {
      const userBySearch = await petService.getUsersBySearch(filterBy);
      console.log("userBySearch", userBySearch);
      // setUsers(userBySearch);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {loggedInUser?.is_admin && (
        <div>
          <SearchUserForm filterBy={filterBy} updateFilter={updateFilter} />
          <button onClick={() => searchUser(filterBy)}>Search</button>

          <AdminEditUser />
        </div>
      )}
    </>
  );
}

// import React, { useState } from "react";
// import SearchPage from "../../cmps/SearchPets";
// import AdminSideBar from "./AdminSideBar";
// import AdminEditPet from "./AdminEditPet";
// import {
//   SidebarPushable,
//   SidebarPusher,
//   Segment,
//   Button,
// } from "semantic-ui-react";

// export default function AdminPage() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [isDimmed, setIsDimmed] = useState(false);
//   const [isOpenEditModal, setIsOpenEditModal] = useState(false);

//   const loggedInUser = { is_admin: true }; // Assuming you have a loggedInUser object

//   return (
//     <>
//       {loggedInUser?.is_admin == true && (
//         <div>
//           <Button active={true} onClick={() => setIsVisible((prev) => !prev)}>
//             Sidebar
//           </Button>
//           <SidebarPushable as={Segment} style={{ overflow: "hidden" }}>
//             <AdminSideBar isVisible={isVisible} />
//             <SidebarPusher dimmed={isDimmed && isVisible}>
//               <Segment basic>
//                 <SearchPage />
//                 {/* <Button onClick={() => setIsOpenEditModal(true)}>
//                   ADD
//                 </Button>
//                 {isOpenEditModal && ( */}
//                 <AdminEditPet
//                   // selectedPet={selectedPet}
//                   isOpenEditModal={isOpenEditModal}
//                   setIsOpenEditModal={setIsOpenEditModal}
//                 />
//                 {/* )} */}
//               </Segment>
//             </SidebarPusher>
//           </SidebarPushable>
//         </div>
//       )}
//     </>
//   );
//   {
//     /* prop optional if edit or add.
//  if get prop in want to render edit if not be add. render twice admin page */
//   }
// }
