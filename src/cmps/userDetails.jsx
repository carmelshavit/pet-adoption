import React from "react";
import { Modal, Header, Loader, Button } from "semantic-ui-react";

export default function UserDetails({
  user,
  setIsOpenUserModal,
  isOpenUserModal,
}) {
  //   const openUserModal = () => setIsOpenUserModal(true);
  const closeUserModal = () => setIsOpenUserModal(false);

  return (
    <div>
      <Modal
        open={isOpenUserModal}
        onClose={closeUserModal}
        size="small"
        closeIcon
      >
        <Header>{user ? user["first_name"] : "User Details"}</Header>
        <Modal.Content>
          {user ? (
            <>
              <p>Type: {user["last_name"]}</p>
              <p>Adoption Status: {user.adoption_status}</p>
              <p>Height: {user.height}</p>
              <p>Weight: {user.weight}</p>
              <p>Color: {user.color}</p>
              <p>Bio: {user.bio}</p>
              <p>Hypoallergenic: {user.hypoallergenic ? "Yes" : "No"}</p>
              <p>Dietary Restrictions: {user.dietary_restrictions}</p>
              <p>Breed: {user.breed}</p>
            </>
          ) : (
            <Loader active />
          )}
        </Modal.Content>
      </Modal>
    </div>
  );
}
