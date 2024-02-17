import React, { useEffect, useState, useContext, navigate } from "react";
import { petService } from "./service/pet.service";
import { Card, Grid } from "semantic-ui-react";
import LoginContext from "./context/LoginContext";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsData = await petService.getPets();
        console.log(petsData);
        setPets(petsData);
      } catch (error) {
        console.error("Error getting pets:", error);
      }
    };

    if (!loggedInUser) navigate("/");
    fetchPets();

    // // const intervalId = setInterval(fetchPets, 100000)
    // // return () => clearInterval(intervalId)
  }, []);

  const handleCardClick = (item) => {
    // Handle card click logic here
  };

  return (
    <Grid
      columns={5}
      stackable
      centered
      verticalAlign="top"
      padded="vertically"
    >
      {pets.map((item) => (
        <Grid.Column key={item.id}>
          <Card.Group>
            <Card
              fluid
              image={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              onClick={() => handleCardClick(item)}
            />
          </Card.Group>
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default Gallery;
