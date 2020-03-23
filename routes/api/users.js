const express = require('express');
const UserModel = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const router = express.Router();

// @route POST api/users/register
// @desc Register user route
// @access Public
router.post('/register', (req,res) =>{
       UserModel.findOne({email: req.body.email})
     .then(user => {
         //If there is user meaning email alreday exists
         if(user){
             return res.status(400).json({email : 'Email alreday exists!'});
         }
         //If no user in the DB then add new user to DB
         else{
             const avatar = gravatar.url(req.body.email, {
                 s: 200,
                 r: 'pg',
                 d: 'mm'
             });
             
             const newUser = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: avatar  
             });

             //Encrypt pasword
             bcrypt.genSalt(10, (err, salt)=> {
                 if(err) throw err;
                 bcrypt.hash(newUser.password, salt, (err, hash) => {
                     if(err) throw err;
                     newUser.password = hash;
                     newUser.save()
                      .then(user => res.json(user))
                      .catch(err => console.log(err))
                 })
             });
         }
     })
     .catch(err => console.log(err))

});

// @route POST api/users/login
// @desc User login route
// @access Public
router.post('/login', (req,res) => {
    UserModel.findOne({email: req.body.email})
      .then(user => {
          if(!user){
              return res.status(404).json({email: 'User not found'});
          }
          else{
              bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if(!isMatch){
                        return res.status(400).json({password: 'Password Incorrect!'});
                    }
                    //User is valid if isMatch is true then create JWT token
                    else{
                        //Create a JWT payload
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        };

                        //Create JWT token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                if(err) throw err
                                res.json({
                                    success: true,
                                    token : 'Bearer ' + token
                                });
                            }
                            )                        
                    }
                })
                .catch(err => console.log(err))            
          }
      })
      .catch(err => console.log(err));
});

// @route GET api/users/current
// @desc Return current logged in user information
// @access Private
router.get(
    '/current',
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    })
    
module.exports = router;