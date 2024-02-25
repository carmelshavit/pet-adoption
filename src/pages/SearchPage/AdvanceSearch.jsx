import React, { useState } from "react";

import {
  FormGroup,
  Form,
  Input,
  Button,
  Icon,
  Container,
  FormField,
} from "semantic-ui-react";

export default function AdvanceSearch() {
  const [searchPet, setSearchPet] = useState({
    breed: ["poddele", 'rtwiler'],
    bio: "",
    hypoallergenic: "yes",
    color: "",
    type: "",
  });
  // (petId="", petBio="",
  // petBreed="", petType=selectedType, petHypoallergenic="")
  const handleInputChange = (e, { value }) => {
    setSearchPet(value);
  };

  return (
    <div>
      <Form size="large">
        <Container>
          <Input
            style={{ marginTop: 20 }}
            placeholder="pet Breed"
            value={searchPet.petBreed}
            onChange={handleInputChange}
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
    </div>
  );
}
