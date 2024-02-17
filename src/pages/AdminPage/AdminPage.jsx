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
import uploadImg from "../../service/cloudinary.utils";

export default function AdminPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pet, setPet] = useState({
    type: "fsf",
    name: "fdf",
    adoption_status: "fdf",
    height: 1,
    weight: 2,
    color: "gg",
    bio: "ugu",
    hypoallergenic: false,
    dietary_restrictions: "jh",
    breed: "ih",
    imgFile: null,
  });

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
    console.log("handleChangeFile", ev);

    setSelectedFile(ev.target.files[0]);
  };

  const addPet = async (e) => {
    e.preventDefault();

    let imgUrl = null;
    if (selectedFile) {
      try {
        const { url } = await uploadImg(selectedFile);
        imgUrl = url;
        console.log("line 48", url);
      } catch (error) {
        console.error("Error handling file upload:", error);
      }
    }

    try {
      console.log(pet);
      const petWithImgUrl = {
        ...pet,
        imgFile: imgUrl,
      };
      setPet(petWithImgUrl);
      const newPet = await petService.addPet(petWithImgUrl);
      console.log(newPet);
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  return (
    <Container>
      <div style={{ marginTop: 20 }}>
        <Form>
          <Segment>
            {/* Wrap form fields in a Form element */}
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
            </Form.Group>
            {/* Ensure the 'Add Pet' button is inside the Form element */}
            <Button type="submit" onClick={addPet}>
              Submit
            </Button>
          </Segment>
        </Form>
      </div>
    </Container>
  );
}
