
module.exports = {
    development: {
        dialect: process.env.DB_DIALECT || 'mysql',
        username: process.env.DB_USERNAME || 'db_user',
        password: process.env.DB_PASSWORD || '1198ae76a51f1306a4419e6af99337e67ed2fc39e31b4d2b8131c8f2de1d6cc6',
        database: process.env.DB_DATABASE || 'database',
        host: process.env.DB_HOST || 'localhost',
        define: {
            timestamp: true,
            underscored: true,
            paranoid: true,
        },
    },
    production: {
        dialect: process.env.DB_DIALECT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        define: {
            timestamp: true,
            underscored: true,
            paranoid: true,
        },
    },


    use_env_variable: false,
};