import React, { useState } from "react";
import ModalSearch from "./ModalSearch";
import {
  CardGroup,
  Card,
  CardContent,
  CardDescription,
  Container,
} from "semantic-ui-react";

const SearchPage = () => {
  const [filters, setFilters] = useState({
    breed: ["poddele", "rtwiler"],
    bio: "",
    hypoallergenic: "yes",
    color: "",
    type: "",
  });
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add modal state

  const src = {
    dog: "../../../DogPortrait.jpg", // Replace with your actual image URLs
    sheltersRescues: "../../../OrganizationOutline.jpg",
    otherAnimal: "../../../otherAnimal.png",
    cat: "../../../Cat.jpg",
  };

  const handleCardClick = (petType) => {
    setFilters((prev) => ({
      ...prev,
      type: petType,
    }));
    console.log(filters.type);
    setIsModalOpen(true);
  };
  // setFormState(prev => ({
  //   ...prev,
  //   [name]: {
  //       ...prev[name],
  //       error: error
  //   }}))
  return (
    <Container>
      <div>
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
        src={src}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Container>
  );
};

export default SearchPage;
