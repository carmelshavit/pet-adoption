import React from "react";
import { Modal, Header } from "semantic-ui-react";
import PetList from "./PetList";

const UserDetails = ({ user, setIsOpenUserModal, isOpenUserModal }) => {
  const closeUserModal = () => setIsOpenUserModal(false);

  return (
    <div>
      <Modal
        open={isOpenUserModal}
        onClose={closeUserModal}
        size="small"
        closeIcon
      >
        <Header>
          {user ? `${user["first_name"]} ${user["last_name"]}` : "User Details"}{" "}
        </Header>
        <Modal.Content>
          {user && (
            <>
              <p>Email: {user["email"]}</p>
              <p>Phone Number: {user["phone_number"]}</p>
            </>
          )}
          <p className="adopted-status">Adopted Pets:</p>
          <PetList pets={user && user.adoptedPets} />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default UserDetails;
