describe('Home Page', () => {
  it('should display the homepage correctly in french', () => {
    cy.visit('/fr')
    cy.contains("Planifie tes repas en quelques secondes grâce à l'IA").should('be.visible')
    cy.contains("Simplifie ta vie en cuisine grâce à notre IA intelligente. En un clic, génère ton planning de repas pour la semaine, accompagné de la liste de courses complète et optimisée. Tu veux de l'inspiration ? Explore des centaines de recettes selon tes envies, ton régime ou les ingrédients que tu as déjà chez toi.").should('be.visible')
  })

  it('should display the homepage correctly in english', () => {
    cy.visit('/en')
    cy.contains("Plan your meals in seconds with AI").should('be.visible')
    cy.contains("Simplify your life in the kitchen with our intelligent AI. With one click, generate your meal plan for the week, along with a complete and optimized shopping list. Want inspiration? Explore hundreds of recipes based on your preferences, diet, or ingredients you already have at home.").should('be.visible')
  })
})
