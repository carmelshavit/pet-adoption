import React, { useEffect, useState } from "react";
import { Segment, Container, Modal, Button, Form } from "semantic-ui-react";
import { petService } from "../../service/pet.service";
import uploadImg from "../../service/cloudinary.utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditAddPet({
  isOpenEditModal,
  setIsOpenEditModal,
  selectedPet,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pet, setPet] = useState(
    selectedPet
      ? selectedPet
      : {
          type: "",
          name: "",
          adoption_status: "",
          height: "",
          weight: "",
          color: "",
          bio: "",
          hypoallergenic: false,
          dietary_restrictions: "",
          breed: "",
          imgFile: "",
        }
  );

  const options = [
    { key: "dog", text: "dog", value: "dog" },
    { key: "cat", text: "cat", value: "cat" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({ ...prevPet, [name]: value }));
  };

  const handleChangeNumber = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({ ...prevPet, [name]: parseFloat(value) }));
  };

  const handleChangeSelect = (e, { value }) => {
    const selectedOption = options.find((o) => o.key === value);
    setPet((prev) => ({ ...prev, type: selectedOption.text }));
  };

  const handleChangeFile = async (ev) => {
    setSelectedFile(ev.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      if (selectedPet) {
        let editedPet;
        if (selectedFile) {
          const { url } = await uploadImg(selectedFile);
          editedPet = {
            ...pet,
            imgFile: url,
          };
        } else {
          editedPet = pet;
        }
        await petService.editPet(editedPet);
      } else {
        await addPet();
      }
      toast.success("Pet edited successfully");
      setIsOpenEditModal(false);
    } catch (error) {
      toast.error("Failed to edit pet");
      console.error(error);
    } finally {
      // Stop loader
      // make sure SearchPage will refresh pets
    }
  };

  const addPet = async () => {
    if (selectedFile) {
      try {
        const { url } = await uploadImg(selectedFile);
        const petWithImgUrl = {
          ...pet,
          imgFile: url,
        };
        await petService.addPet(petWithImgUrl);
        toast.success("Pet added successfully");
      } catch (error) {
        toast.error("Failed to add pet");
        console.error("Error handling file upload:", error);
      }
    }
  };

  return (
    <Container>
      <Modal
        closeIcon
        open={isOpenEditModal}
        onClose={() => setIsOpenEditModal(false)}
        onOpen={() => setIsOpenEditModal(true)}
      >
        <Modal.Content>
          <Form>
            <Segment>
              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label="Type"
                  options={options}
                  placeholder="Type"
                  value={pet.type}
                  name="type"
                  onChange={handleChangeSelect}
                />
                <Form.Input
                  label="Breed of Animal"
                  placeholder="Breed of Animal"
                  name="breed"
                  value={pet.breed}
                  onChange={handleChange}
                />
                <Form.Input
                  label="Name"
                  placeholder="Name Pet"
                  name="name"
                  value={pet.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  type="file"
                  htmlFor="imgFile"
                  label="Image"
                  placeholder="Image"
                  name="imgFile"
                  id="imgFile"
                  onChange={handleChangeFile}
                />
                <Form.Input
                  label="Height"
                  placeholder="Height"
                  value={pet.height}
                  onChange={handleChangeNumber}
                  name="height"
                  type="number"
                  step="0.1"
                />
                <Form.Input
                  label="Weight"
                  placeholder="Weight"
                  value={pet.weight}
                  onChange={handleChangeNumber}
                  name="weight"
                  type="number"
                  step="0.1"
                />
                <Form.Input
                  label="Color"
                  placeholder="Color"
                  value={pet.color}
                  onChange={handleChange}
                  name="color"
                />
              </Form.Group>
            </Segment>
            <Segment>
              <Form.Group inline>
                <label>Hypoallergenic</label>
                <Form.Radio
                  label="No"
                  value="No"
                  checked={!pet.hypoallergenic}
                  onChange={handleChange}
                  name="no"
                />
                <Form.Radio
                  label="Yes"
                  value="Yes"
                  checked={pet.hypoallergenic}
                  onChange={handleChange}
                  name="yes"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  label="Bio"
                  placeholder="Bio"
                  value={pet.bio}
                  onChange={handleChange}
                  name="bio"
                />
                <Form.Input
                  label="Dietary Restrictions"
                  placeholder="Dietary Restrictions"
                  value={pet.dietary_restrictions}
                  onChange={handleChange}
                  name="dietary_restrictions"
                />
                <Form.Input
                  label="Adoption Status"
                  placeholder="Adoption Status"
                  value={pet.adoption_status}
                  onChange={handleChange}
                  name="adoption_status"
                />
              </Form.Group>

              <Button
                type="submit"
                onClick={handleSubmit}
                basic
                color="red"
                content="Red"
              >
                {selectedPet ? "Save" : "Add"}
              </Button>
            </Segment>
          </Form>
        </Modal.Content>
      </Modal>
    </Container>
  );
}
