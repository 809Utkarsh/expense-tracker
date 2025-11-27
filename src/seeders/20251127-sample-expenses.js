'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'expenses',
      [
        {
          title: 'Lunch at Subway',
          category: 'Food',
          amount: 250.0,
          date: '2025-11-25',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Bus to Office',
          category: 'Travel',
          amount: 60.0,
          date: '2025-11-24',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Electricity Bill',
          category: 'Bills',
          amount: 1200.0,
          date: '2025-11-01',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('expenses', null, {});
  },
};
