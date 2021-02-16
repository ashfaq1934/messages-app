const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./user');
const Message = require('./message');
const mongoose = require("mongoose");
const { check, validationResult } = require('express-validator/');
const jwt = require("jsonwebtoken");
const config = require("./auth.config");
const cors = require('cors');
const uuid = require('uuid');



const saltRounds = 10;

const app = express();

app.use(bodyParser.json({ extended: false }));

app.use(cors({
  origin: [
  'http://localhost:8080',
  'https://localhost:8080'
],
}));

mongoose.connect("mongodb://localhost/messages-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.get('/', function(req, res){
  res.send('welcome');
})

app.post('/register/', [ 
  check('email').isEmail().normalizeEmail(),
  check('password').not().isEmpty().trim().escape(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const user = await User.findOne({ email: req.body.email });
  if(user){
    res.status(401).send({
      message: "User already exists",
    });
  }else{
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    let newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(200).send(`${req.body.email} registered!`);
  }
});

app.post('/login/', [ 
  check('email').isEmail().normalizeEmail(),
  check('password').not().isEmpty().trim().escape(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const user = await User.findOne({ email: req.body.email });
    if (user) {
      const hashCompare = await bcrypt.compare(req.body.password, user.password);
      if (hashCompare) {
        //   ..... further code to maintain authentication like jwt or sessions
        let token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
        res.status(200).send({
          id: user.id,
          email: user.email,
          accessToken: token,
          message: "Authentication Successful"
        });
      } else {
        res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
    } else {
      res.status(404).send({
        message: "User doesn't exist",
      });
    }
});

app.post('/messages/new/', [ 
  check('user').isEmail().normalizeEmail(),
  check('recipient').isEmail().normalizeEmail(),
  check('title').not().isEmpty().trim().escape(),
  check('message').not().isEmpty().trim().escape(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  try {
    const decoded = jwt.verify(req.headers.authorization, config.secret);
    if(decoded){
      let user = await User.findOne({ email: req.body.user });
      if(user){
        let newuuid = uuid.v4();
        const message = await Message.create({
          uuid: newuuid,
          message: req.body.message,
          title: req.body.title,
          recipient: req.body.recipient,
          user: user
        });
        res.status(200).send({
          message: "New message created",
          uuid: message.uuid
        });
      }
    }
  } catch(err) {
    res.status(401).send({
      message: "Token failed to verify"
    });
  }
});

app.post('/messages/', [ 
  check('user').isEmail().normalizeEmail(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const decoded = jwt.verify(req.headers.authorization, config.secret);
  if(decoded){
    let messagesList = []
    let messages = await Message.find({recipient: req.body.user})
    for (let message of messages){
      let sender = await User.findOne(message.user)
      messagesList.push({
        uuid: message.uuid,
        title: message.title,
        recipient: message.recipient,
        sender: sender.email,
        message: message.message
      });
    }
      res.status(200).send({
        messages: messagesList,
    });
  }
});

app.post('/recipients/', [ 
  check('recipient').isEmail().normalizeEmail(),
], async (req,res) =>{
  // const errors = validationResult(req)
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ errors: errors.array() })
  // }
  let recipients = []
  const decoded = jwt.verify(req.headers.authorization, config.secret);
  if(decoded){
    let users = await User.find();
    users.forEach( user =>{
      recipients.push({
        recipient: user.email
      });
    });
    res.status(200).send({
      recipients: recipients
    })
  }
});

app.post('/messages/:uuid', [
  check('uuid').not().isEmpty().trim().escape(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const decoded = jwt.verify(req.headers.authorization, config.secret);
  if (decoded){
    let message = await Message.findOne({uuid: req.body.uuid})
    let sender = await User.findOne(message.user)
    res.status(200).send({
      title: message.title,
      recipient: message.recipient,
      sender: sender.email,
      message: message.message
    });
  }
});

app.listen(7000, () => {
    console.log("Server started at port 7000...");
  });