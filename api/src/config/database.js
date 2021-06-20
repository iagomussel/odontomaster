
module.exports = {
    development: {
        dialect: process.env.DB_DIALECT || 'mysql',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '1198ae76a51f1306a4419e6af99337e67ed2fc39e31b4d2b8131c8f2de1d6cc6',
        database: process.env.DB_DATABASE || 'nodeapi',
        host: process.env.DB_HOST || 'localhost',
        define: {
            timestamp: true,
            underscored: true,
            paranoid: true,
        },
        use_env_variable: false,
    }
};