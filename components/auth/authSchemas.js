
exports.logInSchema = {
    type: 'object',
    properties:
    {
        'account': {type: 'string', 'minLength': 10},
        password: {type: 'string', 'minLength': 8}
    },
    required: ['account', 'password'],
    additionalProperties: false
}

exports.signUpSchema = {
    type: 'object',
    properties:
    {
        userName: {type: 'string'},
        userPhone: {type: 'string', 'minLength': 10},
        userPassword: {type: 'string', 'minLength': 8},
        userGender: {type: 'string', 'minLength': 1},
        userAddress: {type: 'string'}
    },
    required: ['userName', 'userPhone', 'userPassword', 'userGender'],
    additionalProperties: false
}