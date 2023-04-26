const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM("free", "premium"),
          allowNull: false,
          defaultValue: "free",
        },
        nick: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        victory: {
          type: Sequelize.INTEGER(40),
          allowNull: false,
          defaultValue: 0,
        },
        lose: {
          type: Sequelize.INTEGER(40),
          allowNull: false,
          defaultValue: 0,
        },
        profileImage: {
          type: Sequelize.STRING(100),
          allowNull: false,
          defaultValue: "image.png",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  //   static associate(db) {
  //     db.User.hasMany(db.Spaceship);
  //     db.User.hasMany(db.Scoredata);
  //     db.User.hasMany(db.Post, {
  //       onDelete: "CASCADE",
  //       hooks: true,
  //     });
  //     db.User.hasMany(db.Postlike, {
  //       onDelete: "CASCADE",
  //       hooks: true,
  //     });
  //   }
};
