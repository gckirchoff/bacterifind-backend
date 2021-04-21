const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter your email.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please input your password.'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords must match',
    },
  },
  passwordChangedOn: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Hash password and get rid of passwordConfirm before inputting them to database and creating account
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedOn = Date.now() - 1000;
  next();
});

// Instance method to compare inputted password (when logging in) to database hashed password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfterTokenIssued = function (JWTTimeStamp) {
  // Of the passwordChangedOn property exists, do the comparison. If it doesn't exist, the user never changed the password and we can just return false.
  if (this.passwordChangeOn) {
    const changedTimeStamp = parseInt(
      thispasswordChangedOn.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp; // returns true if password was changed after the token was given.
  }

  //   Not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes to change password with token

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
