module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('groceries_category', [
      { name: "Fresh Produce", createdAt: new Date(), updatedAt: new Date() },
      { name: "Meat & Seafood", createdAt: new Date(), updatedAt: new Date() },
      { name: "Dairy & Eggs", createdAt: new Date(), updatedAt: new Date() },
      { name: "Bakery & Bread", createdAt: new Date(), updatedAt: new Date() },
      { name: "Frozen Foods", createdAt: new Date(), updatedAt: new Date() },
      { name: "Dry & Canned Goods", createdAt: new Date(), updatedAt: new Date() },
      { name: "Snacks & Confectionery", createdAt: new Date(), updatedAt: new Date() },
      { name: "Beverages", createdAt: new Date(), updatedAt: new Date() },
      { name: "Condiments & Sauces", createdAt: new Date(), updatedAt: new Date() },
      { name: "Health & Organic Foods", createdAt: new Date(), updatedAt: new Date() },
      { name: "Household Essentials", createdAt: new Date(), updatedAt: new Date() },
      { name: "Personal Care & Hygiene", createdAt: new Date(), updatedAt: new Date() },
      { name: "Baby & Childcare", createdAt: new Date(), updatedAt: new Date() },
      { name: "Pet Supplies", createdAt: new Date(), updatedAt: new Date() },
      { name: "International & Ethnic Foods", createdAt: new Date(), updatedAt: new Date() },
      { name: "Alcoholic Beverages", createdAt: new Date(), updatedAt: new Date() },
      { name: "Ready-to-Eat & Deli", createdAt: new Date(), updatedAt: new Date() },
      { name: "Pasta & Rice", createdAt: new Date(), updatedAt: new Date() },
      { name: "Cooking Oils & Vinegar", createdAt: new Date(), updatedAt: new Date() },
      { name: "Spices & Seasonings", createdAt: new Date(), updatedAt: new Date() },
      { name: "Breakfast & Cereals", createdAt: new Date(), updatedAt: new Date() },
      { name: "Baking Supplies", createdAt: new Date(), updatedAt: new Date() },
      { name: "Party Platters & Entertaining", createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('groceries_category', null, {});
  }
};
