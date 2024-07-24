describe("Test Login Flow", () => {
  it("hey", () => {
    cy.visit("http://localhost:5173/");
    cy.get("h1").contains("Welcome to Our Pet Adoption Platform! 🐾");
    cy.get("h1").should('');
  });
});
