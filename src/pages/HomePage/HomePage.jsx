import React from "react";
import { CardContent, Card, Container } from "semantic-ui-react";

export default function HomePage() {
  const description = [
    "pet adoption platform serves as an online space where users can register, explore, and ultimately adopt pets.",
    "Upon signing up, users gain access to a search functionality that enables them to browse through a variety of available pets.",
    "The primary objective of the platform is to facilitate the adoption process,",
    "connecting potential pet owners with animals in need of a loving home. This user-friendly environment aims to streamline the adoption experience",
    " making it convenient and accessible for those looking to welcome a new furry companion into their lives.",
  ].join(" ");

  return (
    <Container>
      <div>
        <Card size="huge" style={{ marginTop: 20 }}>
          {/* Added header prop for the CardContent */}
          <CardContent header="Need to find your pet a new home?" />
          <CardContent description={description} />
          <CardContent extra></CardContent>
        </Card>
      </div>
    </Container>
  );
}
