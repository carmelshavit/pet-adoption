import React, { useState } from "react";
import ModalSearch from "./ModalSearch";
import {
  Search,
  CardGroup,
  Card,
  CardContent,
  CardDescription,
  Container,
  Form,
  FormGroup,
  Input,
} from "semantic-ui-react";
import BasicSearch from "./BasicSearch";

const SearchComponent = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add modal state
  const [selectedImage, setSelectedImage] = useState(null);

  const src = {
    dog: "../../../DogPortrait.jpg", // Replace with your actual image URLs
    sheltersRescues: "../../../OrganizationOutline.jpg",
    otherAnimal: "../../../otherAnimal.png",
    cat: "../../../Cat.jpg",
  };

  const handleCardClick = (imageKey) => {
    setSelectedImage(imageKey);
    setIsModalOpen(true);
  };
  return (
    <Container>
      <div>
        <BasicSearch />
        <CardGroup itemsPerRow={4}>
          <Card
            style={{ marginTop: 40 }}
            onClick={() => handleCardClick("dog")}
          >
            <img
              src={src.dog}
              alt="Dog"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <CardContent>
              <CardDescription>Dogs</CardDescription>
            </CardContent>
          </Card>
          <Card
            style={{ marginTop: 40 }}
            onClick={() => handleCardClick("sheltersRescues")}
          >
            <img
              src={src.sheltersRescues}
              alt="Shelters & Rescues"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <CardContent>
              <CardDescription>Shelters & Rescues</CardDescription>
            </CardContent>
          </Card>
          <Card
            style={{ marginTop: 40 }}
            onClick={() => handleCardClick("Cat")}
          >
            <img
              src={src.cat}
              alt="Cat"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <CardContent>
              <CardDescription>Cat</CardDescription>
            </CardContent>
          </Card>
          <Card
            style={{ marginTop: 40 }}
            onClick={() => handleCardClick("otherAnimal")}
          >
            <img
              src={src.otherAnimal}
              alt="otherAnimal"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <CardContent>
              <CardDescription>Other Animal</CardDescription>
            </CardContent>
          </Card>
        </CardGroup>
      </div>
      <ModalSearch
        selectedImage={selectedImage}
        src={src}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Container>
  );
};

export default SearchComponent;
