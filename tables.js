const { Sequelize } = require('sequelize');

module.exports = {
  Questions: {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    body: {
      type: Sequelize.STRING(300),
    },
    date: {
      type: Sequelize.STRING(15),
    },
    asker_name: {
      type: Sequelize.STRING(50),
    },
    asker_email: {
      type: Sequelize.STRING(100),
    },
    reported: {
      type: Sequelize.BOOLEAN,
    },
    helpful: {
      type: Sequelize.SMALLINT,
    },
  },

  Answers: {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    question_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    body: {
      type: Sequelize.STRING(300),
    },
    date: {
      type: Sequelize.STRING(15),
    },
    answerer_name: {
      type: Sequelize.STRING(50),
    },
    answerer_email: {
      type: Sequelize.STRING(100),
    },
    reported: {
      type: Sequelize.BOOLEAN,
    },
    helpful: {
      type: Sequelize.SMALLINT,
    },
  },

  Photos: {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    answer_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING(150),
    },
  },
};
