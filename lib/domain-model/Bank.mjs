import Sequelize from 'sequelize';
import Base      from './Base.mjs';
import User      from './User.mjs';
import { NotSuitableId, WrongId, NotUnique }  from './X.mjs';

const DT = Sequelize.DataTypes;
const Op = Sequelize.Op;

class Bank extends Base {
    static schema = {
        id          : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
        countryCode : { type: DT.ENUM('UA', 'DE', 'UK'), allowNull: false  },
        code        : { type: DT.STRING(), allowNull: false },
        name        : { type: DT.STRING(), allowNull: false },
        address     : { type: DT.JSON, allowNull: false, defaultValue: {} },
        mainBankId  : {
            type       : DT.UUID,
            references : { model: 'Banks', key: 'id' },
            onUpdate   : 'RESTRICT',
            onDelete   : 'RESTRICT',
            allowNull  : true
        },
        createdBy : {
            type       : DT.UUID,
            references : { model: 'Users', key: 'id' },
            onUpdate   : 'RESTRICT',
            onDelete   : 'RESTRICT',
            allowNull  : true
        }
    };

    static initRelations() {
        this.belongsTo(User, { as: 'owner', foreignKey: 'createdBy' });
        this.belongsTo(Bank, { as: 'mainBank', foreignKey: 'mainBankId' });
    }

    validationRules = {
        async code(code) {
            if (!this.createdBy) return;

            const sameExists = await this.constructor.findOne({
                where : {
                    [Op.or] : [
                        { CreatedBy: this.createdBy },
                        { CreatedBy: { [Op.eq]: null } }
                    ],
                    code,
                    countryCode : this.countryCode,
                    id          : { [Op.ne]: this.id }
                }
            });

            if (sameExists) {
                throw new NotUnique({
                    field   : 'code',
                    message : 'Bank with same code and country_id already exists'
                });
            }
        },

        async mainBankId(mainBankId) {
            if (!mainBankId) return;

            if (this.id === mainBankId) {
                throw new NotSuitableId({
                    field   : 'mainBankId',
                    message : 'Bank cannot reference to itself'
                });
            }

            const mainBank = await this.constructor.findOne({
                where : {
                    id : mainBankId
                }
            });

            if (!mainBank) {
                throw WrongId({
                    field   : 'mainBankId',
                    message : 'Wrong main bank ID'
                });
            }

            if (!mainBank) {
                throw WrongId({
                    field   : 'mainBankId',
                    message : 'Wrong main bank ID'
                });
            }

            if (mainBank.mainBankId) {
                throw new NotSuitableId({
                    field   : 'mainBankId',
                    message : 'Bank already is branch'
                });
            }
        }
    }

    get isGlobal() {
        return !this.createdBy;
    }
}

export default Bank;
