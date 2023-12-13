const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of students overall
// const headCount = async () => {
//   const numberOfUsers = await User.aggregate()
//     .count('userCount');
//   return numberOfUsers;
// }

// Aggregate function for getting the overall grade using $avg
// const grade = async (studentId) =>
//   Student.aggregate([
//     // only include the given student by using $match
//     { $match: { _id: new ObjectId(studentId) } },
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: {
//         _id: new ObjectId(studentId),
//         overallGrade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

module.exports = {
  // Get all students
  async getUsers(req, res) {
    try {
      const users = await User.find();

//      console.log(users);
//      console.log(users.friends);

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single student
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({
        user,
//        grade: await grade(req.params.studentId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new student
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    // console.log("updateUser");
    // console.log("req: ", req.params, req.body);
    // console.log("id: ", req.body._id);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.body._id },
        { $set: req.body },
        { runValidators: true, new: true }
        );

      console.log(user);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // Delete a student and remove them from the course
  async deleteUser(req, res) {
    console.log('deleteUser');
    console.log(req.body, req.params);

    const user = await User.findOneAndDelete({ _id: req.body._id });

    if (!user) {
      console.log("No such user exists");
      return res.status(404).json({ message: 'No such user exists' });
    }

    const response = await Thought.deleteMany(
      { username: user.username },
    );

    if (!response) {
      console.log("User deleted, but no thought found");

      return res.status(404).json({
        message: 'User deleted, but no thought found',
      });
    }

    res.json({ message: 'User successfully deleted' });
  },

  // Add an assignment to a student
  async addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.params, req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove friend from a user
  async removeFriend(req, res) {
    console.log('removeFriend');
    console.log(req.params, req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
