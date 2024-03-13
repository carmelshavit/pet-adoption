import React from "react";
import { Container, Button, Icon, Header } from "semantic-ui-react";
export default function HomePage() {
  return (
    <Container fluid>
      <Header className="header" as="h1" textAlign="center">
        Welcome to Our Pet Adoption Platform! 🐾
      </Header>

      <p className="text">
        Discover your future furry friend among the adorable pets waiting for a
        loving home. Sign up today to explore a variety of pets, making the
        adoption process easy and enjoyable. Our user-friendly environment is
        designed to connect you with the perfect companion for a lifetime of
        joy. Explore our platform to find loving homes for adorable pets or
        consider fostering to provide temporary care for those in need.
      </p>

      <Button className="button" color="orange" animated="vertical">
        <Button.Content visible>Get Started</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content>
      </Button>

      <span className="login-text">
        Already have an account? Log in <span className="highlight">here</span>.
      </span>
    </Container>
  );
}
