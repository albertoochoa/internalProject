const mongoose = require('mongoose');

const authTokenSchema = new mongoose.Schema({
  jti: {
    type: String,
    required: true,
    unique: true, 
  },
  userId: {
    type: String,
    required: true,
    index: true, 
  },
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  revoked: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('AuthToken', authTokenSchema);
