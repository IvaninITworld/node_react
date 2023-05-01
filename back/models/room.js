const Sequelize = require("sequelize");

module.exports = class Room extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        max: {
          type: Sequelize.INTEGER(40),
          allowNull: false,
          defaultValue: 2,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Room",
        tableName: "rooms",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Room.belongsTo(db.User);
    db.Room.hasMany(db.Chat);
  }
};
