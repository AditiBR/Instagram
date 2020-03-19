const express = require('express');
const UserModel = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/register', (req,res) =>{
    console.log('inside register');
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.password);
    UserModel.findOne({email: req.body.email})
     .then(user => {
         if(user){
             return res.status(400).json({email : 'Email alreday exists!'});
         }
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

module.exports = router;