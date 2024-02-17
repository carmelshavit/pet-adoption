import React from "react";
import {
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Image,
  Modal,
} from "semantic-ui-react";
import BasicSearch from "./BasicSearch";
import { useNavigate } from "react-router-dom";

export default function ModalSearch({
  isModalOpen,
  setIsModalOpen,
  selectedImage,
  src,
}) {
  const navigate = useNavigate();

  //add this details in the search_modal-
//   Pet details: Type (dog, cat)
// Height, Weight, dietary
// restrictions, breed of animal (Poodle, Siamese)

  return (
    <div>
      {isModalOpen && (
        <Modal
          closeIcon
          open={isModalOpen} // Fix: Use the correct prop name 'isModalOpen'
          onClose={() => setIsModalOpen(false)}
          onOpen={() => setIsModalOpen(true)}
        >
          <ModalContent>
            <div style={{ display: "flex" }}>
              <Image size="small" src={src[selectedImage]} wrapped />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <ModalDescription>
                  <Header>Default Profile Image</Header>
                  <p>Where would you like to search?</p>
                  <p>Is it okay to use this photo?</p>
                </ModalDescription>
              </div>
            </div>
            <BasicSearch />
          </ModalContent>
          <ModalActions>
            <Button color="black" onClick={() => setIsModalOpen(false)}>
              Nope
            </Button>
            <Button
              onClick={() => navigate("/gallery")}
              content="Yep, that's me"
              labelPosition="right"
              icon="checkmark"
              positive
            />
          </ModalActions>
        </Modal>
      )}
    </div>
  );
}
