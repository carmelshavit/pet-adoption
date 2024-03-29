import React, { useState, useEffect } from "react";
import { petService } from "../../service/pet.service";
import { useParams } from "react-router-dom";
import {
  Card,
  Image,
  CardContent,
  CardHeader,
  CardMeta,
  CardDescription,
  Icon,
} from "semantic-ui-react";

export default function PetPage() {
  const [pet, setPet] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getPetById = async () => {
      console.log(id);
      try {
        const fetchedPet = await petService.getPetById(id);
        console.log(fetchedPet);
        setPet(fetchedPet);
      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };
    getPetById();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {pet ? (
        <Card>
          <Image src={pet.imgFile} wrapped ui={false} />
          <CardContent>
            <CardHeader>{pet.name}</CardHeader>
            <CardMeta>Type: {pet.type}</CardMeta>
            <CardMeta>Adoption Status: {pet.adoption_status}</CardMeta>
            <CardMeta>Height: {pet.height}</CardMeta>
            <CardMeta>Weight: {pet.weight}</CardMeta>
            <CardMeta>Color: {pet.color}</CardMeta>
            <CardMeta>Bio: {pet.bio}</CardMeta>
            <CardMeta>
              Hypoallergenic: {pet.hypoallergenic ? "Yes" : "No"}
            </CardMeta>
            <CardMeta>
              Dietary Restrictions: {pet.dietary_restrictions}
            </CardMeta>
            <CardMeta>Breed: {pet.breed}</CardMeta>
          </CardContent>
        </Card>
      ) : (
        <p>Loading pet details...</p>
      )}
    </div>
  );
}
