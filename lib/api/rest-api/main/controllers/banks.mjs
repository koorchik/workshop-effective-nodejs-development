import BanksCreate      from '../../../../use-cases/main/banks/BanksCreate.mjs';
import BanksList        from '../../../../use-cases/main/banks/BanksList.mjs';
import UseCaseException from '../../../../use-cases/UseCaseException.mjs';

// eslint-disable-next-line more/no-hardcoded-configuration-data
const USER_ID = '2eebfecf-23aa-4a1f-a234-a3756ae3b60f'; // TODO Change me

export function create(req, res) {
    runUseCase(BanksCreate, req.body, res);
}

export function show(req, res) {
    res.send({ called: 'SHOW', params: req.params, body: req.body });
}

export function list(req, res) {
    runUseCase(BanksList, {}, res);
}

export function update(req, res) {
    res.send({ called: 'UPDATE', params: req.params, body: req.body });
}

export function remove(req, res) {
    res.send({ called: 'REMOVE', params: req.params, body: req.body });
}


async function runUseCase(UseCase, input, res) {
    try {
        const useCase = new UseCase({ userId: USER_ID });
        const result = await useCase.run(input);

        res.send({ status: 1, data: result });
    } catch (error) {
        if (error instanceof UseCaseException) {
            res.send({ status: 0, error: error.toHash() });
        } else {
            res.send({ status : 0,
                error  : {
                    code    : 'UNEXPECTED_SERVER_ERROR',
                    fields  : {},
                    message : 'Some unexpected server error occured.'
                } });

            // REPORT DEVELOPERS
            console.error('ERROR', error);
        }
    }
}
