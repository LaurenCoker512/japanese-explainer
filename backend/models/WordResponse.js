const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const WordResponse = sequelize.define(
  "WordResponse",
  {
    word: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["word", "age"], // Ensures no duplicate word-age pairs
      },
    ],
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

module.exports = WordResponse;
