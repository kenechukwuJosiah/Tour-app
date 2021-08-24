const express = require('express');
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  updateMe,
  deleteMe,
} = require('../controlers/usersControler');

const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  updatePassword,
  protected,
} = require('../controlers/authControler');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgetpassword', forgetPassword);
router.patch('/resetpassword/:token', resetPassword);

router.patch('/updateme', protected, updateMe);

router.patch('/updatepassword', protected, updatePassword);

router.delete('/deleteme', protected, deleteMe);

router.route('/').get(getAllUsers).post(createUser);

router
  .route('/:id')
  .patch(updateUser)
  .delete(protected, deleteUser)
  .get(getUser);

module.exports = router;
