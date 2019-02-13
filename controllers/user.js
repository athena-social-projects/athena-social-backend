const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const createUser = (type, user, req, res) => {
  if (user.length > 1) {
    res.status(409).json({
      message: 'Email already exists.',
    });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, null, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash,
          name: req.body.name,
          user_type: type,
        });
        newUser.save()
          .then(result => res.status(201).json({
            message: `${type} created successfully`,
          }))
          .catch(err => res.status(500).json({
            message: `Failed to create ${type}`,
            error: err,
          }));
      });
    });
  }
};

router.post('/signup', (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      createUser('user', user, req, res);
    });
});

router.post('/admin-signup', (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      createUser('admin', user, req, res);
    });
});


router.post('/login', (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Email does not exist.',
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Incorrect password.',
          });
        }
        if (result) {
          const token = jwt.sign({
            email: user[0].email,
            userId: user[0]._id,
          },
          'secret',
          {
            expiresIn: '1h',
          });

          res.cookie('access_token', token, {
            maxAge: 3600,
            httpOnly: true,
          });
          return res.status(200).json({
            message: 'Login successful',
            user_type: user[0].user_type,
            token,
          });
        }
        res.status(401).json({
          mesasge: 'Login failed',
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});


module.exports = router;
