
const config = require('../lib/config.cjs');

module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('Banks', {
            id          : { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
            countryCode : { type: Sequelize.ENUM('UA', 'DE', 'UK'), allowNull: false  },
            code        : { type: Sequelize.STRING(), allowNull: false },
            name        : { type: Sequelize.STRING(), allowNull: false },
            address     : { type: Sequelize.JSON, allowNull: false, defaultValue: {} },
            createdBy   : {
                type       : Sequelize.UUID,
                references : { model: 'Users', key: 'id' },
                onUpdate   : 'RESTRICT',
                onDelete   : 'RESTRICT',
                allowNull  : true
            }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('Banks');
    }
};
