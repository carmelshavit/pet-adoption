import React from "react";
import { Segment, Form, Container } from "semantic-ui-react";

const MIN_PET_WEIGHT = 0.1;
const MAX_PET_WEIGHT = 10;
const MIN_PET_HEIGHT = 0.1;
const MAX_PET_HEIGHT = 5;

export default function SearchForm({ filterBy, updateFilter }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFilter(name, value);
  };

  const handleChangeNumber = (e, minValue, maxValue) => {
    const fieldName = e.target.name;
    const value = parseFloat(e.target.value);

    if (minValue > maxValue) {
      return;
    }
    if (value < minValue) {
      updateFilter(fieldName, minValue);
    } else if (value > maxValue) {
      updateFilter(fieldName, maxValue);
    } else {
      updateFilter(fieldName, value);
    }
  };

  // const options = [
  //   { key: "dog", text: "dog", value: "dog" },
  //   { key: "cat", text: "cat", value: "cat" },
  //   { key: "fish", text: "fish", value: "fish" },
  //   { key: "horse", text: "horse", value: "horse" },
  // ];
  // const handleChangeSelect = (e, { value }) => {
  //   const selectedOption = options.find((o) => o.key === value);
  //   updateFilter(type, selectedOption.text );
  // };

  return (
    <div>
      <Container>
        <Form>
          <Segment>
            <Form.Group widths="equal">
              <Form.Input
                label="Breed of Animal"
                placeholder="Breed of Animal"
                name="breed"
                value={filterBy.breed}
                onChange={handleChange}
              />
              <Form.Input
                label="Type"
                placeholder="Type"
                name="type"
                value={filterBy.type}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              {filterBy.minHeight > filterBy.maxHeight && (
                <div>'minValue is greater than maxValue'</div>
              )}
              <Form.Input
                placeholder="Min Height"
                value={filterBy.minHeight}
                onChange={(e) =>
                  handleChangeNumber(e, MIN_PET_HEIGHT, MAX_PET_HEIGHT)
                }
                step="0.1"
                name="minHeight"
                type="number"
              />

              <Form.Input
                placeholder="Max Height"
                value={filterBy.maxHeight}
                onChange={(e) =>
                  handleChangeNumber(e, MIN_PET_HEIGHT, MAX_PET_HEIGHT)
                }
                step="0.1"
                name="maxHeight"
                type="number"
              />
              <Form.Input
                placeholder="Min Weight"
                value={filterBy.minWeight}
                onChange={(e) =>
                  handleChangeNumber(e, MIN_PET_WEIGHT, MAX_PET_WEIGHT)
                }
                step="0.1"
                name="minWeight"
                type="number"
              />
              <Form.Input
                placeholder="Max Weight"
                value={filterBy.maxWeight}
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
                value={filterBy.color}
                onChange={handleChange}
                name="color"
              />
            </Form.Group>
            <Form.Group inline>
              <label>Hypoallergenic</label>
              <Form.Radio
                label="No"
                value="No"
                checked={!filterBy.hypoallergenic}
                onChange={handleChange}
                name="no"
              />
              <Form.Radio
                label="Yes"
                value="Yes"
                checked={filterBy.hypoallergenic}
                onChange={handleChange}
                name="yes"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Dietary Restrictions"
                placeholder="Dietary Restrictions"
                value={filterBy.dietary_restrictions}
                onChange={handleChange}
                name="dietary_restrictions"
              />
              <Form.Input
                label="Name"
                placeholder="Name"
                value={filterBy.name}
                onChange={handleChange}
                name="name"
              />
            </Form.Group>
          </Segment>
        </Form>
      </Container>
    </div>
  );
}