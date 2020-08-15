const schema = require('./typedef');
const {ApolloServer}  = require('apollo-server-express');
const express= require('express');
const router = express();
const {createToken,verifyToken} = require('../authentication/auth');
var session=require('express-session');
router.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

const server = new ApolloServer({ 
schema,
playground:{
   endpoint:'http://localhost:4000/extranet'
},
   context: ({ req }) => {
       const token = req.headers.authorization ;
       const r = verifyToken(token);
       req.session.user = r.email.email;
       var user = req.session.user;
        console.log(user);
       return { token,user };
  },
});

const path = '/user';
server.applyMiddleware({ app:router,path });

module.exports = router;
