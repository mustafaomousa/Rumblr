/// <reference types="cypress" />

describe("Welcome Page", () => {
  beforeEach(() => {
    cy.request("http://localhost:5000/api/csrf/restore");
  });

  it("Loads welcome page", () => {
    cy.visit("http://localhost:3000/");
  });

  it("Loads log in screen", () => {
    cy.contains("button", "Log in");
    cy.contains("button", "Demo");
  });

  it("Switches to sign up screen", () => {
    cy.contains("button", "Don't have an account?").click();
    cy.contains("button", "Sign up");
  });

  it("Switches to log in screen", () => {
    cy.contains("button", "Already have an account?").click();
    cy.contains("button", "Log in");
    cy.contains("button", "Demo");
  });

  it("Can be logged in as demo-user", () => {
    cy.request("/api/csrf/restore");

    cy.get("input[name=credential]").type("demo-user");
    cy.get("input[name=password]").type("password");
    cy.get("form").submit();

    cy.contains("Discover");
  });

  it("Can log out demo-user", () => {
    cy.contains("button", "demo-user").click();
    cy.get(".css-1pnsv3a-MuiStack-root > .MuiButton-root").click();
    cy.contains("button", "Log in");
  });
});
