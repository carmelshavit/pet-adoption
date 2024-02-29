import React, { useState } from "react";
import { ImagesSrc } from "../../../public/ImageSrc";
import ModalSearch from "./ModalSearch";
import {
  CardGroup,
  Card,
  CardContent,
  CardDescription,
  Container,
  Button,
  Menu,
} from "semantic-ui-react";
import { petService } from "../../service/pet.service";
import PetList from "../../cmps/PetList";

const SearchPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Add modal state
  const [selectedType, setSelectedType] = useState("");
  const [pets, setPets] = useState([]);
  const [isPets, setIsPets] = useState(false);

  const handleCardClick = async (petType) => {
    const pets = await petService.getPetsBySearch({ type: petType });
    setPets(pets);
    console.log(pets);
    setSelectedType(petType);
    setIsPets(true);
    // setIsModalOpen(true);
  };

  // const showMenu = () => {
  //   setPets([]);
  //   setIsPets(false);
  // };

  return (
    <Container>
      {!isPets && (
        <div>
          <CardGroup itemsPerRow={4}>
            <Card
              style={{ marginTop: 40 }}
              onClick={() => handleCardClick("dog")}
            >
              <img
                src={ImagesSrc.dog}
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
                src={ImagesSrc.sheltersRescues}
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
                src={ImagesSrc.cat}
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
                src={ImagesSrc.otherAnimal}
                alt="otherAnimal"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <CardContent>
                <CardDescription>Other Animal</CardDescription>
              </CardContent>
            </Card>
          </CardGroup>
        </div>
      )}
      {/* <Button onClick={showMenu}>back to menu</Button> */}
      <PetList pets={pets} />
      <ModalSearch
        selectedType={selectedType}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Container>
  );
};

export default SearchPage;
