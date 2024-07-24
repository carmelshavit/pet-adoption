describe("Testing some website", () => {
  it("will try to enter a website", () => {
    cy.visit("www.google.com");
    cy.contains("Google");
    cy.get("textarea").eq(0).type("hello mosh");

    const firstSelection = cy.get('ul[role="listbox"] li').eq(0);
    firstSelection.should("contain", "hello mosh");
    firstSelection.click();
  });
});
