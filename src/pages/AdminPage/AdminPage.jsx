import React, { useState } from "react";
import SearchPage from "../../cmps/SearchPets";
import AdminSideBar from "./AdminSideBar";
import EditAddPet from "./EditAddPet";
import {
  SidebarPushable,
  SidebarPusher,
  Segment,
  Button,
} from "semantic-ui-react";
import SearchPets from "../../cmps/SearchPets";

export default function AdminPage() {
  const [isOpenEditModal, setIsOpenEditModal] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const loggedInUser = { is_admin: true };  // TODO - get from context
  return (
    <>
      {loggedInUser?.is_admin && (
        <div>
          <EditAddPet
            isOpenEditModal={isOpenEditModal}
            selectedPet={selectedPet}
            setIsOpenEditModal={setIsOpenEditModal}
          />
        </div>
      )}
    </>
  );
  <PetList openEditModal={openEditModal} pets={pets} />;
  {
    <AdminEditPet
      isOpenEditModal={isOpenEditModal}
      setIsOpenEditModal={setIsOpenEditModal}
    />;
    /* prop optional if edit or add.
 if get prop in want to render edit if not be add. render twice admin page */
  }
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
