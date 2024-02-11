import React, { useState } from "react";
import {
  Form,
  Container,
  FormGroup,
  Button,
  FormSelect,
  FormRadio,
  Segment,
} from "semantic-ui-react";

import { petService } from "../../service/pet.service";

export default function AdminPage() {
  const [pet, setPet] = useState({
    type: "",
    name: "",
    adoption_status: "",
    picture: "",
    height: "",
    weight: "",
    color: "",
    bio: "",
    hypoallergenic: false,
    dietary_restrictions: "",
    breed: "",
  });

  const options = [
    { key: "dog", text: "dog", value: "dog" },
    { key: "cat", text: "cat", value: "cat" },
    { key: ".org", text: ".org", value: ".org" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({ ...prevPet, [name]: value }));
  };
  const handleChangeSelect = (e, { value }) => {
    const selectedOption = options.find((o) => o.key === value);
    setPet((prev) => ({ ...prev, type: selectedOption.text }));
  };

  const addPet = async (e) => {
    try {
      const newPet = await petService.addPet(pet);
      console.log(newPet);
      e.preventDefault();
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  return (
    <Container>
      <div style={{ marginTop: 20 }}>
        <Form>
          <Segment>
            <FormGroup widths="equal">
              <FormSelect
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
                label="name Pet"
                placeholder="name Pet"
                name="namePet"
                value={pet.namePet}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup widths="equal">
              <Form.Input
                type="file"
                label="Picture"
                placeholder="Picture"
                name="picture"
                value={pet.file}
                onChange={handleChange}
              />
              <Form.Input
                label="Height"
                placeholder="Height"
                value={pet.height}
                onChange={handleChange}
                name="height"
                type="number"
              />
              <Form.Input
                label="Weight"
                placeholder="Weight"
                value={pet.weight}
                onChange={handleChange}
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
            </FormGroup>
          </Segment>
          <Segment>
            <FormGroup inline>
              <label>Hypoallergenic</label>
              <FormRadio
                label="No"
                value="No"
                checked={!pet.hypoallergenic}
                onChange={handleChange}
                name="no"
              />
              <FormRadio
                label="Yes"
                value="Yes"
                checked={pet.hypoallergenic}
                onChange={handleChange}
                name="yes"
              />
            </FormGroup>

            <FormGroup widths="equal">
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
            </FormGroup>
            <Button type="submit" onClick={addPet}>
              Submit
            </Button>
          </Segment>
        </Form>
      </div>
    </Container>
  );
}