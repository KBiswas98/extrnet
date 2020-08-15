const { createToken, verifyToken, header } = require('../authentication/auth');
var User = require('../userSchema/user');
const jwt = require('jsonwebtoken');
var md5 = require('md5');
var session=require('express-session');
session({secret: 'ssshhhhh',saveUninitialized: true,resave: true});

var str = function generateUniqueString() {
    var ts = String(new Date().getTime()),
      out = '';
  
    for (i = 0; i < ts.length; i += 2) {
        out += Number(ts.substr(i, 2)).toString(36);
    }
    return (out);
  }
  console.log(str());
  
const resolvers = {
   Mutation: {
      createToken: async (root, args, context) => {
          const email = args.email;
          const password = md5(args.password);
          return createToken(email,password);
      },
      verifyToken: async (root, args, context) => {
        const token  = args.token;
        return verifyToken(token);
      },
      async createUser(parent,args,context) {
        User.findOne({email:args.email}, function(err,obj){
            if(obj==null)
            {
                const token = createToken(args.email,md5(args.password));
                console.log(token);
            }
        });
          const user = new User({
            userID:str(),
            name:args.name,
            email:args.email,
            phone:args.phone,
            password:md5(args.password)
          })
          console.log(user);
          return user.save();
      },
      async updateUser(parent,args,context) {
        const {token} = context;
        const _ = verifyToken(token);
        var temail = _.email.email;
        if(temail.localeCompare(args.email)==0)
        {
        var myquery={email:args.email};
        console.log(args);
        var newvalue={$set:{name:args.name,phone:args.phone,password:md5(args.password)}};
        User.updateOne(myquery,newvalue, function(err,obj){
        });
        return args;
        }
       },
    async loginUser(parent,args,context) {
        const {token} = context;
        var _ = verifyToken(token);
        var temail = _.email.email;
        
        if(temail.localeCompare(args.email)==0)
        {
           var user1 =  User.findOne({email:args.email , password: md5(args.password)});
            console.log("Success");
            // console.log(user1);
            return user1;
        }
      },
      async deleteUser(parent,args,context) {
          const {token} = context;
          var _ = verifyToken(token);
          var temail = _.email.email;

          if(temail.localeCompare(args.email)==0)
          {
            User.remove({email:args.email}).then(()=> console.log("DEleted"));
            return `user deleted with ${args.email}`;
          }
      },
      async isLoggedIn(parent,args,context){
        const {user} = context;
        if(user.localeCompare(args.email)==0)
        return `Loggedin user ${user}`;
        else
        return "Not Logged in... OOPS";
      },
      async LogoutUser(parent,args,context){
          context = ({req}) =>{
              console.log("HII")
              req.session.destroy((err)=>{
                  if(err)
                  console.log(err);
                console.log("Inside logout");
              }).then(()=> console.log("LOOO"));
            }
            return `Logout `;
        }
    },
    Query: {
        async user(root,args,context) {
            return User.find({});
        },
        async person(root,args,context) {
        const {token} = context;
        const _ = verifyToken(token);
        var temail = _.email.email;
        
        if(temail.localeCompare(args.email)==0)
        {
           var user =  User.findOne({email:args.email});
            console.log("info"+ user);
            return user;
        }
      }
    }
};


module.exports = resolvers;