const { Thought, User, Reaction } = require('../models');

module.exports = {
  // Get all courses
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a course
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a course
  async createThought(req, res) {
    console.log("createThought");
    console.log(req.params, req.body);

    const thought = await Thought.create(req.body);

    if (!thought)
    {
      res.status(500).json({ message: 'Fail to create thought' });
    }

    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: {thoughts: thought} },
      { new: true }
      );

    if (!user)
    {
      res.status(500).json({ message: 'Fail to update thought to user' });
    }
  

    res.json(thought);
  },
  // Delete a course
  async deleteThought(req, res) {

      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      const username = thought.username;

      const user = await User.findOneAndUpdate(
        { username: username },
        { $pull: {thoughts: {_id: thought._id} } },
        { new: true }
        );
  
      if (!user)
      {
        res.status(404).json({ message: 'Fail to update thought to user' });
      }
  
      res.json({ message: 'Thought deleted!' });
  },
  // Update a thought
  async updateThought(req, res) {
    console.log("updateThought");
    console.log(req.params, req.body);

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    console.log('You are creating a reaction');
    console.log(req.params, req.body);

    const thought = await Thought.findOne({_id: req.params.thoughtId});
    const username = thought.username;

    const updateThought = await Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$addToSet: { reactions: {reactionBody:req.body.reactionBody, username: username} }},
      { runValidators: true, new: true }        
      )

      if (!updateThought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }  

    res.json(updateThought);        

  },
  // Remove friend from a user
  async deleteReaction(req, res) {
    console.log('deleteReaction');
    console.log(req.params, req.body);

    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      console.log("Thought.findOneAndUpdate fail");

      return res
        .status(404)
        .json({ message: 'No thought with that ID :(' });
    }

    // const reaction = await Reaction.findOneAndRemove(req.body.reactionId);

    // if (!reaction)
    // {
    //   console.log("Reaction.findOneAndRemove fail");      
    //   return res
    //     .status(404)
    //     .json({ message: 'No reaction with that ID :(' });
    // }

    res.json(thought);
  },  
};
