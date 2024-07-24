import React from "react";
import { Segment, Form, Container } from "semantic-ui-react";

const MIN_PET_WEIGHT = 0.1;
const MAX_PET_WEIGHT = 10;
const MIN_PET_HEIGHT = 0.1;
const MAX_PET_HEIGHT = 5;

export default function SearchForm({ filterBy, updateFilter }) {
  //todo- replace handleChange of radio
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

  const handleChangeRadio = (e, { name, value }) => {
    console.log(name, value);
    const booleanValue = value === "yes";
    console.log(booleanValue);
    updateFilter(name, booleanValue);
  };

  return (
    <div>
      <Container>
        <Form>
          <Segment>
            <Form.Group>
              <div>
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
              </div>
            </Form.Group>
            <Form.Group>
              <div style={{ display: "flex", flexDirection: "column" }}>
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
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Form.Input
                  placeholder="Min Weight"
                  value={filterBy.minWeight}
                  onChange={(e) =>
                    handleChangeNumber(e, MIN_PET_WEIGHT, MAX_PET_WEIGHT)
                  }
                  step="0.5"
                  name="minWeight"
                  type="number"
                />
                <Form.Input
                  placeholder="Max Weight"
                  value={filterBy.maxWeight}
                  onChange={(e) =>
                    handleChangeNumber(e, MIN_PET_WEIGHT, MAX_PET_WEIGHT)
                  }
                  step="0.5"
                  name="maxWeight"
                  type="number"
                />
              </div>
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
                label="no"
                value="no"
                checked={!filterBy.hypoallergenic}
                onChange={handleChangeRadio}
                name="hypoallergenic"
              />
              <Form.Radio
                label="yes"
                value="yes"
                checked={filterBy.hypoallergenic}
                onChange={handleChangeRadio}
                name="hypoallergenic"
              />
            </Form.Group>
          </Segment>
        </Form>
      </Container>
    </div>
  );
}
