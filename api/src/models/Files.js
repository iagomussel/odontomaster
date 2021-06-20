const { Model, DataTypes } = require("sequelize");

class Files extends Model {
    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
                contentType: DataTypes.STRING,
            },
            { sequelize}
        )
    }
}

module.exports = Files;

