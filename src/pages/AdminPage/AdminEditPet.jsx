import React, { useState } from "react";
import { Segment, Container, Modal, Button, Form } from "semantic-ui-react";

export default function AdminEditPet({
  pets,
  isOpenEditModal,
  setIsOpenEditModal,
}) {
  const [pet, setPet] = useState({
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
    imgFile: null,
    id: "",
  });

  const editPet = async (e) => {
    e.preventDefault();
    const updatedPet = await petService.editPet(pets);
    console.log(pet);
    setPet(updatedPet);
  };

  const options = [
    { key: "dog", text: "dog", value: "dog" },
    { key: "cat", text: "cat", value: "cat" },
    { key: "fish", text: "fish", value: "fish" },
    { key: "horse", text: "horse", value: "horse" },
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

  const addPet = async (e) => {
    e.preventDefault();
    let imgUrl = null;
    if (selectedFile) {
      try {
        const { url } = await uploadImg(selectedFile);
        imgUrl = url;
      } catch (error) {
        console.error("Error handling file upload:", error);
      }
    }
    try {
      const petWithImgUrl = {
        ...pet,
        imgFile: imgUrl,
      };
      setPet(petWithImgUrl);
      const newPet = await petService.addPet(petWithImgUrl);
    } catch (error) {
      console.error("Error adding pet:", error);
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
                  htmlFor="img_url"
                  label="Image" // Corrected label
                  placeholder="Image"
                  name="imgUrl"
                  id="img_url" // Corrected ID
                  //value={pet.img_url}
                  onChange={handleChangeFile}
                />
                <Form.Input
                  label="Height"
                  placeholder="Height"
                  value={pet.height}
                  onChange={handleChangeNumber}
                  name="height"
                  type="number"
                />
                <Form.Input
                  label="Weight"
                  placeholder="Weight"
                  value={pet.weight}
                  onChange={handleChangeNumber}
                  name="weight"
                  type="number"
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
                {/* {editMode ? ( */}
                <Form.Input
                  label="Id"
                  placeholder="pet Id"
                  value={pet.id}
                  onChange={handleChangeNumber}
                  name="id"
                  type="number"
                />
                {/* // ) : null} */}
              </Form.Group>

              <Button type="submit" onClick={addPet}>
                ADD
              </Button>
              <Button type="submit" onClick={editPet}>
                EDIT
              </Button>
            </Segment>
          </Form>
        </Modal.Content>
      </Modal>
    </Container>
  );
}
