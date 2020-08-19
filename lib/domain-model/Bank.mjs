import Sequelize from 'sequelize';
import Base      from './Base.mjs';
import User      from './User.mjs';
import { InactiveObject }  from './X.mjs';

const DT = Sequelize.DataTypes;

class Bank extends Base {
    static schema = {
        id          : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
        countryCode : { type: DT.ENUM('UA', 'DE', 'UK'), allowNull: false  },
        code        : { type: DT.STRING(), allowNull: false },
        name        : { type: DT.STRING(), allowNull: false },
        address     : { type: DT.JSON, allowNull: false, defaultValue: {} },
        createdBy   : {
            type       : DT.UUID,
            references : { model: 'Users', key: 'id' },
            onUpdate   : 'RESTRICT',
            onDelete   : 'RESTRICT',
            allowNull  : true
        }

    };

    static initRelations() {
        this.belongsTo(User, { as: 'owner', foreignKey: 'createdBy' });
    }
}

export default Bank;
