describe("Settings Page", () => {
  const baseUrl = "/fr/settings";
  const fakeUser = {
    name: "John Doe",
    email: "john@example.com",
    image: "/default-avatar.svg",
    provider: "credentials",
  };

  beforeEach(() => {
    cy.intercept("GET", "/api/auth/session", {
      statusCode: 200,
      body: { user: fakeUser },
    }).as("getSession");
  });

  it("should display skeletons when session is loading", () => {
    cy.intercept("GET", "/api/auth/session", { delay: 1000 }).as(
      "delayedSession"
    );
    cy.visit(baseUrl);
    cy.get(".MuiSkeleton-root").should("exist");
  });

  it("should redirect to login page if no session", () => {
    cy.intercept("GET", "/api/auth/session", {
      statusCode: 200,
      body: null,
    }).as("noSession");

    cy.visit(baseUrl);
    cy.url().should("include", "/login");
  });

  it("should display user information when session is loaded", () => {
    cy.visit(baseUrl);
    cy.wait("@getSession");

    cy.get("input[type='text']").should("have.value", fakeUser.name);
    cy.get("input[type='email']").should("have.value", fakeUser.email);
    cy.get("img").should("be.visible");
  });

  it("should allow changing the name and saving profile", () => {
    cy.visit(baseUrl);
    cy.wait("@getSession");

    cy.get("input[type='text']").clear().type("Jane Doe");
    cy.intercept("PUT", "/api/user/update", {
      statusCode: 200,
      body: { success: true },
    }).as("saveProfile");

    cy.contains("button", /Enregistrer|Save/i).click();
    cy.wait("@saveProfile");
  });

  it("should handle profile save error gracefully", () => {
    cy.visit(baseUrl);
    cy.wait("@getSession");

    cy.intercept("PUT", "/api/user/update", {
      statusCode: 500,
    }).as("saveError");

    cy.contains("button", /Enregistrer|Save/i).click();
    cy.wait("@saveError");
    cy.contains(/Erreur|Error/i).should("exist");
  });

  it("should allow changing password when not Google user", () => {
    cy.visit(baseUrl);
    cy.wait("@getSession");

    cy.get('input[type="password"]').first().type("oldpass123");
    cy.get('input[type="password"]').eq(1).type("newpass123");

    cy.intercept("POST", "/api/user/change-password", {
      statusCode: 200,
    }).as("changePassword");

    cy.contains("button", /Modifier le mot de passe|Change Password/i).click();
    cy.wait("@changePassword");
  });

  it("should show toast confirmation and delete account", () => {
    cy.visit(baseUrl);
    cy.wait("@getSession");

    cy.intercept("DELETE", "/api/user/delete", {
      statusCode: 200,
    }).as("deleteAccount");

    cy.contains("button", /Supprimer|Delete/i).click();
    cy.get('[data-cy="delete-account-button"]').click({ force: true });
    cy.wait("@deleteAccount");
  });

  it("should disable inputs if user is Google provider", () => {
    cy.intercept("GET", "/api/auth/session", {
      statusCode: 200,
      body: { user: { ...fakeUser, provider: "google" } },
    }).as("googleSession");

    cy.visit(baseUrl);
    cy.wait("@googleSession");

    cy.get("input[type='text']").should("be.disabled");
    cy.get("input[type='email']").should("be.disabled");
    cy.get("input[type='file']").should("be.disabled");
  });
});
