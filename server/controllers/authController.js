const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array(),
        type: 'validation'
      });
    }

    const { 
      username, 
      email, 
      password, 
      name, 
      gender, 
      age, 
      phone, 
      socialId, 
    } = req.body;

    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      let errorMessage = 'User already exists';
      let field = '';
      
      if (existingUser.email === email) {
        errorMessage = 'Email already exists';
        field = 'email';
      } else if (existingUser.username === username) {
        errorMessage = 'Username already exists';
        field = 'username';
      }
      
      return res.status(400).json({ 
        message: errorMessage,
        field: field,
        type: 'duplicate'
      });
    }

    const user = new User({ 
      username, 
      email, 
      password,
      name: name || '',
      gender: gender || 'other',
      age: age || null,
      phone: phone || '',
      socialId: socialId || '',
    });
    
    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email,
        name: user.name,
        gender: user.gender,
        age: user.age,
        phone: user.phone,
        socialId: user.socialId,
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Server error during registration',
      error: error.message,
      type: 'server'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email,
        name: user.name,
        gender: user.gender,
        age: user.age,
        phone: user.phone,
        socialId: user.socialId,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      error: error.message 
    });
  }
};

exports.generateToken = generateToken;