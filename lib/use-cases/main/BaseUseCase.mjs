import LIVR from 'livr';

class BaseUseCase {
    constructor(args = {}) {
        if (!args.userId) {
            throw new Error('User ID required');
        }

        this.userId = args.userId;
    }

    async run(input) {
        const validInput = this.validate(input);

        return this.execute(validInput);
    }

    validate(input) {
        const validationRules = this.constructor.validationRules;
        const validator = new LIVR.Validator(validationRules);

        const validData = validator.validate(input);

        if (validData) {
            return validData;
        }

        throw validator.getErrors();
    }
}

export default BaseUseCase;
