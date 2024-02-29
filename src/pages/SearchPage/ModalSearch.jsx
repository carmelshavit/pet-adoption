import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalActions,
  ModalDescription,
  Button,
  Header,
  Image,
  Form,
  Container,
  Input,
  FormField,
  Checkbox,
  FormGroup,
  Icon,
} from "semantic-ui-react";
import { ImagesSrc } from "../../../public/ImageSrc";

export default function ModalSearch({
  setIsModalOpen,
  isModalOpen,
  selectedType,
}) {
  const [filters, setFilters] = useState({
    breed: "",
    bio: "",
    hypoallergenic: "yes",
    color: "",
    type: selectedType,
  });
  const navigate = useNavigate();

  const changeFilters = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  return (
    <div>
      {isModalOpen && (
        <Modal
          closeIcon
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onOpen={() => setIsModalOpen(true)}
        >
          <ModalContent>
            <Modal.Header>
              <Header>What would you like to search?</Header>
            </Modal.Header>
            <div style={{ display: "flex" }}>
              <Image size="small" src={ImagesSrc[filters.type]} wrapped />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Form size="large">
                  <Container>
                    <FormField>
                      <Input
                        style={{ marginTop: 20 }}
                        placeholder="Pet Breed"
                        value={filters.breed}
                        onChange={changeFilters}
                      />
                    </FormField>
                    <FormField>
                      <Checkbox label="I am hypoallergenic to pets" />
                    </FormField>
                    <FormGroup widths="equal">
                      <FormField>
                        <Input
                          style={{ marginTop: 20 }}
                          placeholder="Bio"
                          value={filters.bio}
                          onChange={changeFilters}
                        />
                      </FormField>
                      <FormField>
                        <Input
                          style={{ marginTop: 20 }}
                          placeholder="Color"
                          value={filters.color}
                          onChange={changeFilters}
                        />
                      </FormField>
                      <FormField>
                        <Button size="mini" style={{ marginTop: 20 }}>
                          <Icon link name="search" />
                        </Button>
                      </FormField>
                    </FormGroup>
                  </Container>
                </Form>
                {/* <ModalDescription>
                  <Header>What would you like to search?</Header>
                </ModalDescription> */}
              </div>
            </div>
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
