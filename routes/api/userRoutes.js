const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getUsers).post(createUser).put(updateUser).delete(deleteUser);

// /api/students/:studentId
router.route('/:userId').get(getSingleUser);

// /api/students/:studentId/assignments
//router.route('/:studentId/thoughts').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
