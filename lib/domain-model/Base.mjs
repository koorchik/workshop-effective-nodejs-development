import Sequelize from 'sequelize';
import X         from './X.mjs';

const Op = Sequelize.Op;

class Base extends Sequelize.Model {
    static init(sequelize, options = {}) {
        super.init(this.schema, { ...options, sequelize });
    }

    static initRelationsAndHooks() {
        if (this.initRelations) this.initRelations();
        if (this.initHooks) this.initHooks();
    }

    static async findById(id) {
        const entity = await this.findOne({ where: { id } });

        if (!entity) {
            throw new X.WrongId({
                message : `There is no ${this.name} with id = "${id}"`,
                field   : 'id'
            });
        }

        return entity;
    }

    static async findForUser({ userId } = {}) {
        if (!userId) throw new Error('UserId REQUIRED');

        return this.findAll({ where : {
            [Op.or] : [
                { CreatedBy: userId },
                { CreatedBy: { [Op.eq]: null } }
            ]
        } });
    }

    async save(...args) {
        try {
            return await super.save(...args);
        } catch (x) {
            if (x instanceof Sequelize.UniqueConstraintError) {
                const error = x.errors[0];

                throw new X.NotUnique({
                    message : error.message,
                    field   : error.path.split('.')[1],
                    parent  : x
                });
            }

            throw x;
        }
    }
}

export default Base;
