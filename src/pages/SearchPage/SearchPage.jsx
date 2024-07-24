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
import SearchForm from "./SearchForm";
import LoginContext from "../../context/LoginContext";
import EditAddPet from "../AdminPage/EditAddPet";

const PET_CARDS = [
  { petType: "dog", petImgSrc: "dog", cardDescription: "Dogs" },
  { petType: "cat", petImgSrc: "cat", cardDescription: "Cats" },
];

const SearchPage = () => {
  const [pets, setPets] = useState([]);
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
    hypoallergenic: false, // TODO: can either be "" or "true"
    breed: "",
    pageNum: 1,
    perPage: 3,
  });
  const [isPets, setIsPets] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    searchPet(filterBy);
  }, [isPets, currentPage]);

  const updateFilter = (name, value) => {
    console.log(name, value);
    setFilterBy((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const searchPet = async (filterBy) => {
    console.log({ filterBy });
    try {
      const petBySearch = await petService.getPetsBySearch(filterBy);
      setPets(petBySearch);
    } catch (error) {
      console.error(error);
    }
  };

  const nextPage = () => {
    console.log("nextPage");
    setCurrentPage((prevPage) => prevPage + 1);
    updateFilter("pageNum", currentPage + 1); // Update pageNum after incrementing currentPage
  };

  const prevPage = () => {
    console.log("prevPage");

    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    updateFilter("pageNum", Math.max(currentPage - 1, 1)); // Update pageNum after decrementing currentPage
  };

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
          <PetList openEditModal={openEditModal} pets={pets} />
          <Button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button onClick={nextPage}>Next</Button>
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
