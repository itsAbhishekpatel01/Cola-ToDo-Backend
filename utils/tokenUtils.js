const crypto = require('crypto')

const generateToken = ()=>{
    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now()+3600000; //1 hour from now
    return {token, expires};
}

module.exports = generateToken;