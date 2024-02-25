import React, { useState } from "react";
import {
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Image,
  Modal,
} from "semantic-ui-react";

export default function ModalSearch({
  setIsModalOpen,
  isModalOpen,
  src,
  filters,
  setFilters,
}) {
  const [refresh, setRefresh] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false); // Add modal state

  const changeFilters = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilter) => ({ ...prevFilter, [name]: value }));
  };
  const handleRedirectToGallery = () => {
    setIsModalOpen(false);
  };
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
              <Image size="small" src={src[filters.type]} wrapped />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Form size="large">
                  <Container>
                    <Input
                      style={{ marginTop: 20 }}
                      placeholder="pet Breed"
                      value={filters.breed}
                      onChange={changeFilters}
                    />
                    <label>Hypoallergenic</label>
                    <FormField>
                      <Checkbox label="I have Hypoallergenic to pet" />
                    </FormField>
                    <FormGroup swidths="equal">
                      <Input
                        style={{ marginTop: 20 }}
                        placeholder="bio"
                        value={searchPet.bio}
                        onChange={handleInputChange}
                      />
                      <Input
                        style={{ marginTop: 20 }}
                        placeholder="color"
                        value={searchPet.color}
                        onChange={handleInputChange}
                      />
                      <Button size="mini" style={{ marginTop: 20 }}>
                        <Icon link name="search" />
                      </Button>
                    </FormGroup>
                  </Container>
                </Form>
                <ModalDescription>
                  <Header>Default Profile Image</Header>
                  <p>Where would you like to search?</p>
                  <p>Is it okay to use this photo?</p>
                </ModalDescription>
              </div>
            </div>
          </ModalContent>
          <ModalActions>
            <Button color="black" onClick={() => setIsModalOpen(false)}>
              Nope
            </Button>
            <Button
              onClick={handleRedirectToGallery}
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
