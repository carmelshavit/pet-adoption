import React, { useContext, useEffect, useState } from "react";
import { ImagesSrc } from "../../../public/ImageSrc";
import {
  CardGroup,
  Card,
  CardContent,
  CardDescription,
  Container,
  Form,
  Button,
} from "semantic-ui-react";
import { petService } from "../../service/pet.service";
import PetList from "../../cmps/PetList";
import SearchForm from "../../cmps/SearchForm";
import LoginContext from "../../context/LoginContext";
import EditAddPet from "../AdminPage/EditAddPet";

const PET_CARDS = [
  { petType: "dog", petImgSrc: "dog", cardDescription: "Dogs" },
  { petType: "cat", petImgSrc: "cat", cardDescription: "Cats" },
  // {
  //   petType: "otherAnimal",
  //   petImgSrc: "otherAnimal",
  //   cardDescription: "Other Animal",
  // },
  // {
  //   petType: "sheltersRescues",
  //   petImgSrc: "sheltersRescues",
  //   cardDescription: "Shelters Rescues",
  // },
];

const SearchPage = () => {
  const [pets, setPets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);

  const [filterBy, setFilterBy] = useState({
    type: "",
    minHeight: null,
    maxHeight: null,
    minWeight: null,
    maxWeight: null,
    color: "",
    hypoallergenic: "", // TODO: can either be "" or "true"
    dietary_restrictions: "",
    breed: "",
    name: "",
  });
  const [isPets, setIsPets] = useState(false);

  useEffect(() => {
    searchPet(filterBy);
  }, [isPets]);

  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser]);

  const updateFilter = (name, value) => {
    console.log(name, value);
    setFilterBy((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const searchPet = async (filterBy) => {
    try {
      const petBySearch = await petService.getPetsBySearch(filterBy);
      // console.log("petBySearch", petBySearch);
      setPets(petBySearch);
    } catch (error) {
      console.error(error);
    }
  };

  // const showMenu = () => {
  //   setPets([]);
  //   setIsPets(false);
  // };

  const openEditModal = (petId) => {
    const pet = pets.find((pet) => pet.id === petId);
    console.log("openEditModal", pet);
    setSelectedPet(pet);
    setIsShowEditModal(true);
  };

  const openAddModal = () => {
    setIsShowAddModal(true);
  };
  const isAdmin = loggedInUser?.is_admin == true;
  //replace card component. add array to render the cards.

  const returnPet = async (petId) => {
    console.log(petId);
    try {
      const returnedPet = await petService.returnPet(petId);

      const updatedAdoptedPets = loggedInUser.adoptedPets.filter(
        (pet) => pet.id !== petId
      );
      setLoggedInUser((prevUser) => ({
        ...prevUser,
        adoptedPets: updatedAdoptedPets,
      }));
      setAdoptedPets(updatedAdoptedPets);
      console.log("Pet returned:", returnedPet);
    } catch (error) {
      console.error("Error returning pet:", error);
    }
  };

  const adoptPet = async (petId) => {
    try {
      const adoptedPet = await petService.adoptPet(petId);
      // Ensure that the adoptedPet object matches the structure of other pets
      const updatedAdoptedPets = [...loggedInUser.adoptedPets, adoptedPet];
      // Update the loggedInUser state using the updated value provided in the function argument
      setLoggedInUser((prevUser) => ({
        ...prevUser,
        adoptedPets: updatedAdoptedPets,
      }));
      console.log("Pet adopted:", updatedAdoptedPets);
      setAdoptedPets(updatedAdoptedPets);
    } catch (error) {
      console.error("Error adopting pet:", error);
    }
  };

  const handleAdoption = async (petId, e) => {
    e.stopPropagation();
    const isAdopted = loggedInUser.adoptedPets.some((pet) => pet.id === petId);

    if (isAdopted) {
      await returnPet(petId);
      console.log("returning pet");
    } else {
      await adoptPet(petId);
      console.log("adopting pet");
    }
  };

  return (
    <Container>
      {!isPets && (
        <div>
          <CardGroup itemsPerRow={2}>
            {PET_CARDS.map((card, index) => (
              <Card
                key={index}
                style={{ marginTop: 40, width: "200px" }} // Adjust the width to make the card smaller
                onClick={() => {
                  updateFilter("type", card.petType);
                  setIsPets(true);
                }}
              >
                <img
                  src={ImagesSrc[card.petImgSrc]}
                  alt={card.petImgSrc}
                  style={{ objectFit: "cover", width: "90%", padding: "10px" }} // Adjust the width and height to make the image smaller
                />
                <CardContent>
                  <CardDescription>{card.cardDescription}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </CardGroup>
        </div>
      )}
      {/* <Button onClick={showMenu}>back to menu</Button> */}
      {isPets && (
        <>
          <SearchForm filterBy={filterBy} updateFilter={updateFilter} />
          <Button
            onClick={() => searchPet(filterBy)}
            basic
            color="purple"
            content="Purple"
          >
            Search{" "}
          </Button>
          {isAdmin && (
            <Button
              onClick={openAddModal}
              basic
              color="purple"
              content="Purple"
            >
              Add
            </Button>
          )}
          <PetList
            openEditModal={openEditModal}
            pets={pets}
            handleAdoption={handleAdoption}
          />
        </>
      )}
      {isShowAddModal && (
        <EditAddPet
          isOpenEditModal={isShowAddModal}
          setIsOpenEditModal={setIsShowAddModal}
        />
      )}
      {/* TODO:solve to update the setPet/selectedpet after addpet or editpet.ד */}
      {isShowEditModal && (
        <EditAddPet
          isOpenEditModal={isShowEditModal}
          selectedPet={selectedPet}
          setIsOpenEditModal={setIsShowEditModal}
        />
      )}
    </Container>
  );
};

export default SearchPage;
