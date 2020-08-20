class UseCaseException extends Error {
    constructor(data) {
        super();
        if (!data.fields) throw new Error('FIELDS REQUIRED');
        if (!data.code) throw new Error('CODE REQUIRED');

        this.fields  = data.fields;
        this.code    = data.code;
        this.message = data.message;
    }

    toHash() {
        return {
            fields  : this.fields,
            code    : this.code,
            message : this.message
        };
    }
}


export default UseCaseException;
