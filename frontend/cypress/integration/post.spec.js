/// <reference types="cypress" />

describe("Creating a post", () => {
  beforeEach(() => {
    cy.request("http://localhost:5000/api/csrf/restore");
    cy.visit("http://localhost:3000/");
    cy.get("input[name=credential]").type("demo-user");
    cy.get("input[name=password]").type("password");
    cy.get("#loginButton").click();
  });

  it("Creates a post", () => {
    cy.title()
      .should("eq", "Rumblr - Discover")
      .then(() => {
        cy.get(".css-1ulzbjx-MuiStack-root > .MuiButton-contained").click();
        cy.get("input[type=file]").attachFile("flyspur.jpeg");
        cy.get(".MuiOutlinedInput-root").type(`cypress test`);
        cy.get("form").submit();
      });
  });
});
