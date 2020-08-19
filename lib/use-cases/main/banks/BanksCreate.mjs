import Bank from '../../../domain-model/Bank.mjs';
import BaseUseCase from '../BaseUseCase.mjs';

class BanksCreate extends BaseUseCase {
    static validationRules = {
        code        : [ 'required', { 'max_length': 10 } ],
        name        : [ 'required', { 'max_length': 100 } ],
        countryCode : [ 'required', { 'one_of': [ 'UA', 'DE', 'UK' ] } ]
    };

    async execute(data) {
        const bankData = {
            ...data,
            createdBy : this.userId
        };
        const bank = await Bank.create(bankData);

        return { id: bank.id };
    }
}

export default BanksCreate;
