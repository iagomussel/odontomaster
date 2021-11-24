const { Model, DataTypes } = require("sequelize");

class Configurations extends Model {
    static init(sequelize) {
        super.init(
            {
                key: {
                    type: DataTypes.STRING,
                    get() {
                        return this.getDataValue('key').toUpperCase();
                    },
                    set(value) {
                        this.setDataValue('key', value.toUpperCase());
                    }
                },
                value: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    get() {
                        return JSON.parse(this.getDataValue('value'));
                    },
                    set(value) {
                        this.setDataValue('value', JSON.stringify(value));
                    }
                },
                enabled: DataTypes.BOOLEAN,
            },
            {
                sequelize,
            }
        );
    }
    async configurations() {
        return new Promise((resolve, reject) => {
            this.findAll({
                where: {
                    enabled: true
                }
            }).then(conf=>{
                let ConfMap = {};
                conf.map(c => {
                    ConfMap[c.key] = c.value
                    return c
                })
                resolve(ConfMap);
            }).catch(err=>{
                reject(err);
            });

        })


    }
}

module.exports = Configurations;


