/// <reference types="cypress" />

describe("Creating a post", () => {
  beforeEach(() => {
    cy.request("http://localhost:5000/api/csrf/restore");
    cy.visit("http://localhost:3000/");
    cy.get("input[name=credential]").type("demo-user");
    cy.get("input[name=password]").type("password");
    cy.get("form").submit();

    cy.contains("Discover");

    cy.visit("http://localhost:3000/discover");
    cy.get(".css-1ulzbjx-MuiStack-root > .MuiButton-contained").click();
  });

  it("Creates a post", () => {
    cy.get("input[type=file]").attachFile("flyspur.jpeg");
    cy.get(".MuiOutlinedInput-root").type(
      `I recently discovered I could make fudge with just chocolate chips`
    );
    cy.visit("http://localhost:3000/discover");
    cy.get("#postInput-demo-user").contains(
      "I recently discovered I could make fudge with just chocolate chips"
    );
  });
});
