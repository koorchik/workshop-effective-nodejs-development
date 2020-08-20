import Bank from '../../../domain-model/Bank.mjs';
import BaseUseCase from '../BaseUseCase.mjs';
import DMX from '../../../domain-model/X.mjs';
import UseCaseException from '../../UseCaseException.mjs';

class BanksCreate extends BaseUseCase {
    static validationRules = {
        code        : [ 'required', { 'max_length': 10 } ],
        mainBankId  : [ 'string', 'not_empty', { 'length_equal': 36 }  ],
        name        : [ 'required', { 'max_length': 100 } ],
        countryCode : [ 'required', { 'one_of': [ 'UA', 'DE', 'UK' ] } ]
    };

    async execute(data) {
        try {
            const bankData = {
                ...data,
                createdBy : this.userId
            };
            const bank = await Bank.create(bankData);

            return { id: bank.id };
        } catch (error) {
            if (error instanceof DMX.NotUnique) {
                throw new UseCaseException({
                    code    : 'NOT_UNIQUE',
                    fields  : { [error.field]: 'NOT_UNIQUE' },
                    message : error.message
                });
            } else if (error instanceof DMX.WrongId) {
                throw new UseCaseException({
                    code    : 'WRONG_ID',
                    fields  : { [error.field]: 'WRONG_ID' },
                    message : error.message
                });
            } else if (error instanceof DMX.NotSuitableId) {
                throw new UseCaseException({
                    code    : 'NOT_SUITABLE_ID',
                    fields  : { [error.field]: 'NOT_SUITABLE_ID' },
                    message : error.message
                });
            }

            throw error;
        }
    }
}

export default BanksCreate;
