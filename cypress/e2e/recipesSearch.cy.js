describe("Search Page", () => {
  beforeEach(() => {
    cy.visit("/fr/recipes-search");
  });

  it("should display the search page title", () => {
    cy.contains("Recherche de recettes").should("be.visible");
  });

  it("should allow typing in the recipe name input", () => {
    cy.get('input[name="name"]').type("Pasta");
    cy.get('input[name="name"]').should("have.value", "Pasta");
  });

  it("should allow selecting difficulty and subcategory", () => {
    cy.get('select[name="difficulty"]').select(1);
    cy.get('select[name="subCategory"]').select(2);
  });

  it("should update numeric inputs", () => {
    cy.get('input[name="prepTimeMin"]').type("10");
    cy.get('input[name="prepTimeMax"]').type("30");
    cy.get('input[name="cookTimeMin"]').type("5");
    cy.get('input[name="cookTimeMax"]').type("20");
    cy.get('input[name="minIngredients"]').type("3");
    cy.get('input[name="maxIngredients"]').type("8");
    cy.get('input[name="nutritionValue"]').type("200");
  });

  it("should select nutrition options", () => {
    cy.get('select[name="nutritionKey"]').select(1);
    cy.get('select[name="nutritionOp"]').select("gt");
  });

  it("should redirect to recipes page with correct query params", () => {
    cy.get('input[name="name"]').type("Salad");
    cy.get('select[name="difficulty"]').select(1); // On sélectionnne "Facile"
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/fr/recipes?");
    cy.url().should("include", "name=Salad");
    cy.url().should("include", "difficulty=Facile");
  });
});
