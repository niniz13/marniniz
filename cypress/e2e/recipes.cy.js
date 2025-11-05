describe("Recipes Page", () => {
  const baseUrl = "/fr/recipes";

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("should load and display the recipes list", () => {
    cy.intercept("GET", "/api/recipes*", {
      statusCode: 200,
      body: {
        recipes: [
          {
            _id: "690094c82e6f81741536b4ec",
            strMeal: "Recette ultime de spaghettis à la carbonara",
            strMealThumb: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg",
            strDishType: "Recettes de pâtes",
            strServings: 4,
          },
          {
            _id: "r2",
            strMeal: "Vegan Salad",
            strMealThumb: "https://images.immediate.co.uk/production/volatile/sites/30/2022/05/Caprese-salad-8f218a3.png",
            strDishType: "Entrées pour le dîner",
            strServings: 4,
          },
        ],
        totalPages: 2,
      },
    }).as("getRecipes");

    cy.visit(baseUrl);
    cy.wait("@getRecipes");
    cy.contains("Recette ultime de spaghettis à la carbonara").should("be.visible");
    cy.contains("Vegan Salad").should("be.visible");
    cy.get("img").should("have.length.at.least", 2);
    cy.get(".MuiPagination-root").should("exist");
  });

  it("should navigate to a recipe detail page when a recipe is clicked", () => {
    cy.intercept("GET", "/api/recipes*", {
      statusCode: 200,
      body: {
        recipes: [
          {
            _id: "690094c82e6f81741536b4ec",
            strMeal: "Recette ultime de spaghettis à la carbonara",
            strMealThumb: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg",
            strDishType: "Dinner",
            strServings: 4,
          },
        ],
        totalPages: 1,
      },
    }).as("getRecipes");

    cy.visit(baseUrl);
    cy.wait("@getRecipes");
    cy.contains("Recette ultime de spaghettis à la carbonara").click();
    cy.url().should("include", "/fr/recipes/690094c82e6f81741536b4ec");
  });

  it("should display a no results message when API returns empty", () => {
    cy.intercept("GET", "/api/recipes*", {
      statusCode: 200,
      body: { recipes: [], totalPages: 1 },
    }).as("getEmptyRecipes");

    cy.visit(baseUrl);
    cy.wait("@getEmptyRecipes");
    cy.contains("Aucune recette trouvée avec ces filtres.", { matchCase: false }).should("exist");
  });

  it("should handle API error gracefully", () => {
    cy.intercept("GET", "/api/recipes*", {
      statusCode: 500,
      body: { message: "Server error" },
    }).as("getRecipesError");

    cy.visit(baseUrl);
    cy.wait("@getRecipesError");
    cy.contains("Erreur", { matchCase: false }).should("exist");
  });
});
