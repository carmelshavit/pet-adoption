import React, { useState } from "react";
import { Segment, Button, Form, Container } from "semantic-ui-react";

import { petService } from "../service/pet.service";
import PetList from "./PetList";

const MIN_PET_WEIGHT = 0.1;
const MAX_PET_WEIGHT = 10;
const MIN_PET_HEIGHT = 0.1;
const MAX_PET_HEIGHT = 5;

export default function SearchPets() {
  const [pets, setPets] = useState();
  const [filterPet, setFilterPet] = useState({
    type: "",
    minHeight: null,
    maxHeight: null,
    minWeight: null,
    maxWeight: null,
    color: "",
    hypoallergenic: false,
    dietary_restrictions: "",
    breed: "",
    id: null,
  });

  const searchPet = async (e) => {
    e.preventDefault();
    const petBySearch = await petService.getPetsBySearch(filterPet);
    console.log(petBySearch);
    setPets(petBySearch);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterPet((prevPet) => ({ ...prevPet, [name]: value }));
  };

  const handleChangeNumber = (e, minValue, maxValue) => {
    const fieldName = e.target.name;
    const value = parseFloat(e.target.value);

    if (minValue > maxValue) {
      return;
    }
    if (value < minValue) {
      setFilterPet((prevPet) => ({ ...prevPet, [fieldName]: minValue }));
    } else if (value > maxValue) {
      setFilterPet((prevPet) => ({ ...prevPet, [fieldName]: maxValue }));
    } else {
      setFilterPet((prevPet) => ({ ...prevPet, [fieldName]: value }));
    }
  };

  const options = [
    { key: "dog", text: "dog", value: "dog" },
    { key: "cat", text: "cat", value: "cat" },
    { key: "fish", text: "fish", value: "fish" },
    { key: "horse", text: "horse", value: "horse" },
  ];
  const handleChangeSelect = (e, { value }) => {
    const selectedOption = options.find((o) => o.key === value);
    setFilterPet((prev) => ({ ...prev, type: selectedOption.text }));
  };

  return (
    <div>
      <Container>
        <Form>
          <Segment>
            <Form.Group widths="equal">
              <Form.Select
                fluid
                label="Type"
                options={options}
                placeholder="Type"
                value={filterPet.type}
                name="type"
                onChange={handleChangeSelect}
              />
              <Form.Input
                label="Breed of Animal"
                placeholder="Breed of Animal"
                name="breed"
                value={filterPet.breed}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              {filterPet.minHeight > filterPet.maxHeight && (
                <div>'minValue is greater than maxValue'</div>
              )}
              <Form.Input
                placeholder="Min Height"
                value={filterPet.minHeight}
                onChange={(e) =>
                  handleChangeNumber(e, MIN_PET_HEIGHT, MAX_PET_HEIGHT)
                }
                step="0.1"
                name="minHeight"
                type="number"
              />

              <Form.Input
                placeholder="Max Height"
                value={filterPet.maxHeight}
                onChange={(e) =>
                  handleChangeNumber(e, MIN_PET_HEIGHT, MAX_PET_HEIGHT)
                }
                step="0.1"
                name="maxHeight"
                type="number"
              />
              <Form.Input
                placeholder="Min Weight"
                value={filterPet.minWeight}
                onChange={(e) =>
                  handleChangeNumber(e, MIN_PET_WEIGHT, MAX_PET_WEIGHT)
                }
                step="0.1"
                name="minWeight"
                type="number"
              />
              <Form.Input
                placeholder="Max Weight"
                value={filterPet.maxWeight}
                onChange={(e) =>
                  handleChangeNumber(e, MIN_PET_WEIGHT, MAX_PET_WEIGHT)
                }
                step="0.1"
                name="maxWeight"
                type="number"
              />
            </Form.Group>

            <Form.Group>
              <Form.Input
                label="Color"
                placeholder="Color"
                value={filterPet.color}
                onChange={handleChange}
                name="color"
              />
            </Form.Group>
            <Form.Group inline>
              <label>Hypoallergenic</label>
              <Form.Radio
                label="No"
                value="No"
                checked={!filterPet.hypoallergenic}
                onChange={handleChange}
                name="no"
              />
              <Form.Radio
                label="Yes"
                value="Yes"
                checked={filterPet.hypoallergenic}
                onChange={handleChange}
                name="yes"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Dietary Restrictions"
                placeholder="Dietary Restrictions"
                value={filterPet.dietary_restrictions}
                onChange={handleChange}
                name="dietary_restrictions"
              />
            </Form.Group>
            <Button type="submit" onClick={searchPet}>
              SEARCH
            </Button>
          </Segment>
        </Form>

        {/* {pets !== undefined && <PetList pets={pets} />} */}
      </Container>
    </div>
  );
}
