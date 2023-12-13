const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Use a getter method to format the timestamp on query
      get: (date) => timeSince(date),      
    },
    username: {
      type: String,
      required: true,
    },

    reactions: [reactionSchema],
  },
  {
    timestamps: true,    
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
.virtual("reactionCount")
.get(function() {
  return this.reactions.length;
});



const Thought = model('thought', thoughtSchema);

module.exports = Thought;
