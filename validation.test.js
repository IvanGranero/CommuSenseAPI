const validatePassword = require('./validation').validatePassword;

describe('Validation testing', () => {
    it('should run', () => {})

    it('should return false when empty', ()=>{
        expect(validatePassword('')).toBe(false);
    });
})