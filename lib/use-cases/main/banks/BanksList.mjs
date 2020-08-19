import Bank from '../../../domain-model/Bank.mjs';
import BaseUseCase from '../BaseUseCase.mjs';

class BanksList extends BaseUseCase {
    static validationRules = {};

    async execute() {
        const banks = await Bank.findForUser({
            userId : this.userId
        });

        return { list: banks.map(dumpBank), meta: { total: banks.length } };
    }
}

function dumpBank(bank) {
    return {
        id       : bank.id,
        name     : bank.name,
        code     : bank.code,
        isGlobal : bank.isGlobal
    };
}

export default BanksList;
