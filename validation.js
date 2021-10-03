
function validatePassword(password) {
    if ( password == "" || password.length<8 )
        return false;
    else
        return true;
}

module.exports.validatePassword = validatePassword;