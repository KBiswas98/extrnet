const jwt = require('jsonwebtoken');
const  setContext  = require("apollo-link-context").setContext;

const {
    AuthenticationError,
} = require('apollo-server-express');

const createToken = (email, password) => {
    try {
        const token = jwt.sign({ email: email, password: password }, process.env.JWT_SECRET);
        return { token, email };
    } catch (e) {
        throw new AuthenticationError(
            'Authentication token is invalid, send',
        )
    }
}

const verifyToken = (token) => {
    try {
        const  email = jwt.verify(token, process.env.JWT_SECRET);
        return { email, token };
    } catch (e) {
        throw new AuthenticationError(
            'Authentication token is invalid, verify',
        );
    }
}

const basic = ()=>{
    setContext((operation, context) => ({
        headers: {
          Accept: 'charset=utf-8'
        }
    }));    
}

const header = () =>{
    basic();
    // console.log(email);
    setContext((operation, context) => ({
     email : context.email,
     email:"abc"
    }));
    console.log("OUT");
}

module.exports = {createToken, verifyToken, header}