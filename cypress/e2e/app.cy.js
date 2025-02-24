describe("App E2E", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); // Ajustez l'URL selon votre configuration
  });

  it("should display all main components", () => {
    cy.contains("React Testing Demo");
    cy.contains("Test Button Component");
    cy.contains("User List Component");
    cy.contains("Form to Fill");
    cy.contains("GitHub User Search");
  });

  it("should test the GitHub user search flow", () => {
    // Intercepter les appels API
    cy.intercept("GET", "https://api.github.com/users/*", {
      fixture: "user.json",
    }).as("getUser");

    // Tester la recherche
    cy.get('[data-testid="github-username-input"]').type("testuser");
    cy.get('[data-testid="github-search-button"]').click();

    // Vérifier le chargement et le résultat
    cy.get('[data-testid="loading"]').should("exist");
    cy.wait("@getUser");
    cy.get('[data-testid="user-info"]').should("exist");
  });

  it("should test the form submission", () => {
    // Remplir le formulaire
    cy.get('[data-testid="username-input"]').type("testuser");
    cy.get('[data-testid="email-input"]').type("test@example.com");
    cy.get('[data-testid="password-input"]').type("password123");
    cy.get('[data-testid="age-input"]').type("25");

    // Soumettre le formulaire
    cy.get('[data-testid="submit-button"]').click();
  });
});
