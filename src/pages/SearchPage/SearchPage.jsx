import React, { useContext, useEffect, useState } from "react";
import { ImagesSrc } from "../../../public/ImageSrc";
import {
  CardGroup,
  Card,
  CardContent,
  CardDescription,
  Container,
  Form,
} from "semantic-ui-react";
import { petService } from "../../service/pet.service";
import PetList from "../../cmps/PetList";
import SearchForm from "../../cmps/SearchForm";
import LoginContext from "../../context/LoginContext";
import EditAddPet from "../AdminPage/EditAddPet";

const PET_CARDS = [
  { petType: "dog", petImgSrc: "dog", cardDescription: "Dogs" },
  { petType: "cat", petImgSrc: "cat", cardDescription: "Cats" },
  {
    petType: "otherAnimal",
    petImgSrc: "otherAnimal",
    cardDescription: "Other Animal",
  },
  {
    petType: "sheltersRescues",
    petImgSrc: "sheltersRescues",
    cardDescription: "Shelters Rescues",
  },
];

const SearchPage = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const { loggedInUser } = useContext(LoginContext);

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
  return (
    <Container>
      {!isPets && (
        <div>
          <CardGroup itemsPerRow={4}>
            {PET_CARDS.map((card, index) => (
              // <li key={index}>
              <Card
                style={{ marginTop: 40 }}
                onClick={() => {
                  updateFilter("type", card.petType);
                  setIsPets(true);
                }}
              >
                <img
                  src={ImagesSrc[card.petImgSrc]}
                  alt={card.petImgSrc}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <CardContent>
                  <CardDescription>{card.cardDescription}</CardDescription>
                </CardContent>
              </Card>
              // </li>
            ))}
          </CardGroup>
        </div>
      )}
      {/* <Button onClick={showMenu}>back to menu</Button> */}
      {isPets && (
        <>
          <SearchForm filterBy={filterBy} updateFilter={updateFilter} />
          <button onClick={() => searchPet(filterBy)}>Search</button>
          {isAdmin && <button onClick={openAddModal}>Add</button>}
          <PetList
            openEditModal={openEditModal}
            pets={pets}
            // toggleLike={toggleLike}
          />
        </>
      )}
      {isShowAddModal && (
        <EditAddPet
          isOpenEditModal={isShowAddModal}
          setIsOpenEditModal={setIsShowAddModal}
        />
      )}
      TODO:solve to update the setPet/selectedpet after addpet or editpet.ד
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
