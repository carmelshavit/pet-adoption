import React, { useContext, useState } from "react";
import { ImagesSrc } from "../../../public/ImageSrc";

import {
  CardGroup,
  Card,
  CardContent,
  CardDescription,
  Container,
} from "semantic-ui-react";
import { petService } from "../../service/pet.service";
import PetList from "../../cmps/PetList";
import SearchPets from "../../cmps/SearchPets";
import EditAddPet from "../AdminPage/EditAddPet";
import LoginContext from "../../context/LoginContext";
import LikedContext from "../../context/LikedContext";

const SearchPage = () => {
  const [pets, setPets] = useState([]);
  const [isPets, setIsPets] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
  const [isLike, setIsLike] = useState(false);
  const { likedPet, setLikedPet } = useContext(LikedContext);
  const [likedPetsId, setLikedPetsId] = useState({
    petId: "",
    userId: [1, 2, 3, 4],
  });

  // const toggleLike = async (petId, userId) => {
  //   let clonedPets = JSON.parse(JSON.stringify(pets));
  //   const petIdx = clonedPets.findIndex((pet) => pet.id === petId);
  //   if (petIdx !== -1) {
  //     const pet = clonedPets[petIdx];
  //     if (!pet.likeUsersId) {
  //       pet.likeUsersId = []; // Initialize likeUsersId array if not present
  //     }
  //     const userLikedIdx = pet.likeUsersId.indexOf(userId);
  //     if (userLikedIdx === -1) {
  //       pet.likeUsersId.push(userId); // Add user id to liked users
  //     } else {
  //       pet.likeUsersId.splice(userLikedIdx, 1); // Remove user id from liked users
  //     }
  //     setPets(clonedPets);
  //     setLikedPetsId(clonedPets);
  //     try {
  //       await petService.updatePet(pet);
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   } else {
  //     console.log("Pet not found");
  //   }
  // };
  const handleCardClick = (petId) => {
    console.log(`Pet with ID ${petId} clicked`);
    setIsPets(true);
    // const pet = pets.find((pet) => pet.id === petId);
    // console.log(pet);
  };
  // const showMenu = () => {
  //   setPets([]);
  //   setIsPets(false);
  // };
  const counterLikes = (petId) => {
    setIsLike(true);
    console.log(petId);
  };
  //   const toggleLike = async (petId) => {
  //     let clonedPets = JSON.parse(JSON.stringify(pets))
  //     const petIdx = clonedPets.findIndex(pet => pet.id === petId)
  //     const Pet = clonedPets[petIdx]
  //     const userLikedIdx = Pet.indexOf(loggedInUser.id)

  //     userLikedIdx === -1 ? Pet.push(loggedInUser.id) : Pet.likeUsersId.splice(userLikedIdx, 1)
  //     setPets(clonedPets)
  //     setLikedPet(clonedPets)
  //     console.log(likedPet);

  //     try {
  //         await petService.updatePet(Pet)
  //     } catch (error) {
  //         console.log(error);
  //         throw error
  //     }
  // }
  // const toggleLike = (petId) => {
  //   setLoggedInUser((prevUser) => {
  //     if (prevUser.likedPetsId.includes(petId)) {
  //       return {
  //         ...prevUser,
  //         likedPets: prevUser.likedPetsId.filter((id) => id !== petId),
  //       };
  //     } else {
  //       return {
  //         ...prevUser,
  //         likedPets: [...prevUser.likedPetsId, petId],
  //       };
  //     }
  //   });
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

  const searchPet = async (filterPet) => {
    const petBySearch = await petService.getPetsBySearch(filterPet);
    console.log(petBySearch);
    setPets(petBySearch);
    console.log(pets);
    setIsPets(true);
  };
  const isAdmin = loggedInUser?.is_admin == true;
  console.log(isAdmin);
  //replace card component. add array to render the cards.
  return (
    <Container>
      {!isPets && (
        <div>
          <CardGroup itemsPerRow={4}>
            <Card style={{ marginTop: 40 }} onClick={() => searchPet("dog")}>
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
              onClick={() => searchPet("sheltersRescues")}
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
            <Card style={{ marginTop: 40 }} onClick={() => searchPet("Cat")}>
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
              onClick={() => searchPet("otherAnimal")}
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
      {isPets && (
        <>
          <SearchPets />
          {isAdmin && <button onClick={openAddModal}>Add</button>}
          {/* {isAdmin?  <PetList openEditModal={openEditModal} pets={pets} /> : <PetList pets={pets} />} */}
          <PetList
            openEditModal={isAdmin ? openEditModal : null}
            pets={pets}
            // toggleLike={toggleLike}
          />
        </>
      )}
      <EditAddPet
        isOpenEditModal={isShowAddModal}
        setIsOpenEditModal={setIsShowAddModal}
      />
      <EditAddPet
        isOpenEditModal={isShowEditModal}
        selectedPet={selectedPet}
        setIsOpenEditModal={setIsShowEditModal}
      />
    </Container>
  );
};

export default SearchPage;
