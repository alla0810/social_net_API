const { Schema, model } = require('mongoose');
//const thoughtSchema = require('./Thought');
const validatorPackage = require('validator');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,      
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,            
      required: [true, 'Email address is required'],
      validate: {
        validator: validatorPackage.isEmail,
        message: 'Please provide a valid email',
      }
    },
    thoughts: [{type: Schema.Types.ObjectId,ref: 'thought'}],
    friends: [{type: Schema.Types.ObjectId, ref: 'user'}],    

  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
.virtual('friendCount')
.get(function() {
  return this.friends.length;
});


const User = model('user', userSchema);

module.exports = User;
