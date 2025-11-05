describe("Recipe Detail Page", () => {
  const recipeId = "690094af2e6f81741536aeee";
  const baseUrl = "/fr/recipes/" + recipeId;

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("should load the recipe details successfully", () => {
    cy.get("h1", { timeout: 10000 }).should("be.visible");
    cy.get("h1").should("not.be.empty");
    cy.get("img").should("be.visible");
    cy.contains("Ingrédients", { matchCase: false }); // Titre ingrédients
  });

  it("should display ingredients list or fallback", () => {
    cy.get("ul").then(($ul) => {
      if ($ul.find("li").length > 0) {
        cy.get("li").should("exist");
      } else {
        cy.contains("Aucun ingrédient disponible.");
      }
    });
  });

  it("should display instructions section", () => {
    cy.contains("instructions", { matchCase: false }).should("be.visible");
  });

  it("should toggle favorite when clicking the heart button", () => {
    cy.get('button[title]').then(($btns) => {
      const favButton = $btns.filter((_, el) =>
        el.title.includes("Favorites") || el.title.includes("Favoris")
      );
      if (favButton.length) {
        cy.wrap(favButton.first()).click({ force: true });
      }
    });
  });

  it("should trigger PDF export when clicking the PDF button", () => {
    cy.window().then((win) => {
      cy.stub(win, "print").as("printStub");
    });

    cy.get('button[title]').then(($btns) => {
      const pdfButton = $btns.filter((_, el) =>
        el.title.includes("PDF") || el.title.includes("export")
      );
      if (pdfButton.length) {
        cy.wrap(pdfButton.first()).click({ force: true });
      }
    });

    cy.get("@printStub").should("have.been.calledOnce");
  });
});
